import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
  Stack,
  Skeleton,
} from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { withStyles, styled } from '@mui/material/styles';

import _ from 'underscore';

import { formUseStyles } from '@paymate/common/style';

import { getDashboardQuickLinks } from '@paymate/common/store/actions';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#EDD3D3',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#FE9898' : '#308fe8',
  },
}));

function QuickLinks(props) {
  const classes = formUseStyles();

  useEffect(() => {
    if (props.tokenData.UserType === 'Admin') {
      props.getDashboardQuickLinks();
    }
  }, []);

  return (
    <Box sx={{ height: '100%' }}>
      <div className={classes.QuickLinksDrawer}>
        <Box className="QuickLinks" pr={3} pl={3}>
          <Typography variant="h6">
            Quick Tasks{' '}
            {!_.isEmpty(props.quickLinksData) && (
              <span className="badge">{props.quickLinksData.length}</span>
            )}
          </Typography>
          {!_.isEmpty(props.quickLinksData) && (
            <BorderLinearProgress
              sx={{
                marginTop: '16px',
              }}
              variant="determinate"
              value={props.quickLinksData.length * 5}
            />
          )}
        </Box>

        {!_.isEmpty(props.quickLinksData) && (
          <List>
            {props.quickLinksData.map((link, index) => {
              if (link.route !== '') {
                return (
                  <>
                    <ListItem key={link.text} disablePadding>
                      <ListItemButton component={Link} to={link.route}>
                        <ListItemText
                          className="linkText"
                          primary={link.text}
                        />
                        <ArrowForwardIosRoundedIcon />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </>
                );
              } else {
                return (
                  <>
                    <ListItem disableRipple key={link.text} disablePadding>
                      <ListItemButton component={Link}>
                        <ListItemText
                          className="linkText"
                          primary={link.text}
                        />
                      </ListItemButton>
                    </ListItem>
                    {props.quickLinksData.length > 1 && <Divider />}
                  </>
                );
              }
            })}
          </List>
        )}
        {props.quickLinksData === null && (
          <Stack sx={{ mt: 5 }} spacing={1}>
            <Skeleton variant="rectangular" height={60} />
            <Skeleton variant="rectangular" height={60} />
            <Skeleton variant="rectangular" height={60} />
            <Skeleton variant="rectangular" height={60} />
            <Skeleton variant="rectangular" height={60} />
            <Skeleton variant="rectangular" height={60} />
          </Stack>
        )}
      </div>
    </Box>
  );
}

QuickLinks.propTypes = {};

const mapStateToProps = (state) => ({
  tokenData: state.admin.tokenData,
  quickLinksData: state.dashboard.quickLinksData,
});

export default connect(mapStateToProps, {
  getDashboardQuickLinks,
})(QuickLinks);
