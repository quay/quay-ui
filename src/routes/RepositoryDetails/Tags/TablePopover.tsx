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
import {useRecoilState} from 'recoil';
import {currentOpenPopoverState} from 'src/atoms/TagListState';
import {useQuayConfig} from 'src/hooks/UseQuayConfig';

import docker from 'src/assets/docker.svg';
import podman from 'src/assets/podman.svg';
import 'src/routes/TagDetails/Details/DetailsCopyTags.css';

export default function TablePopover(props: TablePopoverProps) {
  const [currentOpenPopover, setCurrentOpenPopover] = useRecoilState(
    currentOpenPopoverState,
  );

  const config = useQuayConfig();
  const domain = config?.config.SERVER_HOSTNAME;

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
          <Text style={{fontWeight: 'bold'}}>
            <img
              className="pf-u-float-left icon-margin-right"
              height="20"
              width="20"
              src={podman}
            />
            Podman Pull (By Tag)
          </Text>
          <ClipboardCopy
            data-testid="copy-tag-podman"
            isReadOnly
            hoverTip="Copy"
            clickTip="Copied"
          >
            podman pull {domain}/{props.org}/{props.repo}:{props.tag}
          </ClipboardCopy>
          <br />
          <Text style={{fontWeight: 'bold'}}>
            <img
              className="pf-u-float-left icon-margin-right"
              height="20"
              width="20"
              src={podman}
            />
            Podman Pull (By Digest)
          </Text>
          <ClipboardCopy
            data-testid="copy-digest-podman"
            isReadOnly
            hoverTip="Copy"
            clickTip="Copied"
          >
            podman pull {domain}/{props.org}/{props.repo}@{props.digest}
          </ClipboardCopy>
          <br />
          <Text style={{fontWeight: 'bold'}}>
            <img
              className="pf-u-float-left icon-margin-right"
              height="20"
              width="20"
              src={docker}
            />
            Docker Pull (By Tag)
          </Text>
          <ClipboardCopy
            data-testid="copy-tag-docker"
            isReadOnly
            hoverTip="Copy"
            clickTip="Copied"
          >
            docker pull {domain}/{props.org}/{props.repo}:{props.tag}
          </ClipboardCopy>
          <br />
          <Text style={{fontWeight: 'bold'}}>
            <img
              className="pf-u-float-left icon-margin-right"
              height="20"
              width="20"
              src={docker}
            />
            Docker Pull (By Digest)
          </Text>
          <ClipboardCopy
            data-testid="copy-digest-docker"
            isReadOnly
            hoverTip="Copy"
            clickTip="Copied"
          >
            docker pull {domain}/{props.org}/{props.repo}@{props.digest}
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
