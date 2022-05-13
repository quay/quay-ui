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
import {Link} from "react-router-dom";


export function QuayHeader() {

  return (
    <Masthead>
      <MastheadToggle>
        <Button variant="plain" aria-label="Global navigation">
          <BarsIcon />
        </Button>
      </MastheadToggle>
      <MastheadMain>
        <MastheadBrand component={props => <Link {...props} to="/" />} >
            <Brand src={logo} alt="Red Hat Quay" className={'header-logo'}  />
        </MastheadBrand>
      </MastheadMain>
        <MastheadContent>
            <HeaderToolbar />
        </MastheadContent>
    </Masthead>
  );
}
