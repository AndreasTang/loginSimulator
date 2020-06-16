import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginPage from '../components/LoginPage'

const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={LoginPage} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default AppRouter