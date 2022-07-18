import {
  ExpandableRowContent,
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import prettyBytes from 'pretty-bytes';
import {useState} from 'react';
import {Tag} from 'src/resources/TagResource';
import {selectedTagsState} from 'src/atoms/TagListState';
import {useRecoilState} from 'recoil';
import {Link} from 'react-router-dom';
import {getTagDetailPath, getDomain} from 'src/routes/NavigationPath';
import TablePopover from './TablePopover';
import SecurityDetails from './SecurityDetails';
import {formatDate} from 'src/libs/utils';

const columnNames = {
  Tag: 'Tag',
  Security: 'Security',
  Size: 'Size',
  Expires: 'Expires',
  LastModified: 'Last Modified',
  Manifest: 'Manifest',
  Pull: 'Pull',
};

export default function Table(props: TableProps) {
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
      <TableComposable variant="compact" aria-label="Expandable table">
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
            <Th>Security</Th>
            <Th>Size</Th>
            <Th>Last Modified</Th>
            <Th>Expires</Th>
            <Th>Manifest</Th>
            <Th>Pull</Th>
          </Tr>
        </Thead>
        {props.tags.map((tag: Tag, rowIndex: number) => {
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
                <Td dataLabel={columnNames.Tag}>
                  <Link
                    to={getTagDetailPath(
                      props.organization,
                      props.repository,
                      tag.name,
                    )}
                  >
                    {tag.name}
                  </Link>
                </Td>
                <Td dataLabel={columnNames.Security}>
                  {tag.is_manifest_list ? (
                    'See Child Manifest'
                  ) : (
                    <SecurityDetails
                      org={props.organization}
                      repo={props.repository}
                      digest={tag.manifest_digest}
                      tag={tag.name}
                    />
                  )}
                </Td>
                <Td dataLabel={columnNames.Size}>
                  {typeof tag.manifest_list != 'undefined'
                    ? 'N/A'
                    : prettyBytes(tag.size)}
                </Td>
                <Td dataLabel={columnNames.LastModified}>
                  {formatDate(tag.last_modified)}
                </Td>
                <Td dataLabel={columnNames.Expires}>
                  {tag.expiration ?? 'Never'}
                </Td>
                <Td dataLabel={columnNames.Manifest}>
                  {tag.manifest_digest.substring(0, 19)}
                </Td>
                <Td dataLabel={columnNames.Pull}>
                  <TablePopover
                    org={props.organization}
                    repo={props.repository}
                    tag={tag.name}
                    digest={tag.manifest_digest}
                  >
                    <i data-testid="pull" className="fa fa-download"></i>
                  </TablePopover>
                </Td>
              </Tr>
              {tag.manifest_list
                ? tag.manifest_list.manifests.map((manifest, rowIndex) => {
                    return (
                      <Tr key={rowIndex} isExpanded={isTagExpanded(tag)}>
                        <Td />
                        {manifest.platform ? (
                          <Td
                            dataLabel="platform"
                            noPadding={false}
                            colSpan={2}
                          >
                            <ExpandableRowContent>
                              <Link
                                to={getTagDetailPath(
                                  props.organization,
                                  props.repository,
                                  tag.name,
                                  new Map([
                                    ['arch', manifest.platform.architecture],
                                  ]),
                                )}
                              >
                                {`${manifest.platform.os} on ${manifest.platform.architecture}`}
                              </Link>
                            </ExpandableRowContent>
                          </Td>
                        ) : (
                          <Td />
                        )}
                        <Td dataLabel="security" noPadding={false} colSpan={1}>
                          <ExpandableRowContent>
                            <SecurityDetails
                              org={props.organization}
                              repo={props.repository}
                              digest={tag.manifest_digest}
                              tag={tag.name}
                              arch={manifest.platform.architecture}
                            />
                          </ExpandableRowContent>
                        </Td>
                        {manifest.size ? (
                          <Td dataLabel="size" noPadding={false} colSpan={3}>
                            <ExpandableRowContent>
                              {prettyBytes(manifest.size)}
                            </ExpandableRowContent>
                          </Td>
                        ) : (
                          <Td />
                        )}
                        {manifest.digest ? (
                          <Td dataLabel="digest" noPadding={false} colSpan={1}>
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
