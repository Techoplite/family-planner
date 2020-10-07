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







const EventForm = (props) => {


    // Redux 
    const { family } = props

    // React 
    const initialState = {
        title: "",
        date: "",
        time: "",
        noTimeSelected: false,
        location: "",
        membersAttending: [],
        familyMembers: []
    }

    const { state, handleOnChange, setState } = useForm(initialState)

    const setDefaultDateAndTime = () => {
        const currentdate = new Date();
        const date = currentdate.getFullYear() + "-" + ((currentdate.getMonth() + 1) < 10 ? "0" + (currentdate.getMonth() + 1) : (currentdate.getMonth() + 1))
            + "-" + (currentdate.getDate() < 10 ? "0" + currentdate.getDate() : currentdate.getDate())
        const time = currentdate.getHours() + ":" + currentdate.getMinutes()
        setState({
            ...state,
            date,
            time
        })

    }

    const handleMembersAttendingOnChange = (e) => {
        e.preventDefault()
        const { id } = e.target
        const index = id.substr(id.length - 1)
        console.log('id :>> ', id);
        id.includes("tags-outlined-option") && setState({
            ...state,
            membersAttending: [...state.membersAttending, state.familyMembers[index]]
        });
    }

    const handleCheckbox = (e) => {
        const { name, checked } = e.target
        setState({
            ...state,
            [name]: checked
        })
    }

    useEffect(() => {
        family && state.familyMembers !== family.members && setState({
            ...state,
            familyMembers: family.members
        })
        state.date === "" && state.time === "" && setDefaultDateAndTime()
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
                marginTop: theme.spacing(4)
            },
            radioGroup: {
                display: "flex",
                justifyContent: "left",
            }
        }
    ))

    const classes = useStyles()

    return (
        <>
            <div>WORK IN PROGRESS...</div>
            <br />
            <br />
            <EventIcon className={classes.icon} />
            <Form
                title="Add new event"
            >
                {/* Title */}
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left">
                    Enter a title
                    </Typography>
                <CustomTextField
                    className={classes.customTextField}
                    label="Title"
                    onChange={handleOnChange}
                    value={state.title}
                    name="title"

                />

                {/* Date */}
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left"
                >
                    Pick a date
                </Typography>
                <TextField
                    onChange={handleOnChange}
                    id="date"
                    label="Date"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
                    value={state.date}
                    name="date"
                />

                {/* Time */}
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left"
                >
                    Pick a time
                </Typography>
                <TextField
                    onChange={handleOnChange}

                    {...(state.noTimeSelected && { disabled: true })}
                    id="time"
                    label="Time"
                    type="time"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    variant="outlined"
                    fullWidth
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
                        label="Not specified"
                    />
                </div>

                {/* Location */}
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left">
                    Enter a location
                    </Typography>
                <CustomTextField
                    className={classes.customTextField}
                    onChange={handleOnChange}
                    label="Location"
                    value={state.location}
                    name="location"
                />

                {/* Members Attending */}
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left">
                    Which member/s of the family is/are attending
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
                                    setState({
                                        ...state,
                                        membersAttending: state.membersAttending.filter(member => member.name !== option.name)
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
            </Form>
        </>
    );
}

// Redux
const mapStateToProps = (state) => {
    return {
        family: state.auth.family
    }
}

export default connect(mapStateToProps)(EventForm);