import { TagsToolbar } from './Filter';
import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { Button, ClipboardCopy, Modal, TextVariants, ModalVariant, Text } from '@patternfly/react-core';
import * as React from 'react';
import axios from 'src/libs/axios';
import {useAxios} from 'src/hooks/UseAxios';

interface Tag {
    Tag: string;
    OS: string;
    Security: string;
    Size: string;
    LastModified: string;
    Manifest: string;
    Pull: string;
}

export default function Tags(props) {
    // Mock Tags
    const tags: Tag[] = [
        { Tag: 'one', OS: 'Mac', Security: 'a', Size: '4', LastModified: '123', Manifest: 'dummy', Pull: 'icon' },
        { Tag: 'two', OS: 'Linux', Security: 'b', Size: '6', LastModified: '456', Manifest: 'dummy', Pull: 'icon' }
    ];
    const columnNames = {
        Tag: 'Tag',
        OS: 'OS',
        Security: 'Security',
        Size: 'Size',
        LastModified: 'Last Modified',
        Manifest: 'Manifest',
        Pull: 'Pull'
    }
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [selectedTagNames, setSelectedTagNames] = React.useState<string[]>([]);
    const [recentSelectedRowIndex, setRecentSelectedRowIndex] = React.useState<number | null>(null);
    const isTagSelectable = (tag: Tag) => tag.Tag !== 'a'; // Arbitrary logic for this example
    
    const selectableTags = tags.filter(isTagSelectable);
    const areAllTagsSelected = selectedTagNames.length === selectableTags.length;
    const selectAllTags = (isSelecting = true) =>
        setSelectedTagNames(isSelecting ? selectableTags.map(t => t.Tag) : []);
    
    const isTagSelected = (tag: Tag) => selectedTagNames.includes(tag.Tag);
    const setTagSelected = (tag: Tag, isSelecting = true) =>
        setSelectedTagNames(prevSelected => {
            const otherSelectedRepoNames = prevSelected.filter(r => r !== tag.Tag);
            return isSelecting && isTagSelectable(tag) ? [...otherSelectedRepoNames, tag.Tag] : otherSelectedRepoNames;
    });
    const onSelectTag = (repo: Tag, rowIndex: number, isSelecting: boolean) => {
        setTagSelected(repo, isSelecting);
        setRecentSelectedRowIndex(rowIndex);
    };
    
    return (
        <>
        <Modal
            title="Simple modal header"
            isOpen={isModalOpen}
            onClose={()=>{setIsModalOpen(!isModalOpen)}}
            variant={ModalVariant.small}
            actions={[
            <Button key="cancel" variant="primary" onClick={()=>{setIsModalOpen(!isModalOpen)}}>
                Close
            </Button>
            ]}
        >
            <Text component={TextVariants.h5}>Docker Pull (By Tag)</Text>
            <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied">
                This is read-only one
            </ClipboardCopy>
            <br></br>
            <Text component={TextVariants.h5}>Docker Pull (By Digest)</Text>
            <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied">
                This is read-only two
            </ClipboardCopy>
        </Modal>

        <TagsToolbar></TagsToolbar>
        
        <TableComposable>
            <Thead>
                <Tr>
                    <Th
                        select={{
                        onSelect: (_event, isSelecting) => selectAllTags(isSelecting),
                        isSelected: areAllTagsSelected
                        }}
                    />
                    <Th>Tag</Th>
                    <Th>OS</Th>
                    <Th>Security</Th>
                    <Th>Size</Th>
                    <Th>Last Modified</Th>
                    <Th>Manifest</Th>
                    <Th>Pull</Th>
                </Tr>
            </Thead>
            <Tbody>
            {tags.map((tag, rowIndex) => (
                <Tr key={tag.Tag}>
                    <Td
                    select={{
                        rowIndex,
                        onSelect: (_event, isSelecting) => onSelectTag(tag, rowIndex, isSelecting),
                        isSelected: isTagSelected(tag),
                    }}
                    />
                    <Td dataLabel={columnNames.Tag}>{tag.Tag}</Td>
                    <Td dataLabel={columnNames.OS}>{tag.OS}</Td>
                    <Td dataLabel={columnNames.Security}>{tag.Security}</Td>    
                    <Td dataLabel={columnNames.Size}>{tag.Size}</Td>
                    <Td dataLabel={columnNames.LastModified}>{tag.LastModified}</Td>
                    <Td dataLabel={columnNames.Manifest}>{tag.Manifest}</Td>
                    <Td dataLabel={columnNames.Pull} onClick={()=>{setIsModalOpen(!isModalOpen)}}>{tag.Pull}</Td>
                </Tr>
            ))}
            </Tbody>
        </TableComposable>
        </>
    )
}
