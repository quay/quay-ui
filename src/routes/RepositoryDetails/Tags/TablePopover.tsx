import {
  Popover,
  PopoverPosition,
  Button,
  ClipboardCopy,
  Modal,
  ModalVariant,
  Text,
  Tooltip,
} from '@patternfly/react-core';
import {getDomain} from 'src/routes/NavigationPath';
import {useState} from 'react';
import {useRecoilState} from 'recoil';
import {currentOpenPopoverState} from 'src/atoms/TagListState';

export default function TablePopover(props: TablePopoverProps) {
  const [currentOpenPopover, setCurrentOpenPopover] = useRecoilState(
    currentOpenPopoverState,
  );
  return (
    <Popover
      isVisible={currentOpenPopover === props.tag}
      shouldClose={() => {
        setCurrentOpenPopover('');
      }}
      headerContent={<div>Fetch Tag</div>}
      onMouseLeave={() => {
        setCurrentOpenPopover('');
      }}
      bodyContent={
        <div>
          <Text style={{fontWeight: 'bold'}}>Podman Pull (By Tag)</Text>
          <ClipboardCopy
            data-testid="copy-tag-podman"
            isReadOnly
            hoverTip="Copy"
            clickTip="Copied"
            onCopy={() => setCurrentOpenPopover('')}
          >
            podman pull {getDomain()}/{props.org}/{props.repo}:{props.tag}
          </ClipboardCopy>
          <br />
          <Text style={{fontWeight: 'bold'}}>Podman Pull (By Digest)</Text>
          <ClipboardCopy
            data-testid="copy-digest-podman"
            isReadOnly
            hoverTip="Copy"
            clickTip="Copied"
            onCopy={() => setCurrentOpenPopover('')}
          >
            podman pull {getDomain()}/{props.org}/{props.repo}@{props.digest}
          </ClipboardCopy>
          <br />
          <Text style={{fontWeight: 'bold'}}>Docker Pull (By Tag)</Text>
          <ClipboardCopy
            data-testid="copy-tag-docker"
            isReadOnly
            hoverTip="Copy"
            clickTip="Copied"
            onCopy={() => setCurrentOpenPopover('')}
          >
            docker pull {getDomain()}/{props.org}/{props.repo}:{props.tag}
          </ClipboardCopy>
          <br />
          <Text style={{fontWeight: 'bold'}}>Docker Pull (By Digest)</Text>
          <ClipboardCopy
            data-testid="copy-digest-docker"
            isReadOnly
            hoverTip="Copy"
            clickTip="Copied"
            onCopy={() => setCurrentOpenPopover('')}
          >
            docker pull {getDomain()}/{props.org}/{props.repo}@{props.digest}
          </ClipboardCopy>
        </div>
      }
    >
      <div
        onMouseEnter={() => {
          setCurrentOpenPopover(props.tag);
        }}
      >
        {props.children}
      </div>
    </Popover>
  );
}

type TablePopoverProps = {
  org: string;
  repo: string;
  tag: string;
  digest: string;
  children: React.ReactNode;
};
