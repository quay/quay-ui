import {Spinner} from '@patternfly/react-core';
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
import {Tag, Manifest} from 'src/resources/TagResource';
import {selectedTagsState} from 'src/atoms/TagListState';
import {useRecoilState} from 'recoil';
import {Link} from 'react-router-dom';
import {getTagDetailPath} from 'src/routes/NavigationPath';
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

function SubRow(props: SubRowProps) {
  return (
    <Tr key={props.rowIndex} isExpanded={props.isTagExpanded(props.tag)}>
      <Td />
      {props.manifest.platform ? (
        <Td dataLabel="platform" noPadding={false} colSpan={2}>
          <ExpandableRowContent>
            <Link
              to={getTagDetailPath(
                props.org,
                props.repo,
                props.tag.name,
                new Map([['arch', props.manifest.platform.architecture]]),
              )}
            >
              {`${props.manifest.platform.os} on ${props.manifest.platform.architecture}`}
            </Link>
          </ExpandableRowContent>
        </Td>
      ) : (
        <Td />
      )}
      <Td dataLabel="security" noPadding={false} colSpan={1}>
        <ExpandableRowContent>
          <SecurityDetails
            org={props.org}
            repo={props.repo}
            digest={props.tag.manifest_digest}
            tag={props.tag.name}
            arch={props.manifest.platform.architecture}
            variant="condensed"
          />
        </ExpandableRowContent>
      </Td>
      {props.manifest.size ? (
        <Td dataLabel="size" noPadding={false} colSpan={3}>
          <ExpandableRowContent>
            {prettyBytes(props.manifest.size)}
          </ExpandableRowContent>
        </Td>
      ) : (
        <Td />
      )}
      {props.manifest.digest ? (
        <Td dataLabel="digest" noPadding={false} colSpan={1}>
          <ExpandableRowContent>
            {props.manifest.digest.substring(0, 19)}
          </ExpandableRowContent>
        </Td>
      ) : (
        <Td />
      )}
    </Tr>
  );
}

function Row(props: RowProps) {
  const tag = props.tag;
  const rowIndex = props.rowIndex;
  return (
    <Tbody
      data-testid="table-entry"
      key={tag.name}
      isExpanded={props.isTagExpanded(tag)}
    >
      <Tr>
        <Td
          expand={
            tag.is_manifest_list
              ? {
                  rowIndex,
                  isExpanded: props.isTagExpanded(tag),
                  onToggle: () =>
                    props.setTagExpanded(tag, !props.isTagExpanded(tag)),
                }
              : undefined
          }
        />
        <Td
          select={{
            rowIndex,
            onSelect: (_event, isSelecting) =>
              props.selectTag(tag, isSelecting),
            isSelected: props.selectedTags.includes(tag.name),
          }}
        />
        <Td dataLabel={columnNames.Tag}>
          <Link to={getTagDetailPath(props.org, props.repo, tag.name)}>
            {tag.name}
          </Link>
        </Td>
        <Td dataLabel={columnNames.Security}>
          {tag.is_manifest_list ? (
            'See Child Manifest'
          ) : (
            <SecurityDetails
              org={props.org}
              repo={props.repo}
              digest={tag.manifest_digest}
              tag={tag.name}
              variant="condensed"
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
        <Td dataLabel={columnNames.Expires}>{tag.expiration ?? 'Never'}</Td>
        <Td dataLabel={columnNames.Manifest}>
          {tag.manifest_digest.substring(0, 19)}
        </Td>
        <Td dataLabel={columnNames.Pull}>
          <TablePopover
            org={props.org}
            repo={props.repo}
            tag={tag.name}
            digest={tag.manifest_digest}
          >
            <i data-testid="pull" className="fa fa-download"></i>
          </TablePopover>
        </Td>
      </Tr>
      {tag.manifest_list
        ? tag.manifest_list.manifests.map((manifest, rowIndex) => (
            <SubRow
              key={rowIndex}
              org={props.org}
              repo={props.repo}
              tag={tag}
              rowIndex={rowIndex}
              manifest={manifest}
              isTagExpanded={props.isTagExpanded}
            />
          ))
        : null}
    </Tbody>
  );
}

export default function Table(props: TableProps) {
  // Control selected tags
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
  const selectAllTags = (isSelecting = true) => {
    setSelectedTags(isSelecting ? props.tags.map((t) => t.name) : []);
  };
  const selectTag = (tag: Tag, isSelecting = true) =>
    setSelectedTags((prevSelected) => {
      const otherSelectedtagNames = prevSelected.filter((r) => r !== tag.name);
      return isSelecting
        ? [...otherSelectedtagNames, tag.name]
        : otherSelectedtagNames;
    });

  // Control expanded tags
  const [expandedTags, setExpandedTags] = useState<string[]>([]);
  const setTagExpanded = (tag: Tag, isExpanding = true) =>
    setExpandedTags((prevExpanded) => {
      // If expanding, add tag name to list otherwise return list without tag name
      // Filter accounts for cases where tag name is already in list when isExpanding == true
      const otherExpandedtagNames = prevExpanded.filter((r) => r !== tag.name);
      return isExpanding
        ? [...otherExpandedtagNames, tag.name]
        : otherExpandedtagNames;
    });
  const isTagExpanded = (tag: Tag) => expandedTags.includes(tag.name);

  return (
    <>
      <TableComposable variant="compact" aria-label="Expandable table">
        <Thead>
          <Tr>
            <Th />
            <Th
              select={{
                onSelect: (_event, isSelecting) => selectAllTags(isSelecting),
                isSelected: selectedTags.length === props.tags.length,
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
        {props.tags.map((tag: Tag, rowIndex: number) => (
          <Row
            key={rowIndex}
            org={props.org}
            repo={props.repo}
            tag={tag}
            rowIndex={rowIndex}
            selectedTags={selectedTags}
            isTagExpanded={isTagExpanded}
            setTagExpanded={setTagExpanded}
            selectTag={selectTag}
          />
        ))}
      </TableComposable>

      {props.loading ? <Spinner isSVG size="lg" /> : null}
      {props.tags.length == 0 && !props.loading ? (
        <div>This repository is empty.</div>
      ) : null}
    </>
  );
}

interface TableProps {
  org: string;
  repo: string;
  tags: Tag[];
  loading: boolean;
}

interface RowProps {
  org: string;
  repo: string;
  tag: Tag;
  rowIndex: number;
  selectedTags: string[];
  isTagExpanded: (tag: Tag) => boolean;
  setTagExpanded: (tag: Tag, isExpanding?: boolean) => void;
  selectTag: (tag: Tag, isSelecting?: boolean) => void;
}

interface SubRowProps {
  org: string;
  repo: string;
  tag: Tag;
  rowIndex: number;
  manifest: Manifest;
  isTagExpanded: (tag: Tag) => boolean;
}
