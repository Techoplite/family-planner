import React, { useEffect } from 'react'
import { useForm, Form } from './hooks/useForm'
import EventIcon from '@material-ui/icons/Event';
import { makeStyles, TextField, Typography } from '@material-ui/core'
import CustomTextField from './inputs/CustomTextField';
import { Autocomplete } from '@material-ui/lab';
import { connect } from 'react-redux'
import Chip from '@material-ui/core/Chip';
import getColorvalue from './outputs/ColorValues'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CustomButton from './inputs/CustomButton';
import { setMessage } from '../store/actions/message'
import { findEventToEdit } from '../store/actions/auth'
import { Redirect, withRouter } from 'react-router-dom';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const EditEventForm = (props) => {

    // Redux 
    const { family, eventSelectedFound } = props

    // React 

    const { eventSelected } = props.location.state

    const initialState = {
        redirect: false,
        title: "",
        noTimeSelected: false,
        location: "",
        membersAttending: [],
        membersNotAttending: [],
        familyMembers: [],
        date: new Date(),
        time: new Date(),
        errors: {
            title: "",
            date: "",
            location: ""
        },
        isEventFound: false,
        checked: false
    }

    const { state, handleOnChange, setState } = useForm(initialState)

    const handleDateChange = (date) => {
        setState({
            ...state,
            date
        });
    };

    const handleTimeChange = (time) => {
        setState({
            ...state,
            time
        });
    };

    const validate = () => {
        let errors = {}
        errors.title = (state.title ? "" : "Title is required.") ||
            (/.*[a-zA-Z].*/i.test(state.title) ? "" : "Title must contain letters.")
        errors.date = (state.date ? "" : "Date is required.")
        errors.location = (errors.location = (/^[A-Za-z ]+$/i).test(state.location) || state.location === "" ? "" : "Location cannot contain numbers.")
        setState({
            ...state,
            errors,
        })
        return Object.values(errors).every(value => value === "")
    }

    const convertTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours : hours;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const convertDate = (date) => {
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return day + "/" + month + "/" + year
    }

    const redirect = () => {
        setState({
            ...state,
            redirect: true
        })
    }

    const handleOnSubmit = async e => {
        e.preventDefault()
        convertTime(state.date)
        convertDate(state.time)
        if (validate()) {
            const time = state.noTimeSelected ? "" : convertTime(state.time)
            const location = state.location !== "" && state.location[0].toUpperCase() + state.location.substring(1)
            const convertedState = {
                ...state,
                date: convertDate(state.date),
                rawDate: state.date.toString(),
                time,
                location,
            }
            redirect()
        }
        return () => {
            setState({
                ...state,
                redirect: false
            })
        }
    }

    const handleMembersAttendingOnChange = (e) => {
        e.preventDefault()
        const { id } = e.target
        const index = id.substr(id.length - 1)
        const memberToAdd = state.membersNotAttending[index]

        // Move item selected from membersNotAttending to membersAttending
        id.includes("tags-outlined-option") && setState({
            ...state,
            membersAttending: [...state.membersAttending, memberToAdd],
            membersNotAttending: state.membersNotAttending.filter(member =>
                member.email !== memberToAdd.email
            )
        });
    }

    const getDefaultMembersAttending = () => {
        const defaultValue = eventSelected.membersAttending
        console.log('defaultValue :>> ', defaultValue);
        console.log('eventSelected.membersAttending :>> ', eventSelected.membersAttending);
        return defaultValue
    }

    const handleCheckbox = (e) => {
        const { name, checked } = e.target
        setState({
            ...state,
            [name]: checked,

        })
    }
    const { errors } = state

    useEffect(() => {
        !state.isEventFound && props.findEventToEdit(eventSelected, family.password)

        family && state.familyMembers !== family.members && setState({
            ...state,
            familyMembers: family.members,
            membersNotAttending: family.members
        })

        if (eventSelectedFound && !state.isEventFound) {
            setState(prevState => ({
                ...prevState,
                title: eventSelected.title,
                date: eventSelected.rawDate,
                family: eventSelected.family,
                location: (eventSelected.location !== false) ? eventSelected.location : "",
                membersAttending: eventSelected.membersAttending,
                time: eventSelected.time === "" ? new Date() : eventSelected.rawTime,
                noTimeSelected: eventSelected.time !== "" ? false : true,
                users: eventSelected.users,
                isEventFound: true,
                checked: eventSelected.time === "" ? true : false,
            }))
        }

        errors && (
            errors.title !== "" ||
            errors.date !== "" ||
            errors.location !== "") && props.setMessage("Please check all fields", "error")
    }, [eventSelectedFound])



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
                marginTop: theme.spacing(0),
                "& .MuiIconButton-root": {
                    padding: 0
                }
            },
            dateTimeWrapper: {
                display: "flex",
                justifyContent: "space-evenly"
            },
            radioGroup: {
                display: "flex",
                justifyContent: "left",
            },
            picker: {
                display: "flex",
                flexDirection: "column",
            }
        }
    ))

    const classes = useStyles()

    return (
        <>
            {state.redirect && <Redirect to="/calendar/events" />}
            {eventSelectedFound &&
                <>
                    <EventIcon className={classes.icon} />
                    <Form
                        title="Edit event"
                        onSubmit={handleOnSubmit}
                    >
                        {/* Title */}
                        <Typography
                            variant="subtitle1"
                            className={classes.typography}
                            align="left"
                        >
                            Enter a title
                    </Typography>
                        <CustomTextField
                            autoFocus
                            required
                            className={classes.customTextField}
                            label="Title"
                            onChange={handleOnChange}
                            value={state.title}
                            name="title"
                            helperText={state.errors.title}
                            error={state.errors.title ? true : false}

                        />

                        {/* Date */}
                        <div className={classes.dateTimeWrapper}>
                            <div className={classes.picker}>
                                <Typography
                                    variant="subtitle1"
                                    className={classes.typography}
                                    align="left"
                                >
                                    Pick a date
                </Typography>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        style={{ width: "150px" }}
                                        onChange={date => handleDateChange(date)}
                                        format="dd/MM/yyyy"
                                        id="date"
                                        label="Date"
                                        className={classes.customTextField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputVariant="outlined"
                                        value={state.date}
                                        name="date"
                                        required
                                        error={state.errors.date ? true : false}
                                        helperText={state.errors.date}
                                        minDate={new Date()}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>

                            {/* Time */}
                            <div className={classes.picker}
                                style={{ width: "140px" }}>
                                <Typography
                                    variant="subtitle1"
                                    className={classes.typography}
                                    align="left"
                                >
                                    Pick a time
                        </Typography>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                        mask="__:__ _M"
                                        onChange={time => handleTimeChange(time)}
                                        {...(state.noTimeSelected && { disabled: true })}
                                        id="time"
                                        label="Time"
                                        className={classes.customTextField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        inputVariant="outlined"
                                        value={state.time}
                                        name="time"
                                    />
                                    <div
                                        className={classes.radioGroup}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={state.checked}
                                                    onChange={handleCheckbox}
                                                    color="primary"
                                                    name="noTimeSelected"
                                                    value={state.noTimeSelected}
                                                />
                                            }
                                            label="All day"
                                        />
                                    </div>
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>

                        {/* Location */}
                        <Typography
                            variant="subtitle1"
                            className={classes.typography}
                            align="left"
                            style={{ marginTop: "-3px" }}>
                            Enter a location
                    </Typography>
                        <CustomTextField
                            className={classes.customTextField}
                            onChange={handleOnChange}
                            label="Location"
                            value={state.location}
                            name="location"
                            helperText={state.errors.location}
                            error={state.errors.location ? true : false}
                        />

                        {/* Members Attending */}
                        <Typography
                            variant="subtitle1"
                            className={classes.typography}
                            align="left">
                            Family member/s attending
                    </Typography>
                        <Autocomplete
                            defaultValue={getDefaultMembersAttending}
                            name="membersAttending"
                            onChange={handleMembersAttendingOnChange}
                            multiple
                            id="tags-outlined"
                            renderTags={(options, getTagProps) =>
                                options.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        key={option.name}
                                        id={option.name}
                                        style={{
                                            backgroundColor:
                                                // "blue"
                                            `${getColorvalue(option.color)}`
                                            ,
                                            color: "white"
                                        }}
                                        label={option.name}
                                        {...getTagProps({ index })}
                                        onMouseDown={() => {

                                            // Move item selected from membersAttending to membersAttending membersNotAttending
                                            setState({
                                                ...state,
                                                membersAttending: state.membersAttending.filter(member => member.name !== option.name),
                                                membersNotAttending: [...state.membersNotAttending, state.familyMembers.find(member => member.name === option.name)]
                                            })
                                        }}
                                    />
                                ))
                            }
                            options={family.members}
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Members Attending"
                                    placeholder="Family Member"
                                />
                            )}
                        />
                        <CustomButton
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            EDIT EVENT
                </CustomButton>
                    </Form>
                </>
            }

        </>
    );
}

// Redux
const mapStateToProps = (state) => {
    return {
        family: state.auth.family,
        user: state.auth.userProfile.email,
        eventSelectedFound: state.auth.eventSelected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMessage: (text, severity) => dispatch(setMessage(text, severity)),
        findEventToEdit: (state, family, user) => dispatch(findEventToEdit(state, family, user)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditEventForm));