import React, { Component } from 'react';
import { render } from 'react-dom';

import Rewards from './components/rewards';
import data from './data/transactions';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

class App extends Component {
  render() {
    return (
      <div>
        <p>
          <h1>Customer Rewards</h1>
        </p>
        <Rewards transactions={data}/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
