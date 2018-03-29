import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    isSubmitted: false,
  };

  render() {
    let {name, email, password, isSubmitted} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <input
            autoFocus
            type="text"
            placeholder="Name"
            onChange={e => this.setState({name: e.target.value})}
            data-test="name"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            onChange={e => this.setState({email: e.target.value})}
            data-test="email"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={e => this.setState({password: e.target.value})}
            data-test="password"
          />
        </div>
        <div>
          <button
            onClick={() => {
              if (name && email && password) {
                this.setState({isSubmitted: true});
              }
            }}
            data-test="submitButton"
          >
            Submit
          </button>
        </div>
        {isSubmitted && <p data-test="submitSuccess">Submitted!</p>}
      </div>
    );
  }
}

export default App;
