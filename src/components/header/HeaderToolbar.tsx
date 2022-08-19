import {
  Button,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownToggle,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import {UserIcon} from '@patternfly/react-icons';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {CurrentUsernameState} from 'src/atoms/UserState';
import {GlobalAuthState, logoutUser} from 'src/resources/AuthResource';

export function HeaderToolbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUsername, setCurrentUsername] =
    useRecoilState(CurrentUsernameState);

  const navigate = useNavigate();

  const onDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const onDropdownSelect = async (e) => {
    setIsDropdownOpen(false);
    switch (e.target.value) {
      case 'logout':
        try {
          await logoutUser();
          GlobalAuthState.csrfToken = undefined;
          setCurrentUsername('');
          navigate('/signin');
        } catch (err: any) {
          console.error(e);
          // TODO: Notify user error in signing out
        }
        break;
      default:
        break;
    }
  };

  const userDropdownItems = [
    <DropdownGroup key="group 2">
      <DropdownItem value="logout" key="group 2 logout" component="button">
        Logout
      </DropdownItem>
    </DropdownGroup>,
  ];

  const userDropdown = (
    <Dropdown
      position="right"
      onSelect={(value) => onDropdownSelect(value)}
      isOpen={isDropdownOpen}
      toggle={
        <DropdownToggle icon={<UserIcon />} onToggle={onDropdownToggle}>
          {currentUsername}
        </DropdownToggle>
      }
      dropdownItems={userDropdownItems}
    />
  );

  const signInButton = <Button> Sign In </Button>;

  return (
    <Toolbar id="toolbar" isFullHeight isStatic>
      <ToolbarContent>
        <ToolbarGroup
          variant="icon-button-group"
          alignment={{default: 'alignRight'}}
          spacer={{default: 'spacerNone', md: 'spacerMd'}}
        >
          <ToolbarItem>
            {currentUsername ? userDropdown : signInButton}
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
}
