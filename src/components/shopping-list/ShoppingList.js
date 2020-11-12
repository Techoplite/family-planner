import React from 'react'
import { withRouter, Route, Switch, useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux'
import ShoppingItems from './ShoppingItems'
import AddShoppingItemForm from './AddShoppingItemForm'

const ShoppingList = () => {

    //React Router DOM
    const { path } = useRouteMatch()

    return (
        <>
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