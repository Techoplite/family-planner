import React, { useState, useEffect } from 'react';
import CustomButton from '../inputs/CustomButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';
import { addTodoItem, updateTodoList } from './../../store/actions/todoList'
import { connect } from 'react-redux'
import { setMessage } from '../../store/actions/message'


const TodoList = (props) => {

    // Redux
    const { familyPassword, auth } = props

    // React
    const initialState = { todoItems: [], isAddingItem: false, itemsToDelete: [] }
    const [state, setState] = useState(initialState)

    const handleChange = (e) => {
        e.target.checked === true ?
            setState({
                ...state,
                itemsToDelete: [...state.itemsToDelete, e.target.id]
            })
            :
            setState({
                ...state,
                itemsToDelete: state.itemsToDelete.filter(item => (item
                    !== e.target.id))
            })
    }

    const handleItemToAdd = e => {
        const { value } = e.target
        setState({
            ...state,
            itemToAdd: value
        })
    }

    const handleClick = () => {
        setState({
            ...state,
            isAddingItem: false
        })
        if (state.isAddingItem) {
            const id = state.itemToAdd.replace(/\s/g, '')
            props.addTodoItem(state.itemToAdd, id, familyPassword)
        } else {
            const todoItems = state.todoItems.filter(todoItem => !state.itemsToDelete.includes(todoItem.id))
            props.updateTodoList(todoItems, familyPassword)
        }


    }

    const handleAddItem = () => {
        setState({
            ...state,
            isAddingItem: true
        })

    }

    useEffect(() => {
        state && auth.family &&
            setState((prevState) => ({
                ...prevState,
                todoItems: auth.family.todoItems,
            }));
        auth.family.todoItems.length < 1 && setState(
            prevState => ({
                ...prevState,
                isAddingItem: true
            })
        )
    }, [auth.family && auth.family, state.todoItems.length]);

    // Material UI
    const useStyles = makeStyles((theme) => ({
        icon: {
            backgroundColor: "lightgrey",
            padding: "10px",
            borderRadius: "50px",
            border: "2px solid #3F51B5",
            marginBottom: theme.spacing(1)
        },
        paper: {
            backgroundColor: '#edd45d',
            display: "flex",
            alignItems: 'baseline',
            flexDirection: 'column',
            width: "80%",
            marginLeft: "10%",
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),

        },
        typography: {
            marginBottom: theme.spacing(4),
        },
        formControlLabel: {
            marginLeft: theme.spacing(1),
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
        addCircleIcon: {
            fontSize: "4.5rem",
            position: "fixed",
            bottom: "1rem",
            right: "1rem"
        },
        customButton: {
            width: "80%",
            marginTop: theme.spacing(4),
        },
        addItem: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            width: "calc(100% - 2.5rem)",
            margin: "auto"
        }
    }));
    const classes = useStyles();

    return (
        <>
            <FormatListBulletedIcon data-test="formatListBulletedIcon" className={classes.icon} />
            <Typography data-test="typography" variant="h5" className={classes.typography} >To-do List</Typography>
            <Paper data-test="paper" elevation={3} className={classes.paper}>
                {state.todoItems && state.todoItems.map(item =>
                    < FormControlLabel
                        style={{
                            textDecoration: state.itemsToDelete.some(itemToDelete => itemToDelete === item.id) && 'line-through',
                            color: state.itemsToDelete.some(itemToDelete => itemToDelete === item.id) && "#f50057"
                        }}
                        key={item.id}
                        className={classes.formControlLabel}
                        control={
                            < Checkbox
                                id={item.id}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<CheckCircleOutlineIcon />}
                                name={item.text}
                                onChange={handleChange}
                            />}
                        label={
                            `${item.text}`
                        }
                    />
                )}
                <Grow
                    data-test="grow"
                    in={state.isAddingItem}
                    mountOnEnter unmountOnExit
                >
                    <TextField data-test="textField" id="add-todo" label="Add To-do" variant="outlined" fullWidth
                        className={classes.addItem} onChange={handleItemToAdd}
                    />
                </Grow>
            </Paper>
            {(state.isAddingItem || state.itemsToDelete.length > 0) &&
                <CustomButton
                    data-test="customButton"
                    className={classes.customButton}
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    onClick={handleClick}
                >
                    UPDATE LIST
                </CustomButton>
            }
            <div className={classes.addIcon} onClick={handleAddItem}>
                <div className={classes.whiteBackground}></div>
                <AddCircleIcon data-testid="addCircleIcon" className={classes.addCircleIcon} color="secondary" />
            </div>
        </>
    );
}

// Redux
const mapStateToProps = (state) => {
    return {
        familyPassword: state.auth.family.password,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMessage: (text, severity) => dispatch(setMessage(text, severity)),
        addTodoItem: (itemToAdd, id, familyPassword) => dispatch(addTodoItem(itemToAdd, id, familyPassword)),
        updateTodoList: (todoItems, familyPassword) => dispatch(updateTodoList(todoItems, familyPassword)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);