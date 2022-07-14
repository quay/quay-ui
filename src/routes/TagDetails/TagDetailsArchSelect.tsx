import {
  Select,
  SelectOption,
  SelectVariant,
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import {useState} from 'react';

export default function ArchSelect(props: ArchSelectProps) {
  if (!props.render) return null;
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>();

  return (
    <Flex>
      <FlexItem>Architecture</FlexItem>
      <FlexItem>
        <Select
          variant={SelectVariant.single}
          placeholderText="Architecture"
          aria-label="Architecture select"
          onToggle={() => {
            setIsSelectOpen(!isSelectOpen);
          }}
          onSelect={(e, arch) => {
            props.setArch(arch as string);
            setIsSelectOpen(false);
          }}
          selections={props.arch}
          isOpen={isSelectOpen}
          data-testid="arch-select"
        >
          {props.options.map((arch, index) => (
            <SelectOption key={index} value={arch} />
          ))}
        </Select>
      </FlexItem>
    </Flex>
  );
}

type ArchSelectProps = {
  arch: string;
  options: string[];
  setArch: (arch: string) => void;
  render: boolean;
};
