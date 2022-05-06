import {
    Avatar,
    Button,
    ButtonVariant,
    Dropdown, DropdownGroup, DropdownItem, DropdownToggle, KebabToggle,
    Toolbar,
    ToolbarContent,
    ToolbarGroup,
    ToolbarItem
} from '@patternfly/react-core';
import {AttentionBellIcon, CogIcon, HelpIcon, LightbulbIcon, QuestionCircleIcon, UserIcon} from '@patternfly/react-icons';
import React, { useState } from 'react';

export function HeaderToolbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const onDropdownToggle = () => {
        console.log('onDropdownToggle');
        setIsDropdownOpen((prev) => !prev)
    }


    const onDropdownSelect = () => {
        console.log('onDropdownSelect');
        setIsDropdownOpen(false);
    }

    const userDropdownItems = [
        <DropdownGroup key="group 2">
            <DropdownItem key="group 2 profile">My profile</DropdownItem>
            <DropdownItem key="group 2 user" component="button">
                User management
            </DropdownItem>
            <DropdownItem key="group 2 logout">Logout</DropdownItem>
        </DropdownGroup>
    ];

    return (
        <Toolbar id="toolbar" isFullHeight isStatic>
            <ToolbarContent>
                <ToolbarGroup
                    variant="icon-button-group"
                    alignment={{default: 'alignRight'}}
                    spacer={{default: 'spacerNone', md: 'spacerMd'}}
                >
                    <ToolbarItem>
                        <Button aria-label="Notifications" variant={ButtonVariant.plain}>
                            <AttentionBellIcon/>
                        </Button>
                    </ToolbarItem>
                    <ToolbarItem>
                        <Button aria-label="Settings actions" variant={ButtonVariant.plain}>
                            <CogIcon/>
                        </Button>
                    </ToolbarItem>
                    <ToolbarItem>
                        <Button aria-label="Help actions" variant={ButtonVariant.plain}>
                            <QuestionCircleIcon/>
                        </Button>
                    </ToolbarItem>
                    <ToolbarItem>
                        <Dropdown
                            position="right"
                            onSelect={onDropdownSelect}
                            isOpen={isDropdownOpen}
                            toggle={
                                <DropdownToggle icon={<UserIcon />} onToggle={onDropdownToggle}>
                                    John Smith
                                </DropdownToggle>
                            }
                            dropdownItems={userDropdownItems}
                        />
                    </ToolbarItem>
                </ToolbarGroup>
            </ToolbarContent>
        </Toolbar>
    )
}
