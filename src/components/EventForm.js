import React, { useEffect } from 'react'
import { useForm, Form } from './hooks/useForm'
import EventIcon from '@material-ui/icons/Event';
import { makeStyles, TextField, Typography } from '@material-ui/core'
import CustomTextField from './inputs/CustomTextField';
import { Autocomplete } from '@material-ui/lab';
import { connect } from 'react-redux'
import Chip from '@material-ui/core/Chip';
import getColorvalue from './outputs/ColorValues'




const EventForm = (props) => {

    // Redux 
    const { family } = props

    // React 
    const initialState = {
        email: "",
        password: "",
        errors: {
            email: "",
            password: ""
        },
        familyMembers: ["rgeg"]
    }

    const { state, handleOnChange, setState } = useForm(initialState)



    useEffect(() => {
        family && state.familyMembers !== family.members && setState({
            ...state,
            familyMembers: family.members
        })
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
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left">
                    Enter a title
                    </Typography>
                <CustomTextField
                    className={classes.customTextField}
                    label="Title"
                />
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left"
                >
                    Pick a date
                </Typography>
                <TextField
                    id="date"
                    label="Date"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
                />
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left"
                >
                    Pick a time
                </Typography>
                <TextField
                    id="time"
                    label="Time"
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    variant="outlined"
                    fullWidth   
                />
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left">
                    Enter a location
                    </Typography>
                <CustomTextField
                    className={classes.customTextField}

                    label="Location"
                />
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left">
                    Which member/s of the family is/are attending
                    </Typography>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                variant="outlined"
                                key={option}
                                style={{
                                    backgroundColor: `${getColorvalue(state.familyMembers[state.familyMembers.indexOf(option)].color)}`,
                                    color: "white"
                                }}
                                label={option.name}
                                onDelete={() => console.log("test")}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    options={state.familyMembers}
                    getOptionLabel={(option) => option.name}
                    // defaultValue={[familyMembers[0]]}
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