import {
  ExpandableRowContent,
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import {
  Button,
  ClipboardCopy,
  Modal,
  ModalVariant,
  Text,
} from '@patternfly/react-core';
import {useState} from 'react';
import {Tag} from 'src/resources/TagResource';
import SecurityReportTable from './SecurityReport/SecurityReportTable';
import {selectedTagsState} from 'src/atoms/TagListState';
import {useRecoilState} from 'recoil';

const columnNames = {
  Tag: 'Tag',
  OS: 'OS',
  Security: 'Security',
  Size: 'Size',
  Expires: 'Expires',
  LastModified: 'Last Modified',
  Manifest: 'Manifest',
  Pull: 'Pull',
};

export default function Table(props: TableProps) {
  const quayDomain = process.env.REACT_APP_QUAY_DOMAIN || 'quay.io';
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImageTag, setModalImageTag] = useState<string>('');
  const [modalImageDigest, setModalImageDigest] = useState<string>('');
  const [recentSelectedRowIndex, setRecentSelectedRowIndex] = useState<
    number | null
  >(null);
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);

  const isTagSelectable = (tag: Tag) => tag.name !== 'a'; // Arbitrary logic for this example
  const selectableTags = props.tags.filter(isTagSelectable);

  const selectAllTags = (isSelecting = true) => {
    setSelectedTags(isSelecting ? selectableTags.map((t) => t.name) : []);
  };

  const setTagSelected = (tag: Tag, isSelecting = true) =>
    setSelectedTags((prevSelected) => {
      const otherSelectedtagNames = prevSelected.filter((r) => r !== tag.name);
      return isSelecting && isTagSelectable(tag)
        ? [...otherSelectedtagNames, tag.name]
        : otherSelectedtagNames;
    });

  const onSelectTag = (tag: Tag, rowIndex: number, isSelecting: boolean) => {
    setTagSelected(tag, isSelecting);
    setRecentSelectedRowIndex(rowIndex);
  };

  const openModal = (tag: Tag) => {
    setModalImageTag(tag.name);
    setModalImageDigest(tag.manifest_digest);
    setIsModalOpen(!isModalOpen);
  };

  // Tag expansion
  const initialExpandedTagNames = props.tags
    .filter((tag) => tag.is_manifest_list)
    .map((tag) => tag.name);
  const [expandedTagNames, setExpandedTagNames] = useState<string[]>(
    initialExpandedTagNames,
  );
  const setTagExpanded = (tag: Tag, isExpanding = true) =>
    setExpandedTagNames((prevExpanded) => {
      const otherExpandedtagNames = prevExpanded.filter((r) => r !== tag.name);
      return isExpanding
        ? [...otherExpandedtagNames, tag.name]
        : otherExpandedtagNames;
    });
  const isTagExpanded = (tag: Tag) => expandedTagNames.includes(tag.name);

  return (
    <>
      <Modal
        title={`Fetch Tag: ${modalImageTag}`}
        isOpen={isModalOpen}
        disableFocusTrap={true}
        onClose={() => {
          setIsModalOpen(!isModalOpen);
        }}
        variant={ModalVariant.small}
        actions={[
          <Button
            key="cancel"
            variant="primary"
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            Close
          </Button>,
        ]}
      >
        <Text style={{fontWeight: 'bold'}}>Docker Pull (By Tag)</Text>
        {/* TODO: Pull in repo name */}
        <ClipboardCopy
          data-testid="copy-tag"
          isReadOnly
          hoverTip="Copy"
          clickTip="Copied"
        >
          docker pull {quayDomain}/{props.organization}/{props.repository}:
          {modalImageTag}
        </ClipboardCopy>
        <br></br>
        <Text style={{fontWeight: 'bold'}}>Docker Pull (By Digest)</Text>
        {/* TODO: Pull in repo name */}
        <ClipboardCopy
          data-testid="copy-digest"
          isReadOnly
          hoverTip="Copy"
          clickTip="Copied"
        >
          docker pull {quayDomain}/{props.organization}/{props.repository}@
          {modalImageDigest}
        </ClipboardCopy>
      </Modal>
      <TableComposable aria-label="Expandable table">
        <Thead>
          <Tr>
            <Th />
            <Th
              select={{
                onSelect: (_event, isSelecting) => selectAllTags(isSelecting),
                isSelected: selectedTags.length === selectableTags.length,
              }}
            />
            <Th>Tag</Th>
            <Th>OS</Th>
            <Th>Security</Th>
            <Th>Size</Th>
            <Th>Last Modified</Th>
            <Th>Expires</Th>
            <Th>Manifest</Th>
            <Th>Pull</Th>
          </Tr>
        </Thead>

        {props.tags.map((tag: Tag, rowIndex: number) => {
          // Some arbitrary examples of how you could customize the child row based on your needs
          const childHasNoPadding = false;
          const archColspan = 2;
          const securityColspan = 1;
          const sizeColspan = 3;
          const manifestColspan = 1;
          return (
            <Tbody
              data-testid="table-entry"
              key={tag.name}
              isExpanded={isTagExpanded(tag)}
            >
              <Tr>
                <Td
                  expand={
                    tag.is_manifest_list
                      ? {
                          rowIndex,
                          isExpanded: isTagExpanded(tag),
                          onToggle: () =>
                            setTagExpanded(tag, !isTagExpanded(tag)),
                        }
                      : undefined
                  }
                />
                <Td
                  select={{
                    rowIndex,
                    onSelect: (_event, isSelecting) =>
                      onSelectTag(tag, rowIndex, isSelecting),
                    isSelected: selectedTags.includes(tag.name),
                  }}
                />
                <Td dataLabel={columnNames.Tag}>{tag.name}</Td>
                <Td dataLabel={columnNames.OS}>os-mock</Td>
                <Td dataLabel={columnNames.Security}>
                  {typeof tag.manifest_list != 'undefined' ? (
                    'See Child Manifest'
                  ) : (
                    <SecurityReportTable features={[]} />
                  )}
                </Td>
                <Td dataLabel={columnNames.Size}>
                  {typeof tag.manifest_list != 'undefined' ? 'N/A' : tag.size}
                </Td>
                <Td dataLabel={columnNames.LastModified}>
                  {tag.last_modified}
                </Td>
                <Td dataLabel={columnNames.Expires}>expires-mock</Td>
                <Td dataLabel={columnNames.Manifest}>
                  {tag.manifest_digest.substring(0, 19)}
                </Td>
                <Td dataLabel={columnNames.Pull}>
                  <i
                    onClick={() => {
                      openModal(tag);
                    }}
                    data-testid="pull"
                    className="fa fa-download"
                  ></i>
                </Td>
              </Tr>
              {tag.manifest_list
                ? tag.manifest_list.manifests.map((manifest, rowIndex) => {
                    return (
                      <Tr key={rowIndex} isExpanded={isTagExpanded(tag)}>
                        <Td />
                        <Td />
                        {manifest.platform ? (
                          <Td
                            dataLabel="platform"
                            noPadding={childHasNoPadding}
                            colSpan={archColspan}
                          >
                            <ExpandableRowContent>{`${manifest.platform.os} on ${manifest.platform.architecture}`}</ExpandableRowContent>
                          </Td>
                        ) : (
                          <Td />
                        )}
                        <Td
                          dataLabel="security"
                          noPadding={childHasNoPadding}
                          colSpan={securityColspan}
                        >
                          <ExpandableRowContent>
                            <SecurityReportTable
                              features={tag.manifest_list.manifests
                                .map(
                                  (manifest) =>
                                    manifest.security.data.Layer.Features,
                                )
                                .flat()}
                            />
                          </ExpandableRowContent>
                        </Td>
                        {manifest.size ? (
                          <Td
                            dataLabel="size"
                            noPadding={childHasNoPadding}
                            colSpan={sizeColspan}
                          >
                            <ExpandableRowContent>
                              {manifest.size}
                            </ExpandableRowContent>
                          </Td>
                        ) : (
                          <Td />
                        )}
                        {manifest.digest ? (
                          <Td
                            dataLabel="digest"
                            noPadding={childHasNoPadding}
                            colSpan={manifestColspan}
                          >
                            <ExpandableRowContent>
                              {manifest.digest.substring(0, 19)}
                            </ExpandableRowContent>
                          </Td>
                        ) : (
                          <Td />
                        )}
                      </Tr>
                    );
                  })
                : null}
            </Tbody>
          );
        })}
      </TableComposable>
      {props.tags.length == 0 ? <div>This repository is empty.</div> : null}
    </>
  );
}

type TableProps = {
  organization: string;
  repository: string;
  tags: Tag[];
};
