import React from 'react';
import { Route, Switch } from 'react-router';
import Task from './pages/Tasks';
import LoginForm from './components/LoginForm';
import './style.scss';
 
function App() {
    
    return (
        <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/tasks" component={Task} />
        </Switch>
    )
    
}

export default App;
