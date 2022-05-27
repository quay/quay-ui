import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';


export default function Tags(props) {
    return (
        <TableComposable>
            <Thead>
                <Tr>
                    <Th>Tag</Th>
                    <Th>Security</Th>
                    <Th>Size</Th>
                    <Th>Last Modified</Th>
                    <Th>Manifest</Th>
                </Tr>
            </Thead>
            <Tbody>
            </Tbody>
        </TableComposable>
    )
}
