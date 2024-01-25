import { useEffect, useState } from "react";
import { isBrowser } from "react-device-detect";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import _ from "underscore";

import { useStyles } from "../../Theme";

import { closeViewColumnModal } from "../../store/actions/Common/Modal/ViewColumnAction";

function ViewColumns({
  title,
  columnNames,
  MUIColumnObjectArray,
  columnData,
  isModalOpen,
  ...props
}) {
  const classes = useStyles();
  const location = useLocation();
  const [data, setData] = useState([]);

  // Extracting column's customBodyRender and giving it cell's value
  useEffect(() => {
    if (!_.isEmpty(columnData)) {
      const newData = columnNames.map((name) => {
        const obj = MUIColumnObjectArray.find((item) => item.name === name);

        const cell = obj.options.customBodyRender(columnData[name]);

        return cell;
      });
      setData(newData);
    }
  }, [columnData.length]);

  // Need to close this modal if KYC verification link is clicked which redirects to verification page.
  // I couldn't think of a better way.
  useEffect(() => {
    handleClose();
  }, [location.pathname]);

  const handleClose = () => {
    props.closeViewColumnModal();
  };

  return (
    <div>
      <Dialog
        // PaperProps={{ square: true }}
        className={classes.ViewPageDialog}
        open={isModalOpen ?? false}
        onClose={handleClose}
        fullWidth={true}
        fullScreen={!isBrowser}
        maxWidth="lg"
      >
        <DialogTitle className={classes.ViewDialogTitle}>
          <Typography variant="h6">
            {title === "" ? "All columns" : title}
          </Typography>
          <IconButton
            size="small"
            style={{ border: "1px solid #d5d5d5" }}
            onClick={handleClose}
            aria-label="delete"
            variant="outlined"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* <Table>
                <TableHead>
                  <TableRow>
                    {columnNames?.map((item, index) => {
                      return <TableCell>{item}</TableCell>;
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {data.map((item, index) => {
                      return <TableCell>{item}</TableCell>;
                    })}
                  </TableRow>
                </TableBody>
              </Table> */}

          <TableContainer className={classes.DetailTableContainer}>
            <Table
              className={classes.NormalTable}
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableBody>
                {columnNames?.map((item, index) => {
                  return (
                    <TableRow>
                      <TableCell width="20%" align="left">
                        {item}
                      </TableCell>
                      <TableCell
                        width="25%"
                        align="left"
                        style={{ fontWeight: 400 }}
                      >
                        {data[index]}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ViewColumns.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { closeViewColumnModal })(ViewColumns);
