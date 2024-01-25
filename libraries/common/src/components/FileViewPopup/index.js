import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableContainer,
  TableCell,
  Typography,
  Stack,
  TableBody,
  Table,
  TableRow,
  Skeleton,
  TableHead,
  IconButton,
  Collapse,
  Box,
  Tooltip,
} from "@mui/material";

import { TableHeadCell } from "mui-datatables";

import _ from "underscore";

import { formUseStyles } from "../../Theme";

import { closeFileViewer } from "../../store/actions/BusinessManagement/ManageBusinesses/KYC/action_CommonKYC";

function FileViewPopup(props) {
  const classes = formUseStyles();
  const [fileData, setFileData] = React.useState({
    base64: "",
    fileType: "",
    meta: "",
    documentType: "",
  });

  const handleClose = () => {
    props.closeFileViewer();
  };

  useEffect(() => {
    if (
      _.has(props.KYCDocumentFile, "Status") &&
      props.KYCDocumentFile.Status
    ) {
      var fileType =
        props.KYCDocumentFile.Data.DocumentContentType.split(".")[1];

      setFileData({
        ...fileData,
        base64: props.KYCDocumentFile.Data.DocumentContent,
        fileType: fileType,
        meta:
          fileType === "png"
            ? "data:image/png;base64,"
            : fileType === "jpeg"
            ? "data:image/jpeg;base64,"
            : fileType === "jpg"
            ? "data:image/jpg;base64,"
            : fileType === "pdf"
            ? "data:application/pdf;base64,"
            : "",
        documentType:
          fileType === "png"
            ? "Image"
            : fileType === "jpeg"
            ? "Image"
            : fileType === "jpg"
            ? "Image"
            : fileType === "pdf"
            ? "Pdf"
            : "",
      });
    }

    //data:image/jpeg;base64,
    //data:image/png;base64,
    //data:application/pdf;base64,
  }, [props.KYCDocumentFile]);

  return (
    <React.Fragment>
      <Dialog
        scroll="body"
        fullWidth={true}
        open={props.showFileViewerPopup ?? false}
        onClose={handleClose}
        className={classes.ViewImageDialog}
      >
        {!_.has(props.KYCDocumentFile, "Status") && (
          <div>
            <div align="right">
              <Skeleton
                animation="wave"
                variant="text"
                width={40}
                height={50}
              />
            </div>
            <div>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={400}
                height={300}
              />
            </div>
          </div>
        )}

        {_.has(props.KYCDocumentFile, "Status") &&
          props.KYCDocumentFile.Status && (
            <>
              <div>
                <IconButton
                  size="small"
                  onClick={handleClose}
                  aria-label="delete"
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
                {fileData.documentType === "Image" && (
                  <img src={fileData.meta + "" + fileData.base64} />
                )}
              </div>
            </>
          )}
      </Dialog>
    </React.Fragment>
  );
}

FileViewPopup.propTypes = {};

const mapStateToProps = (state) => ({
  showFileViewerPopup: state.businessKYC.showFileViewerPopup,
  KYCDocumentFile: state.businessKYC.KYCDocumentFile,
});

export default connect(mapStateToProps, {
  closeFileViewer,
})(FileViewPopup);
