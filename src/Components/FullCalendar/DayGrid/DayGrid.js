import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import "./DayGrid.css";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { withStyles } from "@material-ui/styles";

import axios from "../../../axios-firebase";
import MUIRichTextEditor from "mui-rte";
import { useDispatch, useSelector } from "react-redux";
import { setEventsStore } from "../../../store/actions/actions";

const styles = {
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
    minWidth: "80vw",
    maxWidth: "80vw",
  },
};

const DayGrid = ({ classes }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dialogDate, setDialogDate] = useState("");
  const [date, setDate] = useState("");
  const [textAreaContent, setTextAreaContent] = useState();

  const events = useSelector((state) => state.events.events);

  const getEvents = () => {
    const updateStore = (data) => {
      console.log(data);
      let events = [];
      for (let prop in data) {
        events.push(data[prop]);
      }
      dispatch(setEventsStore(events));
    };
    axios
      .get("/days.json")
      .then((response) => updateStore(response.data))
      .catch((error) => console.log("Error: " + JSON.stringify(error)));
  };

  useEffect(() => {
    getEvents();
  }, []);

  const parseDate = (dateStr) => {
    return dateStr.split("00:00:00")[0];
  };

  const handleDateClick = (arg) => {
    const date = arg.dateStr;
    const parsedDate = parseDate(arg.date.toString());
    handleClick(date, parsedDate);
  };

  const handleEventClick = (arg) => {
    const date = arg.event.startStr;
    const parsedDate = parseDate(arg.event.start.toString());
    handleClick(date, parsedDate);
  };

  const handleClick = (date, parsedDate) => {
    setDate(date);
    setDialogDate(parsedDate);
    const selectedEvent = events.filter((e) => e.date === date);
    selectedEvent.length > 0
      ? setTextAreaContent(selectedEvent[0].content)
      : setTextAreaContent("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTitle = (data) => {
    let retStr = "";
    const objData = JSON.parse(data);
    for (let i = 0; i < objData.blocks.length; i++) {
      if (retStr < 20) {
        retStr += objData.blocks[i].text;
      } else {
        break;
      }
    }
    return retStr;
  };

  const handleUpdate = (data) => {
    console.log(data);
    let obj = {};
    obj[date] = {
      title: getTitle(data),
      date: date,
      content: data,
    };
    axios
      .patch("/days.json", obj)
      .then(() => getEvents())
      .catch((error) => console.log(error));
    handleClose();
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="form-dialog-title">{dialogDate}</DialogTitle>
        <DialogContent>
          <MUIRichTextEditor
            label="Type something here..."
            defaultValue={textAreaContent}
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
              onClick={handleClose}
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
          <Box>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              endIcon={<CloseIcon />}
            >
              Cancel
            </Button>
          </Box>
          <Box>
            <Button
              onClick={handleUpdate}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(DayGrid);
