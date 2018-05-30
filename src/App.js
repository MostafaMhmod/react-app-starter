import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import home from './components/home';
let file = require('./db.json')
const db = JSON.stringify(file);
export const data = JSON.parse(db);


class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={home} />
          {/* <Route exact path="/plans" component={plans} /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
