import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import EventForm from './EventForm'



const Calendar = () => {

    // React
    const initialState = {
        events: []
    }

    const [state, setState] = useState(initialState)

    return (
        <>
            {state.events.length > 0 ?
                console.log("state is not empty") : <EventForm />
            }
        </>
    );
}

export default withRouter(Calendar);