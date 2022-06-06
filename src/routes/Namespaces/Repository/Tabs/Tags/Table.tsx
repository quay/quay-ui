import { ExpandableRowContent, TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { Button, ClipboardCopy, Modal, ModalVariant, Text } from '@patternfly/react-core';
import { useState } from 'react';
import { Tag, TagsResponse, getTags, ManifestList } from 'src/resources/TagResource';


const columnNames = {
    Tag: 'Tag',
    OS: 'OS',
    Security: 'Security',
    Size: 'Size',
    Expires: 'Expires',
    LastModified: 'Last Modified',
    Manifest: 'Manifest',
    Pull: 'Pull'
}

export default function Table(props: TableProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalImageTag, setModalImageTag] = useState<string>("");
    const [modalImageDigest, setModalImageDigest] = useState<string>("");
    const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]);
    const [recentSelectedRowIndex, setRecentSelectedRowIndex] = useState<number | null>(null);

    const isTagSelectable = (tag: Tag) => tag.name !== 'a'; // Arbitrary logic for this example
    const selectableTags = props.tags.filter(isTagSelectable);

    const selectAllTags = (isSelecting = true) => {
        setSelectedTagNames(isSelecting ? selectableTags.map(t => t.name) : []);
    }

    const setTagSelected = (tag: Tag, isSelecting = true) =>
        setSelectedTagNames(prevSelected => {
            const otherSelectedtagNames = prevSelected.filter(r => r !== tag.name);
            return isSelecting && isTagSelectable(tag) ? [...otherSelectedtagNames, tag.name] : otherSelectedtagNames;
    });

    const onSelectTag = (tag: Tag, rowIndex: number, isSelecting: boolean) => {
        setTagSelected(tag, isSelecting);
        setRecentSelectedRowIndex(rowIndex);
    };

    const openModal = (tag: Tag) => {
        setModalImageTag(tag.name)
        setModalImageDigest(tag.manifest_digest)
        setIsModalOpen(!isModalOpen)
    }

    // Tag expansion
    const initialExpandedTagNames = props.tags.filter(tag => tag.is_manifest_list).map(tag => tag.name);
    const [expandedTagNames, setExpandedTagNames] = useState<string[]>(initialExpandedTagNames);
    const setTagExpanded = (tag: Tag, isExpanding = true) =>
    setExpandedTagNames(prevExpanded => {
      const otherExpandedtagNames = prevExpanded.filter(r => r !== tag.name);
      return isExpanding ? [...otherExpandedtagNames, tag.name] : otherExpandedtagNames;
    });
    const isTagExpanded = (tag: Tag) => expandedTagNames.includes(tag.name);

    return (
        <>
            <Modal
                title={`Fetch Tag: ${modalImageTag}`}
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(!isModalOpen) }}
                variant={ModalVariant.small}
                actions={[
                    <Button key="cancel" variant="primary" onClick={() => { setIsModalOpen(!isModalOpen) }}>
                        Close
                    </Button>
                ]}
            >
                <Text style={{ fontWeight: "bold" }}>Docker Pull (By Tag)</Text>
                {/* TODO: Pull in repo name */}
                <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied">
                    docker pull quay.io/{props.organization}/{props.repository}:{modalImageTag}
                </ClipboardCopy>
                <br></br>
                <Text style={{ fontWeight: "bold" }}>Docker Pull (By Digest)</Text>
                {/* TODO: Pull in repo name */}
                <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied">
                    docker pull quay.io/{props.organization}/{props.repository}@{modalImageDigest}
                </ClipboardCopy>
            </Modal>
            <TableComposable aria-label="Expandable table">
        <Thead>
          <Tr>
            <Th />
            <Th
                select={{
                onSelect: (_event, isSelecting) => selectAllTags(isSelecting),
                isSelected: selectedTagNames.length === selectableTags.length
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
            <Tbody key={tag.name} isExpanded={isTagExpanded(tag)}>
              <Tr>
                <Td
                  expand={
                    tag.is_manifest_list
                      ? {
                          rowIndex,
                          isExpanded: isTagExpanded(tag),
                          onToggle: () => setTagExpanded(tag, !isTagExpanded(tag))
                        }
                      : undefined
                  }
                />
                <Td
                    select={{
                        rowIndex,
                        onSelect: (_event, isSelecting) => onSelectTag(tag, rowIndex, isSelecting),
                        isSelected: selectedTagNames.includes(tag.name),
                    }}
                />
                
                <Td dataLabel={columnNames.Tag}>{tag.name}</Td>
                <Td dataLabel={columnNames.OS}>os-mock</Td> {/* TODO: get this info later  */}
                <Td dataLabel={columnNames.Security}>{typeof(tag.ManifestLists) != 'undefined' ? "See Child Manifest" : tag.security}</Td>
                <Td dataLabel={columnNames.Size}>{typeof(tag.ManifestLists) != 'undefined' ? "N/A" : tag.size}</Td>
                <Td dataLabel={columnNames.LastModified}>{tag.last_modified}</Td>
                <Td dataLabel={columnNames.Expires}>expires-mock</Td>  {/* TODO: get this info later  */}
                <Td dataLabel={columnNames.Manifest}>{tag.manifest_digest}</Td>
                <Td dataLabel={columnNames.Pull} onClick={()=>{openModal(tag)}}><i className="fa fa-download"></i></Td>
              </Tr>
              {tag.ManifestLists ? (
                <Tr isExpanded={isTagExpanded(tag)}>
                  <Td />
                  <Td />
                  {tag.ManifestLists.Arch ? (
                    <Td dataLabel="tag detail 1" noPadding={childHasNoPadding} colSpan={archColspan}>
                      <ExpandableRowContent>{tag.ManifestLists.Arch}</ExpandableRowContent>
                    </Td>
                  ) : null}
                  {tag.ManifestLists.Security ? (
                    <Td dataLabel="tag detail 2" noPadding={childHasNoPadding} colSpan={securityColspan}>
                      <ExpandableRowContent>{tag.ManifestLists.Security}</ExpandableRowContent>
                    </Td>
                  ) : null}
                  {tag.ManifestLists.Size ? (
                    <Td dataLabel="tag detail 3" noPadding={childHasNoPadding} colSpan={sizeColspan}>
                      <ExpandableRowContent>{tag.ManifestLists.Size}</ExpandableRowContent>
                    </Td>
                  ) : null}
                  {tag.ManifestLists.manifest_digest ? (
                    <Td dataLabel="tag detail 3" noPadding={childHasNoPadding} colSpan={manifestColspan}>
                      <ExpandableRowContent>{tag.ManifestLists.manifest_digest}</ExpandableRowContent>
                    </Td>
                  ) : null}
                </Tr>
              ) : null}
            </Tbody>
          );
        })}
      </TableComposable>
        </>
    )
}

type TableProps = {
    organization: string;
    repository: string;
    tags: Tag[];
}
