import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserListView, AddUser } from './components';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>User Registration App</h1>
      </header>
      <Router>
     <Switch>
       <Route exact path="/" component={UserListView} />
       <Route exact path="/adduser" component={AddUser}/>
     </Switch>
     </Router>
    </div>
  );
}

export default App;
