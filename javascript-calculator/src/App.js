import './App.css';
import React from 'react';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {

  }
  render() {
    return (
      <div id='calculator' class='container-fluid'>
        <h1>Calculator</h1>
        <div class='row'>
          <div class='col-md-2 mx-auto'>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
