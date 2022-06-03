import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { Button, ClipboardCopy, Modal, ModalVariant, Text } from '@patternfly/react-core';
import {useState} from 'react';

export interface Tag {
    Name: string;
    OS: string;
    Security: string;
    Size: string;
    LastModified: string;
    Manifest: string;
    Pull: string;
    Digest: string;
}

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
 
    const isTagSelectable = (tag: Tag) => tag.Name !== 'a'; // Arbitrary logic for this example
    const selectableTags = props.tags.filter(isTagSelectable);

    const selectAllTags = (isSelecting = true) => {
        setSelectedTagNames(isSelecting ? selectableTags.map(t => t.Name) : []);
    }
    
    const setTagSelected = (tag: Tag, isSelecting = true) =>
        setSelectedTagNames(prevSelected => {
            const otherSelectedRepoNames = prevSelected.filter(r => r !== tag.Name);
            return isSelecting && isTagSelectable(tag) ? [...otherSelectedRepoNames, tag.Name] : otherSelectedRepoNames;
    });

    const onSelectTag = (repo: Tag, rowIndex: number, isSelecting: boolean) => {
        setTagSelected(repo, isSelecting);
        setRecentSelectedRowIndex(rowIndex);
    };

    const openModal = (tag: Tag) => {
        setModalImageTag(tag.Name)
        setModalImageDigest(tag.Digest)
        setIsModalOpen(!isModalOpen)
    }

    return (
        <>
            <Modal
                title={`Fetch Tag: ${modalImageTag}`}
                isOpen={isModalOpen}
                onClose={()=>{setIsModalOpen(!isModalOpen)}}
                variant={ModalVariant.small}
                actions={[
                <Button key="cancel" variant="primary" onClick={()=>{setIsModalOpen(!isModalOpen)}}>
                    Close
                </Button>
                ]}
            >
                <Text style={{fontWeight: "bold"}}>Docker Pull (By Tag)</Text>
                {/* TODO: Pull in repo name */}
                <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied">
                    docker pull quay.io/{props.organization}/{props.repository}:{modalImageTag}
                </ClipboardCopy>
                <br></br>
                <Text style={{fontWeight: "bold"}}>Docker Pull (By Digest)</Text>
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
                            isSelected: selectedTagNames.includes(tag.Name),
                        }}
                        />
                        <Td dataLabel={columnNames.Tag}>{tag.Name}</Td>
                        <Td dataLabel={columnNames.OS}>{tag.OS}</Td>
                        <Td dataLabel={columnNames.Security}>{tag.Security}</Td>    
                        <Td dataLabel={columnNames.Size}>{tag.Size}</Td>
                        <Td dataLabel={columnNames.LastModified}>{tag.LastModified}</Td>
                        <Td dataLabel={columnNames.Manifest}>{tag.Manifest}</Td>
                        <Td dataLabel={columnNames.Pull} onClick={()=>{openModal(tag)}}><i className="fa fa-download"></i></Td>
                    </Tr>
                ))}
                </Tbody>
            </TableComposable>
        </>
    )
}

type TableProps =  {
    organization: string;
    repository: string;
    tags: Tag[];
}