import React from 'react';
import { connect } from 'react-redux';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  MenuItem,
  Button,
  Stack,
  ButtonGroup,
  ClickAwayListener,
  Paper,
  Popper,
  MenuList,
} from '@mui/material';

import _ from 'underscore';

import { formUseStyles } from '@paymate/common/style';

const exportMenuOptions = ['XLS', 'CSV'];

function FilterButtons(props) {
  const classes = formUseStyles();
  const anchorRef = React.useRef(null);
  const [openExportMenu, setOpenExportMenu] = React.useState(false);
  const [selectedExportValue, setSelectedExportValue] = React.useState('XLS');

  const handleExportMenuItemClick = (option) => () => {
    setSelectedExportValue(option);
    setOpenExportMenu(false);
  };
  const handleExportMenuToggle = () => {
    setOpenExportMenu((prevOpen) => !prevOpen);
  };
  return (
    <div>
      <Stack direction="row" spacing={1}>
        {props.onApply !== undefined && (
          <Button
            variant="contained"
            id="submit-button"
            onClick={props.onApply}
          >
            SUBMIT
          </Button>
        )}
        <ButtonGroup aria-label="outlined button group">
          <Button
            variant="outlined"
            onClick={props.handleExportMenuClick(selectedExportValue)}
          >
            Export
          </Button>
          <Button variant="contained" size="small">
            {selectedExportValue}
          </Button>
          <Button
            variant="contained"
            size="small"
            aria-controls={openExportMenu && 'export-button-menu'}
            aria-expanded={openExportMenu && 'true'}
            onClick={handleExportMenuToggle}
            ref={anchorRef}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        {/* {!_.isEmpty(props.onClear) && ( */}
        {props.onApply !== undefined && (
          <Button variant="text" onClick={props.onClear}>
            RESET
          </Button>
        )}

        <Popper
          open={openExportMenu ?? false}
          anchorEl={anchorRef.current}
          disablePortal
        >
          <Paper>
            <ClickAwayListener onClickAway={handleExportMenuToggle}>
              <MenuList id="export-button-menu" autoFocusItem>
                {exportMenuOptions.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={option === selectedExportValue}
                    onClick={handleExportMenuItemClick(option)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </Stack>
    </div>
  );
}

FilterButtons.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(FilterButtons);
