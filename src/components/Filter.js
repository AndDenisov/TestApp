import React from 'react';
import styled from "styled-components";
import { AppBar, Toolbar, IconButton, Input } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

export const Filter = ({ value, onSearchChanged }) => {
  return (
    <AppBarWrapper>
      <AppBar position="static">
        <Toolbar>
          <CustomIconButton color="inherit">
            <MenuIcon />
          </CustomIconButton>
          <Grow />
          <SearchWrapper>
            <IconWrapper>
              <SearchIcon />
            </IconWrapper>
            <CustomInput
              placeholder="Search…"
              onChange={onSearchChanged}
              value={value}
            />
          </SearchWrapper>
        </Toolbar>
      </AppBar>
    </AppBarWrapper>
  );
};

//styled

const AppBarWrapper = styled.div`
  width: 100%;
`;

const Grow = styled.div`
  width: 85%;
`;

const CustomIconButton = styled(IconButton)`
  margin-left: -12;
  margin-right: 20;
`;

const CustomInput = styled(Input)`
  input{
    color: white;
  }
  width: 100%;
  padding-top: theme.spacing.unit;
  padding-right: theme.spacing.unit;
  padding-bottom: theme.spacing.unit;
  padding-left: theme.spacing.unit * 10;
  transition: theme.transitions.create('width');
  [theme.breakpoints.up('sm')]: {
    width: 120;
    &:focus: {
      width: 200;
    }
  }
`;

const IconWrapper = styled.div`
  margin-left: -25px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchWrapper = styled.div`
  position: relative;
  border-radius: theme.shape.borderRadius;
  background-color: fade(theme.palette.common.white, 0.15);
  &:hover: {
    background-color: fade(theme.palette.common.white, 0.25);
  },
  margin-left: 0;
  [theme.breakpoints.up('sm')]: {
    margin-left: theme.spacing.unit;
    width: auto;
  },
`;
