import * as React from 'react';

import { Button, ClipboardCopy, Modal, TextVariants, Text } from '@patternfly/react-core';

export const ClipboardCopyReadOnly: React.FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (  <Modal
    title="Simple modal header"
    isOpen={isModalOpen}
    onClose={()=>{setIsModalOpen(!isModalOpen)}}
    actions={[
      <Button key="cancel" variant="link" onClick={()=>{setIsModalOpen(!isModalOpen)}}>
        Close
      </Button>
    ]}
  >
    <Text component={TextVariants.h6}>Docker Pull (By Tag)</Text>
    <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied">
      This is read-only one
    </ClipboardCopy>

    <Text component={TextVariants.h6}>Docker Pull (By Digest)</Text>
    <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied">
      This is read-only two
    </ClipboardCopy>
  </Modal>)

};