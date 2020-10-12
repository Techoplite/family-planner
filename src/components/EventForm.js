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
import { addEvent } from '../store/actions/auth'
import { Redirect, withRouter } from 'react-router-dom';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const EventForm = (props) => {

    // Redux 
    const { family, user } = props

    // React 
    const initialState = {
        redirect: false,
        title: "",
        noTimeSelected: false,
        location: "",
        membersAttending: [],
        membersNotAttending: [],
        familyMembers: [],
        errors: {
            title: "",
            date: "",
            location: ""
        }
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
        errors.location = (errors.location = (/^[A-Za-z]+$/i).test(state.location) || state.location === "" ? "" : "Location cannot contain numbers.")
        setState({
            ...state,
            errors,
            redirect: true
        })
        return Object.values(errors).every(value => value === "")
    }

    const handleOnSubmit = async e => {
        e.preventDefault()
        validate() && props.addEvent(state, family.password, user)
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

    const handleCheckbox = (e) => {
        const { name, checked } = e.target
        setState({
            ...state,
            [name]: checked,

        })
    }

    const { errors } = state

    useEffect(() => {
        family && state.familyMembers !== family.members && setState({
            ...state,
            familyMembers: family.members,
            membersNotAttending: family.members
        })

        errors && (
            errors.title !== "" ||
            errors.date !== "" ||
            errors.location !== "") && props.setMessage("Please check all fields", "error");
    })

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
            <div>WORK IN PROGRESS...</div>
            <br />
            <br />
            <EventIcon className={classes.icon} />
            <Form
                title="Add new event"
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
                                style={{ width: "170px" }}
                                placeholder="12/10/2020"
                                onChange={date => handleDateChange(date)}
                                format="dd/MM/yyyy"
                                id="date"
                                label="Date"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputVariant="outlined"
                                value={state.date}
                                name="date"
                                required
                                error={state.errors.date ? true : false}
                                helperText={state.errors.date}
                            />
                        </MuiPickersUtilsProvider>
                    </div>

                    {/* Time */}
                    <div className={classes.picker}
                        style={{ width: "160px" }}>
                        <Typography
                            variant="subtitle1"
                            className={classes.typography}
                            align="left"
                        >
                            Pick a time
                        </Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                placeholder="08:00 AM"
                                mask="__:__ _M"
                                onChange={time => handleTimeChange(time)}
                                {...(state.noTimeSelected && { disabled: true })}
                                id="time"
                                label="Time"
                                className={classes.textField}
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
                                            checked={state.checkedB}
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
                                    backgroundColor: `${getColorvalue(state.familyMembers[state.familyMembers.indexOf(option)].color)}`,
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
                    options={state.familyMembers}
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
                    ADD EVENT
                </CustomButton>
            </Form>
        </>
    );
}

// Redux
const mapStateToProps = (state) => {
    return {
        family: state.auth.family,
        user: state.auth.userProfile.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMessage: (text, severity) => dispatch(setMessage(text, severity)),
        addEvent: (state, family, user) => dispatch(addEvent(state, family, user)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventForm));