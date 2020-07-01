import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/styles";

import MUIRichTextEditor from "mui-rte";

const useStyles = makeStyles(() => ({
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
    minWidth: "80vw",
    maxWidth: "80vw",
  },
}));

const RichTextEditor = (props) => {
  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle id="form-dialog-title">{props.dialogDate}</DialogTitle>
      <DialogContent>
        <MUIRichTextEditor
          label="Type something here..."
          defaultValue={props.textAreaContent}
          controls={[
            "title",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "highlight",
            "undo",
            "redo",
            "link",
            "media",
            "numberList",
            "bulletList",
            "quote",
            "code",
            "clear",
          ]}
          inlineToolbar={true}
        />
      </DialogContent>
      <DialogActions>
        <Box flexGrow={1}>
          <Button
            onClick={props.handleClose}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
        <Box>
          <Button
            onClick={props.handleClose}
            variant="contained"
            color="primary"
            endIcon={<CloseIcon />}
          >
            Cancel
          </Button>
        </Box>
        <Box>
          <Button
            onClick={props.handleUpdate}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default RichTextEditor;
