// disable eslint for this file
/* eslint-disable */

import { useState } from "react";
import { Menu, MenuItem, MenuList } from "@mui/material";
import { CustomChip } from "../Project/Project";

import PlaceIcon from '@mui/icons-material/Place';
import { LocalStorage } from "../../Utils/LocalStorage";

export const SchoolSelector = (props) => {
  const { allowSelect, currentSchoolID, currentSchoolName, allowedSchools, fetchDataForDashboard } = props;

  if (allowSelect === false || !Array.isArray(allowedSchools) || allowedSchools.length <= 1)
    return (
      <CustomChip
        icon={<PlaceIcon />}
        label={currentSchoolName}
        tooltipTitle={"School"}
      />
    );

  const [schoolID, setSchoolID] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemSelect = (schoolID) => () => {
    if (currentSchoolID !== schoolID) {
      localStorage.setItem(LocalStorage.schoolID, schoolID)
      setSchoolID(schoolID);
      fetchDataForDashboard(schoolID);
    }
    handleClose();
  };

  return (
    <>
      <CustomChip
        icon={<PlaceIcon />}
        label={currentSchoolName}
        tooltipTitle={"Click to Select School"}
        clickable
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuList dense>
          {allowedSchools.map((school, index) => (
            <MenuItem
              key={index}
              onClick={handleItemSelect(school.school_id)}
            >
              {school.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

