import React, { Component, useEffect, useRef, useState } from 'react';
import { isMobile, isBrowser } from 'react-device-detect';
import { connect } from 'react-redux';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
  useParams,
  Link,
} from 'react-router-dom';
import { Freshchat } from 'reactjs-freshchat';
import 'reactjs-freshchat/dist/index.css';
import { PageNotFound } from '@paymate/authentication';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  SwipeableDrawer,
  Toolbar,
  CardHeader,
  Tooltip,
  Typography,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import { styled, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { TaskTimer } from 'tasktimer';
import _ from 'underscore';

import * as Components from './Components';
import NavList from './NavList';

import LOGOWHITE from '@paymate/common/assets/logowhite.png';
import DunomoLOGO from '@paymate/common/assets/dunomologo_white.png';
import CherryRed from '@paymate/common/assets/pt.png';

import {
  //   ModalController,
  //   ViewColumns,
  //   FilePopup,
  ConfirmPrompt,
  RemarkPrompt,
  //   SessionContinuePopup,
  //   ViewSampleFilesPopup,
} from '@paymate/common/components';
import {
  PrivateRoute,
  menuPropsTopCorner,
  encryptAES,
} from '@paymate/common/helpers';
import {
  //getConnectionRequests,
  // getTermsAndPolicies,
  closeDesktopDrawer,
  hideSessionPopUp,
  openDesktopDrawer,
  showSessionPopUp,
  signOut,
  getSideBarMenuItems,
} from '@paymate/common/store/actions';

const timer = new TaskTimer(1000);

const styles = makeStyles((theme) => ({
  NavDropDown: {
    '& .MuiList-padding': {
      padding: 0,
    },
    '& .MuiButtonBase-root': {
      paddingTop: '14px',
      paddingBottom: '14px',
    },
    '& .MuiMenuItem-root': {
      backgroundColor: '#fff',
      '&:hover': {
        backgroundColor: '#eef9ff !important',
      },
    },
    '& .MuiCardHeader-root': {
      '& .MuiCardHeader-title': {
        fontSize: '16px',
        fontWeight: 600,
        color: '#526277',
      },
      '& .MuiCardHeader-subheader': {
        fontSize: '14px',
        color: '#4a4a4a',
      },
    },
  },
  LastLogin: {
    padding: '8px 16px',
    fontSize: '12px !important',
  },
  avatar: {
    width: '40px !important',
    height: '40px !important',
    backgroundColor: '#228BB9 !important',
    fontSize: '17px !important',
    color: '#fff !important',
    margin: '0px !important',
    borderRadius: '50%',
    textTransform: 'uppercase',
  },
  Footer: {
    padding: theme.spacing(3),
    backgroundColor: '#F7F9F9',
    '& h6': {
      color: '#00376E',
      fontSize: '12px',
      marginTop: 10,
    },
    '& button': {
      minWidth: '0px',
      textTransform: 'capitalize',
      fontSize: '14px',
      paddingTop: 0,
      paddingBottom: 0,
      lineHeight: 1.3,
      '&:first-of-type': {
        paddingLeft: 0,
      },
      [theme.breakpoints.down('md')]: { fontSize: '12px' },
    },
    '& hr': {
      borderColor: '#47B6E7',
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  padding: {
    flexGrow: 1,
    position: 'relative',
  },
  main: {
    background: '#fff !important',
    //height: "100%",
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    width: '135px',
    [theme.breakpoints.down('md')]: { width: '110px' },
  },
  Drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      background: '#fff',
      zIndex: '1099',
    },
  },
  CompanyLogo: {
    height: '40px',
    width: '40px',
    marginRight: '10px',
    backgroundImage: `url(${CherryRed})`,
    borderRadius: '10px',
    color: '#fff',
    backgroundSize: 'cover',
    fontWeight: 600,
  },
  MobileRightDrawer: {
    '& .MuiPaper-root': {
      justifyContent: 'space-between',
    },
  },
  MainBox: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  LargeScreenScaleBlock: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '1600px',
      margin: 'auto',
    },
  },
}));

const drawerWidth = 280;

const Main = styled(
  'main',
  {}
)(({ theme, open }) => ({
  padding:
    window.location.pathname.includes('/App/Dashboard') ||
    window.location.pathname.includes('/App/AdminDashboard') ||
    window.location.pathname.includes('/App/BusinessDashboard') ||
    window.location.pathname.includes('/App/Checkout') ||
    window.location.pathname.includes('/App/NewCard')
      ? theme.spacing(0)
      : theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  [theme.breakpoints.down('md')]: {
    padding:
      window.location.pathname.includes('/App/Dashboard') ||
      window.location.pathname.includes('/App/AdminDashboard') ||
      window.location.pathname.includes('/App/BusinessDashboard') ||
      window.location.pathname.includes('/App/Checkout') ||
      window.location.pathname.includes('/App/NewCard')
        ? theme.spacing(0)
        : theme.spacing(3),
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: isBrowser ? `${drawerWidth}px` : '0px',
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'left',
  '& h5': {
    fontWeight: 500,
    color: 'rgb(0 0 0 / 50%)',
  },
}));

function DashboardLayout(props) {
  const theme = useTheme();
  const classes = styles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [initials, setInitials] = React.useState('');
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [values, setValues] = React.useState({
    stateLogoutTimer: '',
  });

  useEffect(() => {
    if (props.userData !== null) {
      timer.removeAllListeners();
      timer.stop();
      var popupTimer = moment(props.userData.TokenExpiresOn)
        .subtract(1, 'minutes')
        .format();

      var logoutTimer = moment(props.userData.TokenExpiresOn);

      setValues({
        ...values,
        stateLogoutTimer: logoutTimer,
      });

      timer.on('tick', () => {
        if (popupTimer === moment().format()) {
          //Time to show the pop-up
          props.showSessionPopUp();
        } else if (moment().isAfter(logoutTimer)) {
          //No action taken so logout the user
          timer.stop();
          props.hideSessionPopUp();
          props.signOut();
        }
      });
      timer.start();
    } else {
      timer.removeAllListeners();
      timer.stop();
    }
  }, [props.userData]);

  // useEffect(() => {
  //   if (!props.userData?.TermsAccepted && props?.tokenData?.UserId) {
  //     props.getTermsAndPolicies(props.tokenData.UserId);
  //   }
  // }, [props.userData, props.tokenData]);

  const handleDrawerOpen = () => {
    if (props.openDrawerDesktop) {
      props.closeDesktopDrawer();
    } else {
      props.openDesktopDrawer();
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (!_.isEmpty(props.tokenData)) {
      props.getSideBarMenuItems({
        CompanyId: encryptAES(props.tokenData.CompanyId),
      });
    }
  }, [props.tokenData]);

  useEffect(() => {
    if (props.basicInfo?.DepartmentName === 'Business - Vendor') {
      props.getConnectionRequests();
    }
  }, [props.basicInfo]);

  const hadRun = useRef(false);
  useEffect(() => {
    if (!hadRun.current) {
      if (props?.basicInfo?.ContactName) {
        hadRun.current = true;
        const fullName = props.basicInfo.ContactName.split(' ');
        const firstName = fullName.shift();
        const lastName = fullName.pop();

        setInitials(
          (firstName?.charAt(0) ?? '-') + (lastName?.charAt(0) ?? '')
        );
      }
    }
  }, [props.basicInfo]);

  return (
    <Box>
      <CssBaseline />
      {/* <Freshchat
        token="2e69cc95-df15-4297-ae02-d7c2a142a176"
        host="https://wchat.freshchat.com"
        tags={['paid']}
        faqTags={{
          tags: ['loggedin'],
          filterType: 'category',
        }}
        config={{
          headerProperty: {
            backgroundColor: '#47B6E7',
          },
        }}
      /> */}

      <ConfirmPrompt />
      <RemarkPrompt />
      {/* <ViewSampleFilesPopup />
      
      <SessionContinuePopup logoutTimer={values.stateLogoutTimer} />
      <FilePopup {...props.filePopupReducer} />

      <ModalController />
      <ViewColumns {...props.viewColumns} /> */}

      <AppBar
        position="fixed"
        open={props.openDrawerDesktop}
        color="primary"
        sx={{ zIndex: 1100 }}
      >
        <Box>
          <Toolbar className={classes.LargeScreenScaleBlock} variant="regular">
            {props.userData.UserId !== '0' && (
              <>
                {' '}
                {props.openDrawerDesktop ? (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      mr: 2,
                      ml: 0,
                      borderRadius: '50%',
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      mr: 2,
                      ml: 0,
                      borderRadius: '50%',
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}{' '}
              </>
            )}

            {props.regionCode === 'aud' ? (
              <img
                className={classes.logo}
                src={DunomoLOGO}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/`)}
              />
            ) : (
              <img
                className={classes.logo}
                src={LOGOWHITE}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/`)}
              />
            )}
            <Typography style={{ flexGrow: 1 }}></Typography>
            {props.userData.UserId !== '0' && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <Hidden mdDown>
                    <Button
                      sx={{
                        color: '#fff',
                        textTransform: 'capitalize',
                        fontSize: '16px',
                      }}
                      disableRipple
                      onClick={handleOpenUserMenu}
                      startIcon={
                        <Avatar className={classes.avatar}>{initials}</Avatar>
                      }
                      endIcon={
                        <ExpandMoreIcon
                          style={{
                            transform: Boolean(anchorElUser)
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                          }}
                        />
                      }
                    >
                      {props.tokenData.UserType === 'Admin'
                        ? 'PayMate'
                        : props.tokenData.CompanyName}
                    </Button>
                  </Hidden>
                </Tooltip>

                <Tooltip title="Open settings">
                  <Hidden mdUp>
                    <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                      <Avatar className={classes.avatar}>{initials}</Avatar>
                    </IconButton>
                  </Hidden>
                </Tooltip>

                <Hidden mdDown>
                  <Menu
                    className={classes.NavDropDown}
                    sx={{
                      mt: '45px',
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    PaperProps={menuPropsTopCorner}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <CardHeader
                      avatar={
                        <Avatar className={classes.avatar}>{initials}</Avatar>
                      }
                      title={props?.basicInfo?.ContactName}
                      subheader={props?.basicInfo?.RoleName}
                    />
                    <Divider />
                    <MenuItem onClick={handleCloseUserMenu}>
                      <ListItemIcon>
                        <AccountCircleOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <Link
                        to="/App/EditProfile"
                        style={{ color: '#000000DE' }}
                      >
                        <Typography textAlign="center">My Profile</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <ListItemIcon>
                        <PasswordOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <Link
                        to="/App/ChangePassword"
                        style={{ color: '#000000DE' }}
                      >
                        <Typography textAlign="center">
                          Change Password
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <ListItemIcon>
                        <SupportAgentOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <a
                        href="https://paymatesupport.freshdesk.com/support/home"
                        target="_blank"
                        style={{ color: '#000000DE' }}
                      >
                        <Typography textAlign="center">Support</Typography>
                      </a>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        props.signOut();
                        handleCloseUserMenu();
                      }}
                    >
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                    <Divider style={{ margin: 0 }} />
                    <Typography className={classes.LastLogin}>
                      Last login: {props?.profileInfo?.lastLogin}
                    </Typography>
                  </Menu>
                </Hidden>

                <Hidden mdUp>
                  <SwipeableDrawer
                    anchor="right"
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    className={classes.MobileRightDrawer}
                  >
                    <Box>
                      <CardHeader
                        avatar={
                          <Avatar className={classes.avatar}>{initials}</Avatar>
                        }
                        title={props?.basicInfo?.ContactName}
                        subheader={props?.basicInfo?.RoleName}
                      />
                      <Divider />
                      <MenuItem onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                          <AccountCircleOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <Link
                          to="/App/EditProfile"
                          style={{ color: '#000000DE' }}
                        >
                          <Typography textAlign="center">My Profile</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                          <PasswordOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <Link
                          to="/App/ChangePassword"
                          style={{ color: '#000000DE' }}
                        >
                          <Typography textAlign="center">
                            Change Password
                          </Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                          <SupportAgentOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <a
                          href="https://paymatesupport.freshdesk.com/support/home"
                          target="_blank"
                          style={{ color: '#000000DE' }}
                        >
                          <Typography textAlign="center">Support</Typography>
                        </a>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          props.signOut();
                          handleCloseUserMenu();
                        }}
                      >
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                      <Divider style={{ margin: 0 }} />
                    </Box>
                    <Typography className={classes.LastLogin}>
                      Last login: {props?.profileInfo?.lastLogin}
                    </Typography>
                  </SwipeableDrawer>
                </Hidden>
              </Box>
            )}
          </Toolbar>
        </Box>
      </AppBar>
      {/* UserId = 0 means, In case of vendor login from checkout email link. If the vendor is registered but not active, then don't show menu items and profile menu on top right corner */}
      {props.userData.UserId !== '0' && (
        <>
          <Hidden mdDown>
            <Drawer
              className={classes.Drawer}
              variant="persistent"
              anchor="left"
              open={props.openDrawerDesktop}
            >
              <DrawerHeader />
              <Divider />
              <NavList />
            </Drawer>
          </Hidden>

          <Hidden mdUp>
            <SwipeableDrawer
              //className={classes.Drawer}
              anchor="left"
              open={props.openDrawerDesktop}
              onClose={handleDrawerOpen}
            >
              <DrawerHeader />
              <Divider />
              <NavList />
            </SwipeableDrawer>
          </Hidden>
        </>
      )}
      <Box className={clsx(classes.MainBox, classes.LargeScreenScaleBlock)}>
        <Main className={classes.main} open={props.openDrawerDesktop}>
          <DrawerHeader />

          <div className={classes.padding}>
            <Routes>
              {/* <Route
                path="Dashboard"
                // element={<PrivateRoute>{Components['Dashboard']}</PrivateRoute>}
                element={
                  <PrivateRoute>
                    <Components.Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="AddUsers"
                element={
                  <PrivateRoute>
                    <Components.AddUsers />
                  </PrivateRoute>
                }
              /> */}
              <Route
                path="EditBusinessUser/:id"
                element={
                  <PrivateRoute key="EditBusinessUser">
                    <Components.AddUsers />
                  </PrivateRoute>
                }
              />
              <Route
                path="EditContact/:id"
                element={
                  <PrivateRoute key="EditContact">
                    <Components.AddContact />
                  </PrivateRoute>
                }
              />
              {/* <Route
                path="ManageUsers"
                element={
                  <PrivateRoute>
                    <Components.ManageUsers />
                  </PrivateRoute>
                }
              />
              <Route
                path="AddContact"
                element={
                  <PrivateRoute>
                    <Components.AddContact />
                  </PrivateRoute>
                }
              />
              <Route
                path="BulkUploadContacts"
                element={
                  <PrivateRoute>
                    <Components.BulkUploadContacts />
                  </PrivateRoute>
                }
              />
              <Route
                path="ManageContacts"
                element={
                  <PrivateRoute>
                    <Components.ManageContacts />
                  </PrivateRoute>
                }
              /> */}
              {!_.isEmpty(props.sideBarMenuItems) && [
                ...props.sideBarMenuItems
                  .filter((e) => e.Route !== null)
                  .map((menuItem, index) => {
                    return (
                      <Route
                        key={index}
                        path={menuItem.Route.split('/')[2]}
                        element={
                          <PrivateRoute>
                            {React.createElement(
                              Components[menuItem.Component]
                            )}
                          </PrivateRoute>
                        }
                      />
                    );
                  }),
                <Route path="*" element={<PageNotFound />} />,
              ]}
              {/* <PrivateRoute
                key="1000"
                path="/App/EditBusiness/:id"
                component={Components['AddBusiness']}
              />
              <PrivateRoute
                key="1004"
                path="/App/EditBusinessUser/:id"
                component={Components['AddUser']}
              />
              <PrivateRoute
                key="1011"
                path="/App/KycVerification/:id"
                component={Components['KycVerification']}
              />
              <PrivateRoute
                key="1001"
                path="/App/ChargesSettingsEdit/:id"
                component={Components['AddBusiness']}
              />
              <PrivateRoute
                key="1003"
                path="/App/EditContact/:id"
                component={Components['AddContact']}
              />
              <PrivateRoute
                key="1007"
                path="/App/EditUser/:id"
                component={Components['AddUsers']}
              /> 
              <PrivateRoute
                key="1012"
                path="/App/KycDocument/UploadDocuments/:id"
                component={Components['ContactKycDocuments']}
              />
              <PrivateRoute
                key="987"
                path="/App/BulkPropertyRegistration"
                component={Components["BulkRegisterProperty"]}
              />
              <PrivateRoute
                key="9883"
                path="/App/EditPropertyRegistration/:PropertyId"
                component={Components["SingleRegisterProperty"]}
              />
              <PrivateRoute
                key="988"
                path="/App/PropertyRegistration"
                component={Components["SingleRegisterProperty"]}
              />
              <PrivateRoute
                key="989"
                path="/App/ManageProperty"
                component={Components["ManageProperty"]}
              />

              <PrivateRoute
                key="997"
                path="/App/BulkTenantRegistration"
                component={Components["BulkRegisterTenant"]}
              />
              <PrivateRoute
                key="9983"
                path="/App/EditTenantRegistration/:TenantId"
                component={Components["SingleRegisterTenant"]}
              />
              <PrivateRoute
                key="998"
                path="/App/TenantRegistration"
                component={Components["SingleRegisterTenant"]}
              />
              <PrivateRoute
                key="999"
                path="/App/ManageTenant"
                component={Components["ManageTenant"]}
              />

              <PrivateRoute
                key="1018"
                path="/App/BulkRentCollection"
                component={Components["BulkRentCollection"]}
              />
              <PrivateRoute
                key="1019"
                path="/App/EditRentCollection/:CldId"
                component={Components["RentCollection"]}
              />
              <PrivateRoute
                key="1020"
                path="/App/RentCollection"
                component={Components["RentCollection"]}
              />
              <PrivateRoute
                key="1021"
                path="/App/TrackRentCollection"
                component={Components["TrackRent"]}
              />

              <PrivateRoute
                key="1022"
                path="/App/TenantRequestsReceived"
                component={Components["TenantRequestsReceived"]}
              />
              <PrivateRoute
                key="1023"
                path="/App/TenantManageProperty"
                component={Components["TenantManageProperty"]}
              />
              <PrivateRoute
                key="1024"
                path="/App/TenantTrackRent"
                component={Components["TenantTrackRent"]}
              />
              <PrivateRoute
                key="1025"
                path="/App/TenantPaymentsReport"
                component={Components["TenantPaymentsReport"]}
              />

              
              <PrivateRoute
                key="1005"
                path="/App/EditChannelPartner/:id"
                component={Components["AddChannelPartner"]}
              />
              <PrivateRoute
                key="1006"
                path="/App/EditIncident/:id"
                component={Components["AddIncident"]}
              />
             
              <PrivateRoute
                key="1008"
                path="/App/DesignWorkflow"
                component={Components["DesignWorkflow"]}
              />
              <PrivateRoute
                key="1009"
                path="/App/EditGIBAN/:id"
                component={Components["AddGIBAN"]}
              />
              <PrivateRoute
                key="1010"
                path="/App/EditSubscription/:id"
                component={Components["AddSubscription"]}
              />
              
              
              <PrivateRoute
                key="1013"
                path="/App/Checkout/"
                component={Components["CheckoutPage"]}
              />
              <PrivateRoute
                key="1014"
                // TODO: Ask if this url format is correct
                path="/App/EditDesignWorkflow/:limitId/:paymentTypeId"
                component={Components["DesignWorkflow"]}
              />
              <PrivateRoute
                key="1015"
                // NOTE: "?" considers the parameter to be optional
                path="/App/TransactionSummary/:OrderId?"
                component={Components["ViewTransactionSummary"]}
              />
              <PrivateRoute
                key="1016"
                path="/App/Payment3DSProcessing"
                component={Components["Payment3DSProcessing"]}
              />
              <PrivateRoute
                key="1017"
                path="/App/Card3DSProcessing"
                component={Components["Card3DSProcessing"]}
              />
              {!_.isEmpty(props.sideBarMenuItems) && [
                ...props.sideBarMenuItems
                  .filter((e) => e.Route !== null)
                  .map((menuItem, index) => {
                    return (
                      <PrivateRoute
                        key={index}
                        path={menuItem.Route}
                        component={Components[menuItem.Component]}
                      />
                    );
                  }),
                <Route path="*">
                  <PageNotFound />
                </Route>,
              ]}
              {props.sideBarMenuItems !== null &&
                _.isEmpty(props.sideBarMenuItems) && (
                  <Route path="*">
                    <PageNotFound />
                  </Route>
                )} */}
            </Routes>
          </div>
        </Main>
        <div
          style={{
            marginLeft:
              isBrowser && props.openDrawerDesktop ? `${drawerWidth}px` : 0,
          }}
          className={classes.Footer}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Button
                disableFocusRipple
                disableRipple
                size="small"
                onClick={() =>
                  window.open('https://paymate.in/terms.html', '_blank')
                }
              >
                Term of Use
              </Button>
              <Button
                disableFocusRipple
                disableRipple
                size="small"
                onClick={() =>
                  window.open('https://paymate.in/privacy.html', '_blank')
                }
              >
                Privacy Policy
              </Button>
              <Button
                disableFocusRipple
                disableRipple
                size="small"
                onClick={() =>
                  window.open(
                    'https://paymatesupport.freshdesk.com/support/home',
                    '_blank'
                  )
                }
              >
                Help
              </Button>
              <Button
                disableFocusRipple
                disableRipple
                size="small"
                // onClick={() =>
                //   (window.location.href =
                //     "https://paymatesupport.freshdesk.com/support/home")
                // }
              >
                {/* TODO: Rahul will let us know */}
                Charges
              </Button>
              <Hidden only={'xs'}>
                <Button
                  disableFocusRipple
                  disableRipple
                  size="small"
                  onClick={() =>
                    window.open('mailto:support@paymate.co.in?subject=&body=')
                  }
                >
                  Contact Us
                </Button>
              </Hidden>
            </Stack>
            <Hidden smUp>
              <Button
                disableFocusRipple
                disableRipple
                size="small"
                onClick={() =>
                  window.open('mailto:support@paymate.co.in?subject=&body=')
                }
              >
                Contact Us
              </Button>
            </Hidden>
            {props.regionCode === 'aud' ? (
              <Typography variant="subtitle2">
                Copyright © {new Date().getFullYear()} -{' '}
                {new Date().getFullYear() + 1} DuNoMo Pty Ltd. All rights
                reserved. No Express or Implied Permission is hereby granted,
                free of charge, to any person obtaining a copy of this software
                and associated documentation files (the "Software"), to deal in
                the Software, including without limitation the rights to use,
                copy, modify, merge, publish, distribute, sublicense, and/or
                sell copies of the Software.
              </Typography>
            ) : props.regionCode === 'myr' ? (
              <Typography variant="subtitle2">
                Copyright © {new Date().getFullYear()} -{' '}
                {new Date().getFullYear() + 1} PAYMATE PAYMENT SERVICES SDN.
                BHD. All rights reserved. No Express or Implied Permission is
                hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the
                "Software"), to deal in the Software, including without
                limitation the rights to use, copy, modify, merge, publish,
                distribute, sublicense, and/or sell copies of the Software.
              </Typography>
            ) : props.regionCode === 'sgd' ? (
              <Typography variant="subtitle2">
                Copyright © {new Date().getFullYear()} -{' '}
                {new Date().getFullYear() + 1} PayMate Pte Ltd. All rights
                reserved. No Express or Implied Permission is hereby granted,
                free of charge, to any person obtaining a copy of this software
                and associated documentation files (the "Software"), to deal in
                the Software, including without limitation the rights to use,
                copy, modify, merge, publish, distribute, sublicense, and/or
                sell copies of the Software.
              </Typography>
            ) : (
              <Typography variant="subtitle2">
                Copyright © {new Date().getFullYear()} PayMate Payment Services
                Provider LLC. All rights reserved.
              </Typography>
            )}
          </Box>
        </div>
      </Box>
    </Box>
  );
}

DashboardLayout.propTypes = {
  getSideBarMenuItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.admin.user,
  basicInfo: state.admin.basicInfo,
  profileInfo: state.admin.profileMenuData?.Data,
  sideBarMenuItems: state.sideMenu.sideBarMenuItems,
  openDrawerDesktop: state.ui.openDrawerDesktop,
  filePopupReducer: state.filePopupReducer,
  viewColumns: state.viewColumns,
  //OrderId: state.transactionSummary.OrderId,
  tokenData: state.admin.tokenData,
  regionCode: state.admin.regionCode,
});

export default connect(mapStateToProps, {
  signOut,
  getSideBarMenuItems,
  showSessionPopUp,
  hideSessionPopUp,
  openDesktopDrawer,
  closeDesktopDrawer,
  //getConnectionRequests,
  // getTermsAndPolicies,
})(DashboardLayout);
