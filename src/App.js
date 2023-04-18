import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/profile';
import Search from './components/Search';
import ChangePassword from './components/ChangePassword';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/search" component={Search} />
        <Route path="/change-password" component={ChangePassword} />
      </Switch>
    </Router>
  );
};

export default App;