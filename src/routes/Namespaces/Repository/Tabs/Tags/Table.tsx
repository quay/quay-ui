import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { Button, ClipboardCopy, Modal, ModalVariant, Text } from '@patternfly/react-core';
import { useState } from 'react';
import { Tag, TagsResponse, getTags } from 'src/resources/TagResource';


const columnNames = {
    Tag: 'Tag',
    OS: 'OS',
    Security: 'Security',
    Size: 'Size',
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
            const otherSelectedRepoNames = prevSelected.filter(r => r !== tag.name);
            return isSelecting && isTagSelectable(tag) ? [...otherSelectedRepoNames, tag.name] : otherSelectedRepoNames;
        });

    const onSelectTag = (repo: Tag, rowIndex: number, isSelecting: boolean) => {
        setTagSelected(repo, isSelecting);
        setRecentSelectedRowIndex(rowIndex);
    };

    const openModal = (tag: Tag) => {
        setModalImageTag(tag.name)
        setModalImageDigest(tag.manifest_digest)
        setIsModalOpen(!isModalOpen)
    }

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
            <TableComposable>
                <Thead>
                    <Tr>
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
                        <Th>Manifest</Th>
                        <Th>Pull</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.tags.map((tag, rowIndex) => (
                        <Tr key={rowIndex}>
                            <Td
                                select={{
                                    rowIndex,
                                    onSelect: (_event, isSelecting) => onSelectTag(tag, rowIndex, isSelecting),
                                    isSelected: selectedTagNames.includes(tag.name),
                                }}
                            />
                            <Td dataLabel={columnNames.Tag}>{tag.name}</Td>
                            <Td dataLabel={columnNames.OS}>os-mocked</Td>                         {/* TODO: Get info from API */}
                            <Td dataLabel={columnNames.Security}>sec-mocked</Td>       {/* TODO: Get info from API */}
                            <Td dataLabel={columnNames.Size}>{tag.size}</Td>
                            <Td dataLabel={columnNames.LastModified}>{tag.last_modified}</Td>
                            <Td dataLabel={columnNames.Manifest}>{tag.manifest_digest}</Td>
                            <Td dataLabel={columnNames.Pull} onClick={() => { openModal(tag) }}><i className="fa fa-download"></i></Td>
                        </Tr>
                    ))}
                </Tbody>
            </TableComposable>
        </>
    )
}

type TableProps = {
    organization: string;
    repository: string;
    tags: Tag[];
}