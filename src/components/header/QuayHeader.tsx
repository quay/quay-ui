import React from 'react';

import {
    Masthead,
    MastheadToggle,
    MastheadMain,
    MastheadBrand,
    Button,
    MastheadContent,
    Brand,
} from '@patternfly/react-core';

import BarsIcon from '@patternfly/react-icons/dist/js/icons/bars-icon';
import logo from 'src/assets/RH_QuayIO2.svg';
import {HeaderToolbar} from "./HeaderToolbar";

// import {useNavigate} from "react-router-dom";

export function QuayHeader() {
    /* function LogoImg() {
        const navigate = useNavigate();
        function handleClick() {
            navigate('/');
        }
        return (
            <img src={logo} onClick={handleClick} alt="Red Hat Quay" />
        );
    } */

  return (
    <Masthead>
      <MastheadToggle>
        <Button variant="plain" aria-label="Global navigation">
          <BarsIcon />
        </Button>
      </MastheadToggle>
      <MastheadMain>
        <MastheadBrand >
            <Brand src={logo} alt="Red Hat Quay" className={'header-logo'} />
        </MastheadBrand>
      </MastheadMain>
        <MastheadContent>
            <HeaderToolbar />
        </MastheadContent>
    </Masthead>
  );
}
