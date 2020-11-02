import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import getColorValue from '../outputs/ColorValues'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const EventFilterform = (props) => {

    // React
    const { state, setState } = props

    const handleChange = (e, member) => {
        if (state.filter.byMembersAttending.find(familyMember => familyMember.email === member.email)) {
            // Remove member from the list
            setState({
                ...state,
                filter: {
                    ...state.filter,
                    byMembersAttending: state.filter.byMembersAttending.filter(familyMember => (familyMember.email !== member.email))
                }

            })
        } else {
            // Add member to list
            setState({
                ...state,
                filter: {
                    ...state.filter,
                    byMembersAttending: [...state.filter.byMembersAttending, {
                        name: member.name,
                        color: member.color,
                        email: member.email
                    }]
                }
            })
        }
    };

    const handleRadioChange = (event) => {
        setState({
            ...state,
            filter: {
                ...state.filter,
                byMultipleDays: event.target.value
            }
        });
    };

    const handleDateChange = (date) => {
        setState({
            ...state,
            filter: {
                ...state.filter,
                bySingleDay: date
            }

        });
    };

    const handleCheckbox = (e) => {
        const { name, checked } = e.target
        setState({
            ...state,
            filter: {
                ...state.filter,
                [name]: checked,
            }

        })
    }

    useEffect(() => {
        state.filter.noSingleDay === false &&
            setState(prevState => ({
                ...prevState,
                filter: {
                    ...prevState.filter,
                    byMultipleDays: "all-events"
                }
            }))
    }, [state.filter.noSingleDay])

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
                        value={state.filter.bySingleDay}
                        name="date"
                        required
                        minDate={new Date()}
                        {...(state.filter.noSingleDay && { disabled: true })}
                    />
                </MuiPickersUtilsProvider>
                <div
                    className={classes.radioGroup}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.filter.noSingleDay}
                                onChange={handleCheckbox}
                                color="primary"
                                name="noSingleDay"
                                value={state.filter.noSingleDay}
                            />
                        }
                        label="Unset"
                    />
                </div>
            </div>
            <div className={classes.wrapper}>
                <FormLabel component="legend" className={classes.FormLabel}>By multiple days</FormLabel>
                <RadioGroup aria-label="by-multiple-days" name="by-multiple-days" value={state.filter.byMultipleDays} onChange={handleRadioChange}>
                    <FormControlLabel value="next-7-days" control={<Radio color="primary" />} label="Next 7 days" {...(state.filter.noSingleDay === false && { disabled: true })} />
                    <FormControlLabel value="next-month" control={<Radio color="primary" />} label="Next month"  {...(state.filter.noSingleDay === false && { disabled: true })} />
                    <FormControlLabel value="all-events" control={<Radio color="primary" />} label="All events" {...(state.filter.noSingleDay === false && { disabled: true })} />
                </RadioGroup>
            </div>
            <div className={classes.wrapper} style={{ marginBottom: 0 }}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className={classes.FormLabel}>By members attending</FormLabel>
                    <FormGroup className={classes.FormGroup}>
                        {state.filter.familyMembers.map(member =>
                            (
                                <div className={classes.checkbox} key={member.email}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" onChange={(e) => handleChange(e, member)} name={member.name} />}
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