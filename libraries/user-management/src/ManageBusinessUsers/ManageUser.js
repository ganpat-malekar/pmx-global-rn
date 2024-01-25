import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from '@mui/material';

import MUIDataTable from 'mui-datatables';

import lodash from 'lodash';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import _ from 'underscore';
import moment from 'moment';

import { config } from '@paymate/common/config';

import { FilterButtons, TableLoaderSkeleton } from '@paymate/common/components';

import {
  tableColumnOptions,
  useSimpleReactValidator,
  validatorRules,
  decryptAES,
  encryptAES,
  exportData,
  menuPropsTopCorner,
  htmlActionExtractor,
} from '@paymate/common/helpers';

import {
  openConfirmPrompt,
  openRemarkPrompt,
  resetRefresh,
  getAllDepartmentMappedRoles,
  getBusinessList,
  getStatusCodesList,
  getUserList,
  manageBusinessUserConfiguration,
  closeConfirmPrompt,
  closeRemarkPrompt,
  exportDataFromFilter,
  flushDataToExport,
  openMobileAccessPrompt,
  closeMobileAccessPrompt,
} from '@paymate/common/store/actions';
import MobileAppAccess from './Actions/MobileAppAccess';

import { formUseStyles } from '@paymate/common/style';

import filterIcon from '@paymate/common/assets/filterIcon.svg';

function ManageUser(props) {
  const classes = formUseStyles();
  const [openFilter, setOpenFilter] = React.useState(false);
  const resettingRef = React.useRef(true);
  const [page, setPage] = React.useState(1);
  const [sorting, setSorting] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [roleDropdown, setRoleDropdown] = useState([]);
  const [departmentDropdown, setDepartmentDropdown] = useState([]);
  const [chipData, setChipData] = React.useState([]);
  const [anchorElForMenu, setAnchorElForMenu] = React.useState(null);
  const open = Boolean(anchorElForMenu);
  const navigate = useNavigate();

  /**Filter Section Start */
  const [filter, updateFilter] = useState({
    business_name: '',
    CompanyIds: '',
    DepartmentId: '',
    Email: '',
    RoleID: '',
    RoleTypes: '',
    Status: '',
  });
  // Chip Data Starts
  const deleteFilterChip = (chipToBeDeleted) => () => {
    resettingRef.current = true;
    updateFilter({
      ...filter,
      [chipToBeDeleted.name]: '',
    });
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToBeDeleted.key)
    );
  };

  /**Export Section Start */
  const handleExportMenuClick = (fileType) => () => {
    var data = {
      CompanyIds:
        filter.business_name !== ''
          ? decryptAES(filter.business_name.id)
          : '-2', //Hardcoded
      DepartmentId: filter.DepartmentId,
      Email: filter.Email,
      RoleID: filter.RoleID,
      RoleTypes: '2', //Hardcoded
      Status: filter.Status,
    };
    var filename = fileType === 'XLS' ? 'ManageUsers.xlsx' : 'ManageUsers.csv';
    const apiToExportData = config.FETCH_BUSINESS_USER_DATA;
    props.exportDataFromFilter(data, filename, apiToExportData);
  };
  /**Export Section End */

  // VALIDATORS
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    validators: { ...validatorRules },
  });
  const handleFilter = (event) => {
    updateFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  const onClear = () => {
    resettingRef.current = true;
    setChipData([]);
    setOpenFilter(true);
    updateFilter({
      business_name:
        !_.isEmpty(props.tokenData) && props.tokenData.UserType === 'Business'
          ? filter.business_name
          : '',
      CompanyIds: '',
      DepartmentId: '',
      Email: '',
      RoleID: '',
      RoleTypes: '',
      Status: '',
    });
    setPage(1);
  };

  const onApply = () => {
    setPage(1);
    resettingRef.current = true;
    setChipData([]);
    let data = { ...filter };
    let count = 0;
    let new_chip_data = [];
    for (let key in data) {
      if (data[key]) {
        if (key === 'business_name') {
          new_chip_data[count] = {
            key: count,
            name: key,
            label: props.businessList.find(
              (e) => e.id === data.business_name.id
            )?.label,
          };
        } else if (key === 'DepartmentId') {
          new_chip_data[count] = {
            key: count,
            name: key,
            label: departmentDropdown.find(
              (e) => e.DepartmentId === data.DepartmentId
            )?.DepartmentName,
          };
        } else if (key === 'RoleID') {
          new_chip_data[count] = {
            key: count,
            name: key,
            label: roleDropdown.find((e) => e.RoleId === data.RoleID)?.RoleName,
          };
        } else if (key === 'Status') {
          new_chip_data[count] = {
            key: count,
            name: key,
            label: props.statusCodesList.find(
              (e) => e.StatusCode === data.Status
            )?.StatusText,
          };
        } else if (key === 'Email') {
          new_chip_data[count] = {
            key: count,
            name: key,
            label: data[key],
          };
        } else {
          new_chip_data[count] = {
            key: count,
            name: key,
            label: data[key],
          };
        }
        count++;
      }
    }
    setChipData([...new_chip_data]);
    updateFilter({
      ...filter,
    });
    setOpenFilter(false);
  };

  // Code for New Filter UI
  const handleFilterClose = () => {
    setOpenFilter(false);
    setAnchorElForMenu(null);
  };
  const handleFilterButton = (event) => {
    setOpenFilter(true);
    setAnchorElForMenu(event.currentTarget);
  };
  /**Filter Section End */

  // Initialize dropdowns
  useEffect(() => {
    if (!_.isEmpty(props.mappedList)) {
      const reports = _.uniq(
        props.mappedList
          .filter((item) => item.ParentDepartmentId === encryptAES(7)) // put in config
          .map(({ RoleId, RoleName }) => ({ RoleId, RoleName })),
        (item) => item.RoleId
      );

      const departments = _.uniq(
        props.mappedList
          .filter(
            (item) => item.ParentDepartmentId === encryptAES(7) // put in config
          )
          .map(({ RoleId, DepartmentId, DepartmentName }) => ({
            RoleId,
            DepartmentId,
            DepartmentName,
          })),
        (item) => item.DepartmentId
      );

      setRoleDropdown(reports);
      setDepartmentDropdown(departments);
    }
  }, [props.mappedList]);

  // Update department dropdown if role changed
  useEffect(() => {
    if (filter.RoleID !== '') {
      const departments = props.mappedList
        .filter((item) => item.RoleId === filter.RoleID)
        .map(({ RoleId, DepartmentId, DepartmentName }) => ({
          RoleId,
          DepartmentId,
          DepartmentName,
        }));
      setDepartmentDropdown(departments);
    } else {
      const departments = _.uniq(
        props.mappedList
          .filter(
            (item) => item.ParentDepartmentId === encryptAES(7) // put in config
          )
          .map(({ RoleId, DepartmentId, DepartmentName }) => ({
            RoleId,
            DepartmentId,
            DepartmentName,
          })),
        (item) => item.DepartmentId
      );
      setDepartmentDropdown(departments);
    }
  }, [filter.RoleID]);

  /*Initial Loading*/
  useEffect(() => {
    if (resettingRef.current || props.refresh) {
      resettingRef.current = false;
      var data = {
        CompanyIds:
          filter.business_name !== ''
            ? decryptAES(filter.business_name.id)
            : !_.isEmpty(props.tokenData) &&
              props.tokenData?.UserType === 'Business'
            ? props.tokenData.CompanyId
            : '-2', //Hardcoded
        DepartmentId: filter.DepartmentId,
        Email: filter.Email,
        RoleID: filter.RoleID,
        RoleTypes: '2', //Hardcoded
        Status: filter.Status,
        SortExpression: sorting,
        FromRecord: rowsPerPage * (page - 1),
        ToRecord: rowsPerPage * (page - 1) + rowsPerPage,
        PageNumber: page,
        PageSize: rowsPerPage,
      };
      props.getUserList(data);
      props.resetRefresh();
    }
  }, [
    filter,
    page,
    rowsPerPage,
    sorting,
    chipData,
    props.refresh,
    props.tokenData,
  ]);
  /*Initial Loading*/

  useEffect(() => {
    if (
      !_.isEmpty(props.tokenData) &&
      props.tokenData.UserType === 'Business'
    ) {
      props.getBusinessList({
        CompanyID: props.tokenData.CompanyId,
        Status: 1,
      });
    }
  }, [props.tokenData]);

  useEffect(() => {
    props.getAllDepartmentMappedRoles();
    props.getStatusCodesList({
      ReportName: 'BusinessManageUsers',
      RoleType: 'internal',
    });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(props.businessList) && !_.isEmpty(props.tokenData)) {
      const business = props.businessList.find(
        (item) => item.CompanyId === encryptAES(props.tokenData.CompanyId)
      );

      if (!_.isEmpty(business)) {
        updateFilter((prevState) => ({
          ...prevState,
          business_name: business,
        }));
      }
    }
  }, [props.businessList, props.tokenData]);

  /*Export Data*/
  useEffect(() => {
    if (!_.isEmpty(props.exportFiles.data)) {
      console.log(props.exportFiles.data);
      var filename = props.exportFiles.filename;
      var data = props.exportFiles.data.map((item, index) => {
        return {
          'Business Name': item.BusinessName,
          'Contact Name': item.ContactName,
          'Department Name': item.DepartmentName,
          'Role Name': item.RoleName,
          'ISD Code': item.IsdCode,
          'Mobile No': item.MobileNo,
          'Email ID': item.Email,
          Status: item.StatusCode,
          'Registration Date': item.CreatedDateOn,
          'Registration By': item.CreatedContactName,
          'Modified On': item.ModifiedDateOn,
          'Modified By': item.ModifyContactName,
        };
      });

      exportData(data, filename);
      setOpenFilter(false);
      props.flushDataToExport();
    }
  }, [props.exportFiles.data]);

  /*Export Data*/

  const handleOpenConfirmPromp =
    (
      popupState,
      Action,
      MUserId,
      StatusCode,
      UserName,
      MappUserCompanyId,
      fullPromptText
    ) =>
    () => {
      const apiData = {
        MUserId: decryptAES(MUserId),
        Status: '0', // fixed
        StatusCode: StatusCode, // eg "ResetPassword" or "Deactive" or "Active" or "DeleteUser"
        MappUserCompanyId: MappUserCompanyId,
      };

      const payload = {
        title: Action,
        promptText: `${Action} "${UserName}"`,
        fullPromptText,
        isPromptOpen: true,
        closePrompt: props.closeConfirmPrompt,
        apiData: { ...apiData },
        submitToApi: props.manageBusinessUserConfiguration,
      };

      props.openConfirmPrompt(payload);
      popupState.close();
    };

  const handleOpenRemarkPrompt =
    (popupState, Action, MUserId, StatusCode, MappUserCompanyId) => () => {
      const apiData = {
        MUserId: decryptAES(MUserId),
        Status: '0', // fixed
        StatusCode: StatusCode, // eg "ResetPassword" or "Deactive" or "Active" or "DeleteUser"
        MappUserCompanyId: MappUserCompanyId,
      };

      const payload = {
        title: Action,
        customRemarkNode: 'RejectReason',
        isPromptOpen: true,
        closePrompt: props.closeRemarkPrompt,
        apiData: { ...apiData },
        submitToApi: props.manageBusinessUserConfiguration,
      };

      props.openRemarkPrompt(payload);
      popupState.close();
    };

  const handleEdit = (popupState, MUserId) => {
    navigate(`/App/EditBusinessUser/${MUserId}`);
    popupState.close();
  };

  const handleMobileAccess = (popupState, UserId) => () => {
    const data = {
      isPromptOpen: true,
      closePrompt: props.closeMobileAccessPrompt,
      UserId: decryptAES(UserId),
    };
    props.openMobileAccessPrompt(data);
    popupState.close();
  };

  const columns = [
    {
      name: 'CompanyName',
      label: 'Business Name',
      options: {
        ...tableColumnOptions,
        sorting,
        display:
          !_.isEmpty(props.tokenData) &&
          props.tokenData.UserType !== 'Business',
      },
    },
    {
      name: 'ContactName',
      label: 'Contact Name',
      options: { ...tableColumnOptions, sorting },
    },
    {
      name: 'EmailAddress',
      label: 'Email ID',
      options: { ...tableColumnOptions, sorting },
    },
    {
      name: 'Role',
      label: 'Role Name',
      options: { ...tableColumnOptions, sorting },
    },
    {
      name: 'Department',
      label: 'Department Name',
      options: { ...tableColumnOptions, sorting },
    },
    {
      name: 'UDRMStatusDescription',
      label: 'Status',
      options: { ...tableColumnOptions, sorting },
    },
    {
      name: 'Actions',
      label: 'Actions',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div
              style={{
                textAlign: 'center',
                display:
                  value[0] === null || value[0] === '' ? 'none' : 'block',
              }}
            >
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <IconButton size="small" {...bindTrigger(popupState)}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <Menu
                      className={classes.NewMenuDropDown}
                      PaperProps={menuPropsTopCorner}
                      {...bindMenu(popupState)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      {/**Edit User */}
                      <MenuItem
                        style={{
                          display: value[0]?.includes('edit user')
                            ? 'flex'
                            : 'none',
                        }}
                        onClick={() => {
                          handleEdit(popupState, value[1]);
                        }}
                      >
                        {/* <ListItemIcon>
                          <EditIcon fontSize="small" />
                        </ListItemIcon> */}
                        <Typography textAlign="center">Edit User</Typography>
                      </MenuItem>
                      {/**Reset Password */}
                      <MenuItem
                        style={{
                          display: value[0]?.includes('reset password')
                            ? 'flex'
                            : 'none',
                        }}
                        onClick={handleOpenConfirmPromp(
                          popupState,
                          'Reset Password',
                          value[1],
                          'ResetPassword',
                          undefined,
                          undefined,
                          `Are you sure, you want to reset password for "${value[2]}"?`
                        )}
                      >
                        {/* <ListItemIcon>
                          <PasswordIcon fontSize="small" />
                        </ListItemIcon> */}
                        <Typography textAlign="center">
                          Reset Password
                        </Typography>
                      </MenuItem>
                      {/**Activate User */}
                      <MenuItem
                        style={{
                          display: value[0]?.includes('activate user')
                            ? 'flex'
                            : 'none',
                        }}
                        onClick={handleOpenConfirmPromp(
                          popupState,
                          'Activate User',
                          value[1],
                          'Active',
                          value[2]
                        )}
                      >
                        {/* <ListItemIcon>
                          <CheckIcon fontSize="small" />
                        </ListItemIcon> */}
                        <Typography textAlign="center">
                          Activate User
                        </Typography>
                      </MenuItem>
                      {/**Deactivate User */}
                      <MenuItem
                        style={{
                          display: value[0]?.includes('deactivate user')
                            ? 'flex'
                            : 'none',
                        }}
                        onClick={handleOpenConfirmPromp(
                          popupState,
                          'Deactivate User',
                          value[1],
                          'Deactive',
                          value[2],
                          value[3],
                          'Are you sure, you want to deactivate this user? Kindly note user will be deactivated from all the departments (To remove the user from any department, edit the user and unmap the department)'
                        )}
                      >
                        {/* <ListItemIcon>
                          <ClearIcon fontSize="small" />
                        </ListItemIcon> */}
                        <Typography textAlign="center">
                          Deactivate User
                        </Typography>
                      </MenuItem>
                      {/**Approve User */}
                      <MenuItem
                        style={{
                          display: value[0]?.includes('approve user')
                            ? 'flex'
                            : 'none',
                        }}
                        onClick={handleOpenConfirmPromp(
                          popupState,
                          'Approve User',
                          value[1],
                          'Approve',
                          value[2],
                          value[3]
                        )}
                      >
                        {/* <ListItemIcon>
                          <ClearIcon fontSize="small" />
                        </ListItemIcon> */}
                        <Typography textAlign="center">Approve User</Typography>
                      </MenuItem>
                      {/**Reject User */}
                      <MenuItem
                        style={{
                          display: value[0]?.includes('reject user')
                            ? 'flex'
                            : 'none',
                        }}
                        onClick={handleOpenRemarkPrompt(
                          popupState,
                          'Reject User',
                          value[1],
                          'Reject',
                          value[3]
                        )}
                      >
                        {/* <ListItemIcon>
                          <ClearIcon fontSize="small" />
                        </ListItemIcon> */}
                        <Typography textAlign="center">Reject User</Typography>
                      </MenuItem>
                      {/**Mobile App Access */}
                      <MenuItem
                        style={{
                          display: value[0]?.includes('mobile app access')
                            ? 'flex'
                            : 'none',
                        }}
                        onClick={handleMobileAccess(popupState, value[1])}
                      >
                        {/* <ListItemIcon>
                          <DeleteIcon fontSize="small" />
                        </ListItemIcon> */}
                        <Typography textAlign="center">
                          Mobile App Access
                        </Typography>
                      </MenuItem>
                      {/**Delete User */}
                      <MenuItem
                        style={{
                          display: value[0]?.includes('delete user')
                            ? 'flex'
                            : 'none',
                        }}
                        onClick={handleOpenConfirmPromp(
                          popupState,
                          'Delete User',
                          value[1],
                          'DeleteUser',
                          value[2],
                          value[3],
                          'Are you sure, you want to delete this user? Kindly note user will be deleted from all the departments (To remove the user from any department, edit the user and unmap the department)'
                        )}
                      >
                        {/* <ListItemIcon>
                          <DeleteIcon fontSize="small" />
                        </ListItemIcon> */}
                        <Typography textAlign="center">Delete User</Typography>
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
          );
        },
        customHeadLabelRender: ({ index, ...column }) => {
          return <span>{column.label}</span>;
        },
      },
    },
  ];

  const options = {
    elevation: 0,
    responsive: 'standard',
    rowHover: true,
    filter: false,
    print: false,
    page: page - 1,
    search: false,
    viewColumns: false,
    selectableRows: 'none',
    count: _.has(props.userList, 'TotalRecords')
      ? Number(props.userList.TotalRecords)
      : 0,
    rowsPerPage: rowsPerPage,
    serverSide: true,
    rowsPerPageOptions: [10, 15, 20],
    onTableChange: (action, tableState) => {
      if (tableState.activeColumn === 0) {
      }
      switch (action) {
        case 'changePage':
          changePage(tableState.page, tableState.sortOrder);
          break;
        case 'changeRowsPerPage':
          changeRowPerPage(tableState.rowsPerPage);
          break;
        case 'sort':
          changeSorting(
            tableState.sortOrder.name,
            tableState.sortOrder.direction
          );
          break;
        default:
      }
    },
  };

  const changePage = (page) => {
    resettingRef.current = true;
    setPage(page + 1);
  };

  const changeRowPerPage = (rows) => {
    resettingRef.current = true;
    setPage(1);
    setRowsPerPage(rows);
  };

  const changeSorting = (columnName, sortOrder) => {
    setPage(1);
    resettingRef.current = true;
    setSorting(columnName + ' ' + sortOrder);
  };

  return (
    <div>
      <MobileAppAccess />
      <div className={classes.TopBar}>
        <div>
          <Typography variant="h5">Manage Users</Typography>
        </div>
      </div>

      {props.apiStatus === null ? (
        <TableLoaderSkeleton numberOfBones={10} />
      ) : (
        <>
          <Box>
            <div className={classes.TopBarFilterSection}>
              {/* <div id="TopBarCards">
                <Card id="TopBarCardDetails">
                  <CardContent>
                    <Typography id="TopBarCardDetailsText">
                      {" "}
                      Total Records{" "}
                    </Typography>
                    <Typography id="TopBarCardDetailsValue">
                      {options.count}
                    </Typography>
                  </CardContent>
                </Card>
                <Card id="TopBarCardDetails">
                  <CardContent>
                    <Typography id="TopBarCardDetailsText">
                      {" "}
                      Total Amount{" "}
                    </Typography>
                    <Typography id="TopBarCardDetailsValue">
                      {" "}
                      ₹6,39,564.23{" "}
                    </Typography>
                  </CardContent>
                </Card>
              </div> */}
              <div className={classes.TopBarFilterOptions}>
                {chipData.length ? (
                  <div id="TopBarFilterChips">
                    {chipData.map((data) => {
                      if (
                        !_.isEmpty(props.tokenData) &&
                        props.tokenData.UserType === 'Business' &&
                        data.name === 'business_name'
                      ) {
                        return <></>;
                      } else {
                        return (
                          <li key={data.key}>
                            <Chip
                              label={
                                <Typography>
                                  {`${lodash.startCase(data.name)} : `}
                                  <span>{data.label}</span>
                                </Typography>
                              }
                              onDelete={deleteFilterChip(data)}
                              id="TopBarChipDetails"
                              className={classes.TopBarChipDetails}
                            />
                          </li>
                        );
                      }
                    })}
                  </div>
                ) : (
                  <div id="TopBarFilterChips"></div>
                )}
                <div className={classes.TopBarFilter}>
                  <Button
                    variant="outlined"
                    onClick={handleFilterButton}
                    id="filter-button"
                    aria-controls={open ? 'filter-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <img alt="" src={filterIcon} id="filterButtonIcon" />
                    Filter
                  </Button>
                </div>
              </div>
            </div>
            <Popover
              id="filter-menu"
              anchorEl={anchorElForMenu}
              open={openFilter}
              onClose={handleFilterClose}
            >
              <div className={classes.TopBarFilterSectionMenu}>
                <div id="TopBarFilterSectionHeader">
                  <Typography variant="h6" color="rgba(0,0,0,0.87)">
                    Filter
                  </Typography>
                  <IconButton
                    onClick={handleFilterClose}
                    height="24px"
                    width="12px"
                  >
                    <CloseIcon color="primary" />
                  </IconButton>
                </div>
                <div id="TopBarFilterSectionContent">
                  <Grid item container lg={12} md={12} xs={12} spacing={4}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Autocomplete
                        disablePortal
                        disabled={props.tokenData?.UserType === 'Business'}
                        id="business_name"
                        name="business_name"
                        onChange={(event, value) => {
                          updateFilter({
                            ...filter,
                            business_name: !_.isEmpty(value) ? value : '',
                          });
                        }}
                        options={props.businessList}
                        renderInput={(params) => (
                          <TextField {...params} label="Enter Business Name" />
                        )}
                        value={filter.business_name}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          id="RoleID"
                          select
                          value={filter.RoleID}
                          label="Select Role"
                          name="RoleID"
                          variant="outlined"
                          onChange={handleFilter}
                        >
                          {!_.isEmpty(roleDropdown) ? (
                            roleDropdown.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.RoleId}>
                                  {item.RoleName}
                                </MenuItem>
                              );
                            })
                          ) : (
                            <MenuItem disabled>No options</MenuItem>
                          )}
                        </TextField>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          id="DepartmentId"
                          select
                          value={filter.DepartmentId}
                          label="Select Department"
                          name="DepartmentId"
                          variant="outlined"
                          onChange={handleFilter}
                        >
                          {!_.isEmpty(departmentDropdown) ? (
                            departmentDropdown.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.DepartmentId}>
                                  {item.DepartmentName}
                                </MenuItem>
                              );
                            })
                          ) : (
                            <MenuItem disabled>No options</MenuItem>
                          )}
                        </TextField>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          id="Status"
                          select
                          value={filter.Status}
                          label="Select Status"
                          name="Status"
                          variant="outlined"
                          onChange={handleFilter}
                        >
                          {!_.isEmpty(props.statusCodesList) ? (
                            props.statusCodesList.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.StatusCode}>
                                  {item.StatusText}
                                </MenuItem>
                              );
                            })
                          ) : (
                            <MenuItem disabled>No options</MenuItem>
                          )}
                        </TextField>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          label="Email Address"
                          name="Email"
                          id="Email"
                          variant="outlined"
                          value={filter.Email}
                          onChange={handleFilter}
                          inputProps={{
                            autoComplete: 'nope',
                            maxLength: '100',
                          }}
                          onBlur={() => {
                            validator.showMessageFor('Email');
                          }}
                          helperText={validator.message('Email', filter.Email, [
                            'email_validator',
                            { max: 50 },
                          ])}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                      <FilterButtons
                        {...{
                          onApply,
                          handleExportMenuClick,
                          onClear,
                        }}
                      ></FilterButtons>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Popover>
          </Box>

          <div className={classes.NewDataTable}>
            <MUIDataTable
              data={
                !_.isEmpty(props.userList) && !_.isEmpty(props.userList.Data)
                  ? props.userList.Data.map((event, index) => {
                      return {
                        CompanyName: event.BusinessName,
                        ContactName: event.ContactName,
                        EmailAddress: event.Email,
                        Role: event.RoleName,
                        Department: event.DepartmentName,
                        UDRMStatusDescription: event.StatusCode,
                        Actions: [
                          htmlActionExtractor(event.Action),
                          event.MUserId,
                          event.ContactName,
                          decryptAES(event.CompanyId),
                        ],
                      };
                    })
                  : []
              }
              columns={columns}
              options={options}
            />
          </div>
        </>
      )}
    </div>
  );
}

ManageUser.propTypes = {};

const mapStateToProps = (state) => ({
  userList: state.manageBusinessUser.userList,
  apiStatus: _.has(state.manageBusinessUser.userList, 'Status')
    ? state.manageBusinessUser.userList.Status
    : null,
  businessList: state.dataLists.businessList,
  mappedList: state.manageBusinessUser.departmentMappedRoleList,
  tokenData: state.admin.tokenData,
  exportFiles: state.exportFiles,
  statusCodesList: state.dataLists.statusCodesList.BusinessManageUsers,
  refresh: state.datatables.refresh,
});

export default connect(mapStateToProps, {
  getBusinessList,
  getUserList,
  getAllDepartmentMappedRoles,
  manageBusinessUserConfiguration,
  openConfirmPrompt,
  closeConfirmPrompt,
  openRemarkPrompt,
  closeRemarkPrompt,
  exportDataFromFilter,
  flushDataToExport,
  getStatusCodesList,
  resetRefresh,
  openMobileAccessPrompt,
  closeMobileAccessPrompt,
})(ManageUser);
