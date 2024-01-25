import React from "react";
import { makeStyles } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ChevronRight";
import LOGO from "@images/logo.png";
import { closeMobileDrawer } from "@store/actions/UIActions";
import { connect } from "react-redux";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles((theme) => ({
  NavList: {
    maxWidth: 360,
    width: 280,
    "& a": {
      "& .MuiTypography-root": {
        fontSize: "14px",
        color: "#4A4A4A",
        lineHeight: "20px",
        letterSpacing: 0,
        fontWeight: 600,
      },
    },
    "& .MuiListItem-button": {
      "&:hover": {
        background: "#f5f5f5 !important",
      },
    },
    "& svg": {
      color: "#4A4A4A",
    },
    "& .Mui-selected": {
      borderLeft: "4px solid #075065 !important",
      background: "#f5f5f5",
    },
  },
  nested: {
    paddingLeft: theme.spacing(2),
    background: "#f5f5f5",
  },
  LogoHeader: {
    "& div": {
      display: "flex",
      alignItems: "flex-end",
      "& p": {
        fontSize: "20px",
        color: "#1a1a1a",
        fontWeight: "600",
        marginLeft: "10px",
        lineHeight: "33px",
      },
    },
  },
  avatar: {
    width: "36px",
    height: "36px",
    backgroundColor: "#1a1f71",
    fontSize: "17px",
  },
  DoubleBorder: {
    borderTop: "1px solid #cacaca",
    borderBottom: "1px solid #cacaca",
  },
  SingleBorder: {
    borderTop: "1px solid #cacaca",
  },
  SingleBorderCollapse: {
    borderBottom: "1px solid #cacaca",
  },
  ProfileDropDown: {
    "& .MuiButtonBase-root": {
      marginTop: "14%",
    },
  },
}));

function MobileNavList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState("");

  const handleClick = (menu) => () => {
    setOpen(menu);
  };

  const SignOut = () => {
    props.signOut();
  };

  const location = useLocation();

  return (
    <List component="nav" className={classes.NavList}>
      <ListItem className={classes.LogoHeader}>
        <ListItemText primary={<img src={LOGO} />} secondary="BaaS Platform" />
      </ListItem>
      <Link onClick={() => props.closeMobileDrawer()} to="/App/Dashboard">
        <ListItem
          selected={location.pathname === "/App/Dashboard" ? true : false}
          button
        >
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>

      <Link onClick={() => props.closeMobileDrawer()} to="/App/BPSP-list">
        <ListItem
          selected={
            location.pathname === "/App/BPSP-list" ||
            location.pathname === "/App/BPSP-add" ||
            location.pathname === "/App/BPSP-edit" ||
            location.pathname === "/App/BPSP-confirm" ||
            location.pathname === "/App/BPSP-details"
              ? true
              : false
          }
          button
        >
          <ListItemText primary="BPSP" />
        </ListItem>
      </Link>

      <Link onClick={() => props.closeMobileDrawer()} to="/App/Buyer-list">
        <ListItem
          selected={location.pathname === "/App/Buyer-list" ? true : false}
          button
        >
          <ListItemText primary="Buyer" />
        </ListItem>
      </Link>

      <Link onClick={() => props.closeMobileDrawer()} to="/App/Supplier-list">
        <ListItem
          selected={location.pathname === "/App/Supplier-list" ? true : false}
          button
        >
          <ListItemText primary="Supplier" />
        </ListItem>
      </Link>

      <Link onClick={() => props.closeMobileDrawer()} to="/App/Payment-list">
        <ListItem
          selected={location.pathname === "/App/Payment-list" ? true : false}
          button
        >
          <ListItemText primary="Payments" />
        </ListItem>
      </Link>

      <Link aria-controls="simple-menu" aria-haspopup="true">
        <ListItem
          onClick={handleClick(open === "Reports" ? "" : "Reports")}
          selected={
            location.pathname === "/App/Report-list" ||
            location.pathname === "/App/Create-report" ||
            location.pathname === "/App/Report-manage"
              ? true
              : false
          }
          button
        >
          <ListItemText primary="Reports" />
          {open === "Reports" ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Link>
      <Collapse in={open === "Reports"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link
            onClick={() => props.closeMobileDrawer()}
            to="/App/Create-report"
          >
            <ListItem className={classes.nested} button>
              <ListItemText primary="Create Report" />
            </ListItem>
          </Link>
          <Link
            onClick={() => props.closeMobileDrawer()}
            to="/App/Report-manage"
          >
            <ListItem className={classes.nested} button>
              <ListItemText primary="Manage Reports" />
            </ListItem>
          </Link>

          <Link onClick={() => props.closeMobileDrawer()} to="/App/Report-list">
            <ListItem className={classes.nested} button>
              <ListItemText primary="Reports" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <Link aria-controls="simple-menu" aria-haspopup="true">
        <ListItem
          onClick={handleClick(
            open === "Configurations" ? "" : "Configurations"
          )}
          selected={
            location.pathname === "/App/Issuer-List" ||
            location.pathname === "/App/TermsOfService-List" ||
            location.pathname === "/App/Webhooks-List" ||
            location.pathname === "/App/Webhooks-add" ||
            location.pathname === "/App/Webhooks-edit" ||
            location.pathname === "/App/Webhooks-details"
              ? true
              : false
          }
          button
        >
          <ListItemText primary="Configurations" />
          {open === "Configurations" ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Link>
      <Collapse in={open === "Configurations"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link onClick={() => props.closeMobileDrawer()} to="/App/Issuer-List">
            <ListItem className={classes.nested} button>
              <ListItemText primary="Issuer" />
            </ListItem>
          </Link>

          {/* <Link to="/App/TermsOfService-List">
            <ListItem
              className={classes.nested}
              selected={
                location.pathname === "/App/TermsOfService-List" ? true : false
              }
              button
            >
              <ListItemText primary="Terms of Service" />
            </ListItem>
          </Link> */}

          <Link
            onClick={() => props.closeMobileDrawer()}
            to="/App/Webhooks-List"
          >
            <ListItem className={classes.nested} button>
              <ListItemText primary="Webhooks" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      {/* For Profile */}
      <Link
        className={classes.ProfileDropDown}
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        <ListItem
          className={
            open === "UserProfile" ? classes.SingleBorder : classes.DoubleBorder
          }
          onClick={handleClick(open === "UserProfile" ? "" : "UserProfile")}
          selected={location.pathname === "/App/MyProfile" ? true : false}
          button
        >
          <ListItemAvatar>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.userData ? props.userData.FirstName.charAt(0) : ""}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              props.userData
                ? props.userData.FirstName + " " + props.userData.LastName
                : ""
            }
          />
          {open === "UserProfile" ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Link>
      <Collapse
        className={classes.SingleBorderCollapse}
        in={open === "UserProfile"}
        timeout="auto"
        unmountOnExit
      >
        <List
          onClick={() => props.closeMobileDrawer()}
          component="div"
          disablePadding
        >
          <Link to="/App/MyProfile">
            <ListItem className={classes.nested} button>
              <ListItemText primary="My Profile" />
            </ListItem>
          </Link>
          <Link onClick={SignOut}>
            <ListItem className={classes.nested} button>
              <ListItemText primary="Logout" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}

MobileNavList.propTypes = {};

const mapStateToProps = (state) => ({
  userData: state.admin.user,
});

export default connect(mapStateToProps, {
  closeMobileDrawer,
})(MobileNavList);
