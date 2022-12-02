import React from 'react';
import {
  ToggleGroup,
  ToggleGroupItem,
  ToolbarItem,
} from '@patternfly/react-core';

export default function AllSelectedToggleButton(
  props: AllSelectedToggleButtonProps,
) {
  const [isSelected, setIsSelected] = React.useState('');

  const handleItemClick = (
    isSelected: boolean,
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
  ) => {
    const id = event.currentTarget.id;
    setIsSelected(id);
  };

  return (
    <ToolbarItem>
      <ToggleGroup aria-label="Default with single selectable">
        <ToggleGroupItem
          text="All"
          buttonId="All"
          isSelected={isSelected === 'All'}
          onChange={handleItemClick}
        />
        <ToggleGroupItem
          text="Selected"
          buttonId="Selected"
          isSelected={isSelected === 'Selected'}
          onChange={handleItemClick}
        />
      </ToggleGroup>
    </ToolbarItem>
  );
}

interface AllSelectedToggleButtonProps {
  selectedItems: any[];
  allItemsList: any[];
  itemsPerPageList: any[];
}
