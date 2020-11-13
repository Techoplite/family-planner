import React from 'react'
import { 
    Redirect, withRouter, Route, Switch, useRouteMatch
} from 'react-router-dom'
import { connect } from 'react-redux'
import ShoppingItems from './ShoppingItems'
import AddShoppingItemForm from './AddShoppingItemForm'


const ShoppingList = (props) => {

    //React Router DOM
    const { path, url } = useRouteMatch()

    // Redux 
    const { auth } = props

    return (
        <>
            {auth.family.shoppingItems && auth.family.shoppingItems.length > 0 ?
                <Redirect to={`${url}/shopping-list-items`} />
                :
                <Redirect to={`${url}/add-shopping-item`} />
            }
            <Switch>
                <Route exact path={`${path}/shopping-list-items`} component={ShoppingItems} />
                <Route exact path={`${path}/add-shopping-item`} component={AddShoppingItemForm} />
            </Switch>
        </>
    );
}

// Redux
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(ShoppingList));