import {Select, SelectOption, SelectVariant} from '@patternfly/react-core';
import {useEffect, useState} from 'react';
import {useEntities} from 'src/hooks/UseEntities';
import {Entity, getMemberType} from 'src/resources/UserResource';

export default function EntitySearch(props: EntitySearchProps) {
  const [selectedEntityName, setSelectedEntityName] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {entities, isError, searchTerm, setSearchTerm} = useEntities(props.org);

  useEffect(() => {
    if (selectedEntityName != undefined && selectedEntityName != '') {
      const filteredEntity = entities.filter(
        (e) => e.name === selectedEntityName,
      );
      const selectedEntity =
        filteredEntity.length > 0 ? filteredEntity[0] : null;
      props.onSelect(selectedEntity);
    }
  }, [selectedEntityName]);

  useEffect(() => {
    if (isError) {
      props.onError();
    }
  }, [isError]);

  return (
    <Select
      toggleId={props.id ? props.id : 'entity-search'}
      isOpen={isOpen}
      selections={searchTerm}
      onSelect={(e, value) => {
        setSearchTerm(value as string);
        setSelectedEntityName(value as string);
        setIsOpen(!isOpen);
      }}
      onToggle={() => {
        setIsOpen(!isOpen);
      }}
      variant={SelectVariant.typeahead}
      onTypeaheadInputChanged={(value) => {
        setSearchTerm(value);
      }}
      shouldResetOnSelect={true}
      onClear={() => {
        setSearchTerm('');
      }}
    >
      {entities.map((e) => (
        <SelectOption
          key={e.name}
          value={e.name}
          description={getMemberType(e)}
        />
      ))}
    </Select>
  );
}

interface EntitySearchProps {
  org: string;
  onSelect: (entity: Entity) => void;
  onError?: () => void;
  id?: string;
}
