import { useEffect, useRef, useState } from "react";
import { triggerBase64Download } from "react-base64-downloader";
import { connect } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import {
  AppBar,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { saveAs } from "file-saver";
import _ from "underscore";

import { useStyles } from "../../Theme";

import {
  handleFileModal,
  closeFileModal,
} from "../../store/actions/Common/filePopupActions";

const PDF = "application/pdf";

function FilePopup({
  isOpen,
  isDownloadable,
  content,
  fileType,
  fileName,
  shouldReset,
  ...props
}) {
  const classes = useStyles();
  const [pdfURL, setPdfURL] = useState("");
  const pdflink = useRef();
  useEffect(() => {
    if (fileType === PDF) {
      getDataURL(content, fileType);
    }
  }, [content]);

  useEffect(() => {
    if (fileType === PDF && pdfURL && isOpen) {
      window.open(pdfURL, "_blank");
      handleClose();
    }
  }, [fileType, pdfURL, isOpen]);

  const b64toBlob = (base64, type = "application/octet-stream") =>
    fetch(`data:${type};base64,${base64}`).then((res) => res.blob());

  const getDataURL = async (data, type) => {
    const blob = await b64toBlob(data, type);
    const url = URL.createObjectURL(blob);
    setPdfURL(url);
  };

  const triggerFileDownload = () => {
    if (fileType === PDF) {
      saveAs(pdfURL, "attachment.pdf");
    } else {
      const fileData = `data:${fileType};base64,${content}`;
      triggerBase64Download(fileData, "attachment");
    }
  };

  const handleClose = () => {
    if (shouldReset) {
      props.closeFileModal();
    } else {
      props.handleFileModal({
        isOpen: false,
      });
    }
  };

  return (
    <Dialog
      fullScreen
      PaperProps={{ square: true }}
      open={isOpen}
      onClose={handleClose}
      className={classes.FileViewDialog}
      scroll="body"
    >
      {isOpen && (
        <Box sx={{ height: "100%" }}>
          <AppBar sx={{ position: "fixed" }}>
            <Toolbar>
              <Tooltip title="Close">
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {fileName}
              </Typography>
              <Tooltip title="Download">
                <IconButton
                  onClick={triggerFileDownload}
                  sx={{ mr: 1, color: "#fff" }}
                  size="small"
                  aria-label="add"
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>

          {fileType && (
            <DialogContent sx={{ padding: "15px" }}>
              <Box sx={{ width: "1100px" }}>
                {fileType !== PDF && (
                  <img src={`data:${fileType};base64,${content}`} />
                )}
              </Box>
            </DialogContent>
          )}
          {fileType}
        </Box>
      )}
    </Dialog>
  );
}

FilePopup.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { handleFileModal, closeFileModal })(
  FilePopup
);
