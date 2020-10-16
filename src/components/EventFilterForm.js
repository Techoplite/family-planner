import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import getColorValue from './outputs/ColorValues'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const EventFilterform = (props) => {

    // React
    const { initialState } = props

    const [state, setState] = useState(initialState.filter)

    const handleChange = (e, color) => {
        const { name } = e.target
        if (state.byMembersAttending.find(member => member.name === name && member.color === color)) {
            setState({
                ...state,
                byMembersAttending: state.byMembersAttending.filter(member => (member.name !== name) && (member.color !== color))
            })
        } else {
            setState({
                ...state,
                byMembersAttending: [...state.byMembersAttending, { name, color }]
            })
        }
    };

    const handleRadioChange = (event) => {
        setState({
            ...state,
            byMultipleDays: event.target.value
        });
    };

    const handleDateChange = (date) => {
        setState({
            ...state,
            bySingleDay: date
        });
    };

    const handleCheckbox = (e) => {
        const { name, checked } = e.target
        setState({
            ...state,
            [name]: checked,

        })
    }

    useEffect(() => {
        state.noSingleDay === false &&
            setState(prevState => ({
                ...prevState,
                byMultipleDays: "all-events"
            }))
    }, [state.noSingleDay])

    // Material UI
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        formControl: {
            margin: theme.spacing(3),
            width: "100%",
            marginLeft: 0
        },
        checkbox: {
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "baseline",
            "& .MuiFormControlLabel-root": {
                marginRight: "5px"
            },
            width: "50%"
        },
        FormLabel: {
            width: "100%",
            display: "flex",
            justifyContent: "left",
            marginBottom: "1rem"
        },
        wrapper: {
            marginBottom: "1rem"
        },
        ButtonGroup: {
            marginTop: "1rem"
        },
        FormGroup: {
            flexDirection: "row"
        },
        Date: {
            width: "auto"
        },
        radioGroup: {
            width: 100,
            display: "flexbox",
            justifyContent: "right"
        }
    }));

    const classes = useStyles();

    return (

        <>
            <div className={classes.wrapper}>
                <FormLabel component="legend" className={classes.FormLabel}>By single day</FormLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        onChange={date => handleDateChange(date)}
                        format="dd/MM/yyyy"
                        id="date"
                        label="Date"
                        className={classes.Date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputVariant="outlined"
                        value={state.bySingleDay}
                        name="date"
                        required
                        minDate={new Date()}
                        {...(state.noSingleDay && { disabled: true })}
                    />
                </MuiPickersUtilsProvider>
                <div
                    className={classes.radioGroup}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.noSingleDay}
                                onChange={handleCheckbox}
                                color="primary"
                                name="noSingleDay"
                                value={state.noSingleDay}
                            />
                        }
                        label="Unset"
                    />
                </div>
            </div>
            <div className={classes.wrapper}>
                <FormLabel component="legend" className={classes.FormLabel}>By multiple days</FormLabel>
                <RadioGroup aria-label="by-multiple-days" name="by-multiple-days" value={state.byMultipleDays} onChange={handleRadioChange}>
                    <FormControlLabel value="next-7-days" control={<Radio color="primary" />} label="Next 7 days" {...(state.noSingleDay === false && { disabled: true })} />
                    <FormControlLabel value="next-month" control={<Radio color="primary" />} label="Next month"  {...(state.noSingleDay === false && { disabled: true })} />
                    <FormControlLabel value="all-events" control={<Radio color="primary" />} label="All events" />
                </RadioGroup>
            </div>
            <div className={classes.wrapper} style={{ marginBottom: 0 }}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className={classes.FormLabel}>By members attending</FormLabel>
                    <FormGroup className={classes.FormGroup}>
                        {state.familyMembers.map(member =>
                            (
                                <div className={classes.checkbox} key={member.email}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" onChange={(e) => handleChange(e, member.color)} name={member.name} />}
                                        label={member.name}
                                    />
                                    <FiberManualRecordIcon style={{ color: getColorValue(member.color) }} />
                                </div>
                            )
                        )}
                    </FormGroup>
                </FormControl>
            </div>
        </>
    );
}

export default EventFilterform;