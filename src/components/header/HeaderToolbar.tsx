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
import { useNavigate } from 'react-router-dom';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import { UserState } from 'src/atoms/UserState';
import { IUserResource } from 'src/resources/UserResource';
import {GlobalAuthState, logoutUser} from "src/resources/AuthResource";

export function HeaderToolbar() {
    const [user, ] = useRecoilState<IUserResource>(UserState);
    const resetUser = useResetRecoilState(UserState);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();

    const onDropdownToggle = () => {
        console.log('onDropdownToggle');
        setIsDropdownOpen((prev) => !prev)
    }


    const onDropdownSelect = (e) => {
        console.log('onDropdownSelect');
        console.log(e);
        setIsDropdownOpen(false);
        switch (e.target.value) {
            case 'logout':
               console.log('logout') ;
               // call the logout API
                logoutUser().then(() => {
                    // reset the CSRF token
                    GlobalAuthState.csrfToken = undefined;
                    resetUser()
                    navigate('/signin')
                }).catch((e) => {
                    // TODO: notify error
                    console.error(e)
                });
               break;
            default:
                break;
        }
    }

    const userDropdownItems = [
        <DropdownGroup key="group 2">
            <DropdownItem value="profile" key="profile" component="button">My profile</DropdownItem>
            <DropdownItem value="settings" key="settings" component="button">
                User management
            </DropdownItem>
            <DropdownItem value="logout" key="group 2 logout" component="button">Logout</DropdownItem>
        </DropdownGroup>
    ];

    const userDropdown = (<Dropdown
        position="right"
        onSelect={(value) => onDropdownSelect(value)}
        isOpen={isDropdownOpen}
        toggle={
            <DropdownToggle icon={<UserIcon />} onToggle={onDropdownToggle}>
                {user? user.username: ''}
            </DropdownToggle>
        }
        dropdownItems={userDropdownItems}
    />);

    const signInButton = (
        <Button> Sign In </Button>
    )


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
                        {user ? userDropdown : signInButton}
                    </ToolbarItem>
                </ToolbarGroup>
            </ToolbarContent>
        </Toolbar>
    )
}
