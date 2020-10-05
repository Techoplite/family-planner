import React from 'react'
import { useForm, Form } from './hooks/useForm'
import EventIcon from '@material-ui/icons/Event';
import { makeStyles, TextField, Typography } from '@material-ui/core'
import CustomTextField from './inputs/CustomTextField';
import { Autocomplete } from '@material-ui/lab';



const EventForm = () => {

    // React 
    const initialState = {
        email: "",
        password: "",
        errors: {
            email: "",
            password: ""
        }
    }

    const familyMembers = [
        {
            name: "John"
        },
        {
            name: "Jane"
        },
        {
            name: "Mirko"
        },
        {
            name: "Chiara"
        },
    ]

    const { state, handleOnChange, setState } = useForm(initialState)

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
            <br/>
            <br/>
            <EventIcon className={classes.icon} />
            <Form
                title="Add new event"
            >
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left">
                    Enter a title for this event
                    </Typography>
                <CustomTextField
                    className={classes.customTextField}
                    label="Title"
                />
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left">
                    Enter a location for this event
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
                    options={familyMembers}
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

export default EventForm;