import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TodayIcon from "@material-ui/icons/Today";
import { makeStyles, Typography } from "@material-ui/core";
import { Link, withRouter, Redirect, Switch, BrowserRouter as Route } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import getColorValue from "../outputs/ColorValues";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteEvent, clearRedirectPath } from "../../store/actions/auth";
import FilterListIcon from "@material-ui/icons/FilterList";
import EventFilterform from "./EventFilterForm";
import EditIcon from '@material-ui/icons/Edit';
import EventForm from './EventForm'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const EventList = (props) => {
  // Redux
  const { auth } = props;

  // React
  const initialFilter = {
    byMembersAttending: [],
    familyMembers: [],
    noSingleDay: true,
    byMultipleDays: "all-events",
    bySingleDay: new Date()
  };

  const initialState = {
    events: [],
    eventsFiltered: [],
    alert: false,
    eventSelected: {},
    alertFilter: false,
    filter: initialFilter
  };
  const [state, setState] = useState(initialState);

  const resetFilter = {
    byMembersAttending: [],
    familyMembers: [...state.filter.familyMembers],
    noSingleDay: true,
    byMultipleDays: "all-events",
    bySingleDay: new Date()
  }

  const handleClickOpen = (e, eventItem, action) => {
    e.preventDefault();
    const eventSelected = auth.family.events.find(
      (familyEvent) =>
        familyEvent.title === eventItem.title &&
        familyEvent.date === eventItem.date &&
        familyEvent.time === eventItem.time
    );
    setState({
      ...state,
      alert: true,
      eventSelected,
      action
    });
  };
  const handleClickOpenFilter = (e) => {
    e.preventDefault();
    setState({
      ...state,
      alertFilter: true
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      alert: false
    });
  };

  const handleCloseFilter = () => {
    setState({
      ...state,
      alertFilter: false,
      filter: resetFilter
    });
  };

  const isWithingNext7Days = (date) => {
    const today = new Date();
    const nextWeek = Date.parse(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
    );

    if (nextWeek < Date.parse(date)) {
      return false;
    } else {
      return true;
    }
  };

  const isWithingNextMonth = (date) => {
    const today = new Date();
    const thisYear = today.getFullYear()
    const nextMonth = today.getMonth() + 1
    const dateObject = new Date(date)
    if (nextMonth < dateObject.getMonth() + 1 && thisYear === dateObject.getFullYear()) {
      return true;
    } else {
      return false;
    }
  };

  const handleFilter = () => {
    let eventsFiltered = state.events;

    if (state.filter.noSingleDay === false) {
      eventsFiltered = eventsFiltered.filter(
        (familyEvent) =>
          familyEvent.rawDate.toString().substring(0, 15) ===
          state.filter.bySingleDay.toString().substring(0, 15) &&
          familyEvent.rawDate.toString().substring(0, 15)
      );
    } else if (state.filter.noSingleDay) {
      switch (state.filter.byMultipleDays) {
        case "next-7-days":
          eventsFiltered = eventsFiltered.filter(
            (familyEvent) =>
              isWithingNext7Days(familyEvent.rawDate) === true && familyEvent
          );
          break;
        case "next-month":
          eventsFiltered = eventsFiltered.filter(
            (familyEvent) =>
              isWithingNextMonth(familyEvent.rawDate) === true && familyEvent
          );
          break;
        case "all-events":
          break;
        default:
          break;
      }
    }
    if (state.filter.byMembersAttending.length > 0) {
      let byMembersAttendingEmails = []
      state.filter.byMembersAttending.map(member =>
        byMembersAttendingEmails = [...byMembersAttendingEmails, member.email]
      )



      let eventsFilteredWithMembersAttendingEmails = JSON.parse(JSON.stringify(state.events))
      eventsFilteredWithMembersAttendingEmails.map(familyEvent => familyEvent.membersAttending.map(member => familyEvent.membersAttending[familyEvent.membersAttending.indexOf(member)] = member.email))

      const newFilterByEmail = eventsFilteredWithMembersAttendingEmails.filter(familyEvent => {
        const stringifiedMembersAttending = JSON.stringify(familyEvent.membersAttending.sort())
        const stringifiedByMembersAttending = JSON.stringify(byMembersAttendingEmails.sort())

        return stringifiedMembersAttending === stringifiedByMembersAttending
      })

      let eventsFilteredByMembersAttending = []
      eventsFiltered = newFilterByEmail.filter(filteredEvent => {
        let matchesFound = []
        matchesFound = eventsFiltered.find(familyEvent =>
          familyEvent.title === filteredEvent.title)
        if (matchesFound !== undefined) {
          eventsFilteredByMembersAttending = [...eventsFilteredByMembersAttending, matchesFound]
        }
      })

      setState({
        ...state,
        alertFilter: false,
        filter: resetFilter,
        eventsFiltered: eventsFilteredByMembersAttending
      });
    } else {
      setState({
        ...state,
        alertFilter: false,
        filter: resetFilter,
        eventsFiltered
      })
    }
  };

  const handleDelete = () => {
    setState({
      ...state,
      alert: false
    });
    props.deleteEvent(state.eventSelected, auth.family.password);
  };

  const handleEdit = () => {
    setState({
      ...state,
      alert: false
    })
    props.history.push({
      pathname: '/edit-event',
      state: {
        eventSelected: state.eventSelected,
      }
    })
  }

  const getAction = (action) => {
    switch (action) {
      case "delete":
        return handleDelete()
      case "edit":
        return handleEdit()
      default:
        return handleEdit()
    }
  }

  useEffect(() => {
    state &&
      auth.family &&
      setState((prevState) => ({
        ...prevState,
        events: auth.family.events,
        eventsFiltered: auth.family.events,
        filter: {
          ...prevState.filter,
          familyMembers: auth.family.members
        }
      }));
    props.clearRedirectPath()
  }, [auth.family && auth.family, clearRedirectPath]);

  // Material UI
  const useStyles = makeStyles((theme) => ({
    message: {
      marginTop: theme.spacing(3)
    },
    icon: {
      backgroundColor: "lightgrey",
      padding: "10px",
      borderRadius: "50px",
      border: "2px solid #3F51B5",
      marginBottom: theme.spacing(1)
    },
    typography: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(4)
    },
    customTextField: {
      marginTop: theme.spacing(0)
    },
    dateTimeWrapper: {
      marginTop: theme.spacing(4)
    },
    radioGroup: {
      display: "flex",
      justifyContent: "left"
    },
    head: {
      backgroundColor: "lightgrey"
    },
    table: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(9),
      border: "1px solid lightgrey"
    },
    addCircleIcon: {
      fontSize: "4.5rem",
      position: "fixed",
      bottom: "1rem",
      right: "1rem"
    },
    MuiIconButton: {
      padding: 0
    },
    tooltip: {
      margin: 0
    },
    time: { color: "grey" },
    delete: {
      display: "inline",
      color: "#f44336",
      paddingLeft: theme.spacing(1),
      cursor: "pointer"
    },
    edit: {
      display: "inline",
      color: "#ffc400",
      paddingLeft: theme.spacing(1)
    },
    eventWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "end"
    },
    textWrapper: {
      diisplay: "flex",
      flexDirection: "column"
    },
    filterIcon: {
      position: "fixed",
      bottom: "5px",
      left: "8px",
      zIndex: 2
    },
    addIcon: {
      position: "fixed",
      bottom: "35px",
      right: "37px",
      zIndex: 2
    },
    whiteBackground: {
      background: "white",
      width: "2rem",
      height: "2rem"
    },
    actions: {
      display: "flex",
    },
    tableBody: {
      background: "white",
    },
    add: {
      display: "inline",
      color: "#00ca00",
      paddingLeft: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>{auth.redirectPath === '/calendar/add-event' ?
      <Switch>
        <Redirect exact from="/calendar/events" to="/calendar/add-event" />
        <Route exact path="/calendar/add-event" component={EventForm} />
      </Switch>
      :
      <>
        <TodayIcon className={classes.icon} />
        <Typography variant="h5">Events</Typography>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table" className={classes.table}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell
                  align="right"
                  className={classes.head}
                  style={{
                    width: "10%",
                    verticalAlign: "baseline"
                  }}
                >
                  Date
              </TableCell>
                <TableCell className={classes.head}>Event</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {state &&
                state.eventsFiltered.map((event) => (
                  <TableRow
                    key={event.title + state.eventsFiltered.indexOf(event)}
                  >
                    <TableCell
                      align="right"
                      component="th"
                      scope="row"
                      style={{
                        width: "10%",
                        verticalAlign: "baseline"
                      }}
                    >
                      <div>{event.date}</div>
                      <div className={classes.time}>{event.time}</div>
                    </TableCell>
                    <TableCell>
                      <div className={classes.eventWrapper}>
                        <div className={classes.textWrapper}>
                          <div>
                            {" "}
                            {event.title}{" "}
                            {event.location && `[${event.location}]`}
                          </div>
                          <div>
                            {event.membersAttending.map((member) => (
                              <Tooltip
                                arrow
                                title={member.name}
                                key={member.email}
                                className={classes.tooltip}
                              >
                                <IconButton className={classes.MuiIconButton}>
                                  <FiberManualRecordIcon
                                    key={member.name}
                                    style={{
                                      color: getColorValue(member.color),
                                      verticalAlign: "middle"
                                    }}
                                  />
                                </IconButton>
                              </Tooltip>
                            ))}
                          </div>
                        </div>
                        <div className={classes.actions}>
                          <Link to="/calendar/add-event">
                            <div
                              id="add"
                              className={classes.add}
                            >
                              <AddIcon />
                            </div>
                          </Link>
                          <Link to='/calendar/events'>
                            <div
                              id="edit"
                              className={classes.edit}
                              onClick={(e) => handleClickOpen(e, event, "edit")}
                            >
                              <EditIcon />
                            </div>
                          </Link>
                          <div
                            id="delete"
                            className={classes.delete}
                            onClick={(e) => handleClickOpen(e, event, "delete")}
                          >
                            <DeleteIcon />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={state.alert}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {state.action === "delete" && "Delete this event?"}
            {state.action === "edit" && "Edit event?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {state.action === "delete" && `By pressing the delete button, event '${state.eventSelected.title}' will be permanently deleted from your list.`}
              {state.action === "edit" && `Do you want to edit event '${state.eventSelected.title}'?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Back
          </Button>
            <Button onClick={() => getAction(state.action)}
              color="primary" autoFocus>
              {state.action === "delete" && "Delete"}
              {state.action === "edit" && "Edit"}
            </Button>
          </DialogActions>
        </Dialog>
        {!matches &&
          <div className={classes.filterIcon} onClick={handleClickOpenFilter}>
            <FiberManualRecordIcon
              color="secondary"
              style={{ padding: 0, fontSize: "5.5rem" }}
            />
            <FilterListIcon
              style={{
                padding: 0,
                fontSize: "3rem",
                position: "absolute",
                left: "20px",
                bottom: "22px",
                color: "white"
              }}
            />
          </div>}

        <Dialog open={state.alertFilter} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">{"Filter"}</DialogTitle>
          <DialogContent>
            <EventFilterform state={state} setState={setState} />
            <DialogActions>
              <Button onClick={handleCloseFilter} color="primary">
                Back
            </Button>
              <Button onClick={handleFilter} color="primary">
                Filter
            </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        {!matches ? <Link to="/calendar/add-event">
          <div className={classes.addIcon}>
            <div className={classes.whiteBackground}></div>
            <AddCircleIcon className={classes.addCircleIcon} color="secondary" />
          </div>
        </Link> :
          <div className={classes.addIcon} onClick={handleClickOpenFilter}>
            <FiberManualRecordIcon
              color="secondary"
              style={{ padding: 0, fontSize: "5.5rem" }}
            />
            <FilterListIcon
              style={{
                padding: 0,
                fontSize: "3rem",
                position: "absolute",
                left: "20px",
                bottom: "22px",
                color: "white"
              }}
            />
          </div>}
      </>
    }

    </>
  );
};

// Redux
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEvent: (eventToDelete, familyPassword) =>
      dispatch(deleteEvent(eventToDelete, familyPassword)),
    clearRedirectPath: () => dispatch(clearRedirectPath())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventList)
);
