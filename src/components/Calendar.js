import React from 'react'
import { withRouter } from 'react-router-dom'
import DateTimePicker from './DateTimePicker'



const Calendar = () => {
    return (
        <>
            <div>This page will host the calendare app...</div>
            <br />
            <br />
            <br />
            <DateTimePicker />
        </>
    );
}

export default withRouter(Calendar);