import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Stack,
  Skeleton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import _ from 'underscore';

import { closeDesktopDrawer } from '@paymate/common/store/actions';

const useStyles = makeStyles((theme) => ({
  NavList: {
    '& .MuiListItemIcon-root': {
      minWidth: '35px',
      '& i': {
        color: '#2DA3D7',
      },
    },
    background: '#fff',
    '& > .MuiCollapse-root': {
      borderBottom: '1px solid #e0e0e0',
    },
    '& .MuiListItemButton-root': {
      transition: 'all 0.2s ease',
      borderRadius: '0px',
      borderBottom: '1px solid #e0e0e0',
      '&:last-child': {
        borderBottom: '1px solid #fff',
      },
      '&:hover': {
        background: 'rgb(0 0 0 / 5%)',
      },
      '& .MuiListItemText-primary': {
        fontSize: '14px !important',
        color: '#2DA3D7',
        fontWeight: 500,
      },
      '& svg': {
        color: '#2DA3D7',
      },
    },
    '& .Mui-selected': {
      background: '#F1FAFD',
      borderBottom: '1px solid #fff',
      '& .MuiListItemText-primary': {
        color: '#525252 !important',
      },
      '& svg': {
        color: '#17b7e9 !important',
      },
      '&:hover': {
        background: 'rgb(23 183 233 / 10%) !important',
      },
    },
    '& .MuiCollapse-wrapperInner': {
      '& .Mui-selected': {
        background: '#fff',
        borderBottom: '1px solid #fff',
        '& .MuiListItemText-primary': {
          color: '#525252 !important',
        },
        '& svg': {
          color: '#17b7e9 !important',
        },
        '&:hover': {
          background: '#fff !important',
        },
      },
      '& a': {
        '&:last-child': {
          '& .MuiListItemButton-root': {
            borderBottom: '1px solid #e0e0e0 !important',
          },
        },
      },
    },
  },
  SecondParent: {
    '&:hover': {
      backgroundColor: '#fff !important',
      '& .MuiListItemText-primary': {
        color: '#525252 !important',
      },
    },
    '& .MuiListItemText-root': {
      width: '1px',
    },
  },
  ThirdParent: {
    '&:hover': {
      backgroundColor: '#fff !important',
      '& .MuiListItemText-primary': {
        color: '#525252 !important',
      },
    },
    '& .MuiListItemText-root': {
      width: '1px',
    },
  },
}));

function NavList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState([]);
  const [selectedInner, setSelectedInner] = React.useState(null);

  const handleDrawerClose = () => {
    props.closeDesktopDrawer();
  };
  const location = useLocation();

  const handleParentMenu = (MenuId) => () => {
    if (!_.contains(open, MenuId)) {
      var mids = [...open];
      mids.push(MenuId);
      setOpen(mids);
    } else {
      var mids = [...open];
      var new_mids = mids.filter((i) => i !== MenuId);
      setOpen(new_mids);
    }
  };

  const generateSubList = (parentId, mainList) => {
    var arr_list = [];
    mainList
      .filter((e) => e.ParentID === parentId)
      .forEach((item, index) => {
        var count_sub_menu = mainList.filter(
          (e) => e.ParentID === item.MenuId
        ).length;

        if (item.Route === null) {
          arr_list.push(
            <React.Fragment key={index}>
              <ListItemButton
                disableRipple
                onClick={handleParentMenu(item.MenuId)}
                selected={_.contains(open, item.MenuId)}
                className={
                  item.ParentID !== 0 &&
                  props.sideBarMenuItems.filter(
                    (e) => item.ParentID === e.MenuId
                  )[0].ParentID === 0
                    ? classes.SecondParent
                    : classes.Dummy
                }
              >
                {item.MenuIcon ? (
                  <ListItemIcon>
                    <i class="material-icons 2k">{item.MenuIcon}</i>
                  </ListItemIcon>
                ) : (
                  <ListItemIcon></ListItemIcon>
                )}
                <ListItemText
                  primary={item.MenuName === null ? 'Dashboard' : item.MenuName}
                />
                {count_sub_menu > 0 ? (
                  _.contains(open, item.MenuId) ? (
                    <RemoveIcon />
                  ) : (
                    <AddIcon />
                  )
                ) : (
                  ''
                )}
              </ListItemButton>
              {count_sub_menu > 0 && (
                <Collapse
                  in={_.contains(open, item.MenuId)}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {generateSubList(item.MenuId, mainList)}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        } else {
          arr_list.push(
            <React.Fragment key={item.MenuId}>
              <Link onClick={handleDrawerClose} to={item.Route}>
                <ListItemButton
                  selected={location.pathname === item.Route}
                  className={
                    item.MenuName === null
                      ? classes.dummy
                      : props.sideBarMenuItems.filter(
                          (e) => item.ParentID === e.MenuId
                        )[0].ParentID === 0
                      ? classes.SecondParent
                      : classes.ThirdParent
                  }
                  sx={{
                    borderBottom:
                      item.Component === 'Dashboard'
                        ? '1px solid #e0e0e0 !important'
                        : 'none',
                  }}
                >
                  {item.MenuIcon ? (
                    <ListItemIcon>
                      <i class="material-icons 2k">&#xE88A;</i>
                    </ListItemIcon>
                  ) : (
                    <ListItemIcon></ListItemIcon>
                  )}
                  <ListItemText
                    primary={
                      item.MenuName === null ? 'Dashboard' : item.MenuName
                    }
                  />
                  {count_sub_menu > 0 ? (
                    _.contains(open, item.MenuId) ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : (
                    ''
                  )}
                </ListItemButton>
              </Link>
              {count_sub_menu > 0 && (
                <Collapse
                  in={_.contains(open, item.MenuId)}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {generateSubList(item.MenuId, mainList)}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        }
      });

    return arr_list;
  };

  const generateList = () => {
    if (!_.isEmpty(props.sideBarMenuItems)) {
      var sorted = _.sortBy(props.sideBarMenuItems, 'MenuOrder');
      var menuParentID = _.first(sorted).ParentID;

      return generateSubList(menuParentID, sorted);
    }
  };

  return (
    <List className={classes.NavList} disablePadding component="nav">
      {_.isEmpty(props.sideBarMenuItems) ? (
        <Stack direction="column" spacing={1}>
          <Skeleton variant="rectangular" height={40} width={'100%'} />
          <Skeleton variant="rectangular" height={40} width={'100%'} />
          <Skeleton variant="rectangular" height={40} width={'100%'} />
          <Skeleton variant="rectangular" height={40} width={'100%'} />
          <Skeleton variant="rectangular" height={40} width={'100%'} />
          <Skeleton variant="rectangular" height={40} width={'100%'} />
          <Skeleton variant="rectangular" height={40} width={'100%'} />
          <Skeleton variant="rectangular" height={40} width={'100%'} />
          <Skeleton variant="rectangular" height={40} width={'100%'} />
          <Skeleton variant="rectangular" height={40} width={'100%'} />
        </Stack>
      ) : (
        generateList()
      )}
    </List>
  );
}

NavList.propTypes = {};

const mapStateToProps = (state) => ({
  sideBarMenuItems: state.sideMenu.sideBarMenuItems,
});

export default connect(mapStateToProps, { closeDesktopDrawer })(NavList);
