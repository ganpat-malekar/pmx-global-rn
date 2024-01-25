import React from "react";
import { connect } from "react-redux";

import { Container, Grid, Typography, CardHeader, Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles } from "@mui/styles";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { getDashboardMultipleAccounts } from "common";

const useStyles = makeStyles((theme) => ({
  Bg: {
    backgroundColor: "#E4F2FF",
    display: "flex",
    width: "100%",
    height: "100vh",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "20px !important",
    color: "#0C386A !important",
    fontWeight: "500 !important",
    marginBottom: "20px",
  },
  LoginCard: {
    maxWidth: "500px",
    padding: "45px 35px",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 4px 0 #797979",
    boxShadow: "0 15px 25px 0 #CEE7FF",
    "& .MuiCardHeader-root": {
      backgroundColor: "#f5f5f5",
      padding: "16px",
      marginBottom: "10px",
      "&:last-of-type": {
        marginBottom: "0px",
      },
      "&:hover": {
        cursor: "pointer",
        outline: "2px solid #47B6E7",
      },
    },
  },
  LandingPageFormMain: {
    padding: "40px 0px 0px 9px",
    [theme.breakpoints.down("sm")]: {
      padding: "40px 20px",
    },
  },
}));

function MultipleBusinessProfile(props) {
  const classes = useStyles();

  const redirectAccount = async (item) => {
    console.log(item);
    const success = await props.getDashboardMultipleAccounts({
      UserId: item.UserId,
      CompanyId: item.CompanyId,
    });
    if (success) {
      if (window.location.host.includes("localhost")) {
        props.history.push("/App/Dashboard");
      } else {
        window.open(
          "https://dev.paymate.in/Beta/PMXUAEREACTJS/DashBoards/BusinessDashBoard",
          "_self"
        );
      }
    }
  };

  return (
    <section className={classes.Bg}>
      <CssBaseline />
      <div className={classes.LoginCard}>
        <Typography className={classes.title} component="h1" variant="h5">
          Choose your business profile.
        </Typography>

        {/* FIXME: change the condition to >1 */}
        {props.multipleAccountsData?.length >= 1 &&
          props.multipleAccountsData.map((item, index) => {
            return (
              <CardHeader
                onClick={() => redirectAccount(item)}
                avatar={
                  <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                    <BusinessCenterOutlinedIcon />
                  </Avatar>
                }
                title={
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, color: "#4f4f4f" }}
                  >
                    {item.CompanyName}
                  </Typography>
                }
                subheader={
                  <Typography variant="caption" sx={{ color: "#4f4f4f" }}>
                    {item.RoleName}
                  </Typography>
                }
              />
            );
          })}

        <Box sx={{ mt: 3 }}>
          <Typography sx={{ fontSize: "12px", color: "#7c7c7c" }}>
            Copyright © 2023. PayMate Payment Services Provider LLC. All rights
            reserved.
          </Typography>
        </Box>
      </div>
    </section>
  );
}

MultipleBusinessProfile.propTypes = {};

const mapStateToProps = (state) => ({
  multipleAccountsData: state.admin.multipleAccountsData.Data,
});

export default connect(mapStateToProps, {
  getDashboardMultipleAccounts,
})(MultipleBusinessProfile);
