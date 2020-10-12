import React from 'react'
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



const EventList = (props) => {

    // Redux
    const { auth } = props


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
            table: {
                marginTop: theme.spacing(2),
                // width: "fit-content"
            },
            row: {
                width: "fit-content",
                paddingLeft: 0
            },
            addCircleIcon: {
                fontSize: "4.5rem",
                position: "fixed",
                bottom: "1rem",
                right: "1rem",
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
                    // size="small"
                    aria-label="sticky table"
                    className={classes.table}
                >
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell align="right" className={classes.row}>Date</TableCell>
                            <TableCell className={classes.row}>Event</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {auth.family && auth.family.events.map((event) => (
                            <TableRow key={event.title}>
                                <TableCell align="right" component="th" scope="row" className={classes.row}>
                                    {event.date}
                                </TableCell>
                                <TableCell className={classes.row}>{event.title} {event.location && `[${event.location}]`}
                                    {event.membersAttending.map(member => <FiberManualRecordIcon key={member.name}
                                        style={{ color: member.color, verticalAlign: "bottom" }} />)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to="/calendar/add-event"><AddCircleIcon className={classes.addCircleIcon} color="secondary" /></Link>
        </>
    );
}

// Redux
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(EventList));