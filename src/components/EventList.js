import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TodayIcon from '@material-ui/icons/Today';
import { makeStyles, Typography } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import getColorValue from './outputs/ColorValues'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteEvent } from '../store/actions/auth'




const EventList = (props) => {

    // Redux
    const { auth } = props

    // React 
    const initialState = {
        events: [],
        alert: false,
        eventSelected: {}
    }
    const [state, setState] = useState(initialState)

    const handleClickOpen = (e, eventItem) => {
        e.preventDefault()
        const eventSelected = auth.family.events.find(familyEvent =>
            familyEvent.title === eventItem.title &&
            familyEvent.date === eventItem.date &&
            familyEvent.time === eventItem.time
        )
        setState({
            ...state,
            alert: true,
            eventSelected
        })
    };

    const handleClose = () => {
        setState({
            ...state,
            alert: false
        })
    };

    const handleDelete = () => {
        setState({
            ...state,
            alert: false
        })
        props.deleteEvent(state.eventSelected, auth.family.password)
    };

    useEffect(() => {
        state && auth.family && setState((prevState) =>
            ({
                ...prevState,
                events: auth.family.events
            }
            ))
    }, [auth.family && auth.family])


    // Material UI
    const useStyles = makeStyles(theme => (
        {
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
                justifyContent: "left",
            },
            head: {
                backgroundColor: "lightgrey",
            },
            table: {
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(9),
            },

            addCircleIcon: {
                fontSize: "4.5rem",
                position: "fixed",
                bottom: "1rem",
                right: "1rem",
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
                paddingLeft: theme.spacing(1)
            },
            eventWrapper: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            },
            textWrapper: {
                diisplay: "flex",
                flexDirection: "column"
            }
        }
    ))

    const classes = useStyles()

    return (
        <>
            <TodayIcon className={classes.icon} />
            <Typography variant="h5">
                Events
            </Typography>
            <TableContainer>
                <Table
                    stickyHeader
                    size="small"
                    aria-label="sticky table"
                    className={classes.table}
                >
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell align="right" className={classes.head} style={{ width: "10%" }}>Date</TableCell>
                            <TableCell className={classes.head}>Event</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state && state.events.map((event) => (
                            <TableRow key={event.title + state.events.indexOf(event)}>
                                <TableCell align="right" component="th" scope="row" style={{ width: "10%" }}>
                                    <div>
                                        {event.date}
                                    </div>
                                    <div className={classes.time}>
                                        {event.time}
                                    </div>
                                </TableCell>
                                <TableCell >
                                    <div className={classes.eventWrapper}>
                                        <div className={classes.textWrapper}>
                                            <div>  {event.title} {event.location && `[${event.location}]`}</div>
                                            <div>{event.membersAttending.map(member => <Tooltip arrow title={member.name} key={member.email} className={classes.tooltip} ><IconButton className={classes.MuiIconButton}><FiberManualRecordIcon key={member.name}
                                                style={{ color: getColorValue(member.color), verticalAlign: "middle" }} /></IconButton></Tooltip>)}</div>
                                        </div>
                                        <div className={classes.delete} onClick={e => handleClickOpen(e, event)}
                                        ><DeleteIcon />
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
                <DialogTitle id="alert-dialog-title">{"Delete this event?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`By pressing the delete button event '${state.eventSelected.title}' will be permanently deleted from your list.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                    >
                        Back
          </Button>
                    <Button
                        onClick={handleDelete}
                        color="primary" autoFocus
                    >
                        Delete
          </Button>
                </DialogActions>
            </Dialog>
            <Link to="/calendar/add-event"><AddCircleIcon className={classes.addCircleIcon} color="secondary" /></Link>
        </>
    );
}

// Redux
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteEvent: (eventToDelete, familyPassword) => dispatch(deleteEvent(eventToDelete, familyPassword))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventList));