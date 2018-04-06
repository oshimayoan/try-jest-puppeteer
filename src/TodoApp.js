// @flow

import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

let lastID = 0;

export default class TodoApp extends Component<*> {
  state = {
    text: '',
    items: [
      {
        id: 0,
        title: 'Something to do',
        completed: false,
      },
    ],
  };

  _newItem = text => {
    lastID += 1;
    let newItem = {
      id: lastID,
      title: text,
      completed: false,
    };
    this.setState({items: [...this.state.items, newItem]});
  };

  _toggleItem = id => {
    let newItems = this.state.items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });
    this.setState({items: newItems});
  };

  render() {
    return (
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        <h2 data-test="todoTitle">What to do</h2>
        <div
          style={{paddingBottom: 20, flexDirection: 'column', display: 'flex'}}
        >
          {/* <FormControl data-test="todoForm">
            <InputLabel htmlFor="todo">Write something to do</InputLabel> */}
          <input
            data-test="todoInput"
            value={this.state.text}
            placeholder="Write something to do"
            onChange={e => this.setState({text: e.target.value})}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                this._newItem(this.state.text);
                this.setState({text: ''});
              }
            }}
            style={{padding: 10}}
          />
          {/* </FormControl> */}
          <Button
            data-test="todoSubmit"
            variant="raised"
            color="primary"
            style={{marginTop: 20}}
            onClick={() => {
              if (this.state.text) {
                this._newItem(this.state.text);
                this.setState({text: ''});
              }
            }}
          >
            Submit
          </Button>
        </div>
        <div
          style={{
            flexDirection: 'column',
            display: 'flex',
          }}
        >
          {this.state.items.map(item => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  data-test={`todoItem-${item.id}`}
                  checked={item.completed}
                  onChange={() => this._toggleItem(item.id)}
                />
              }
              label={item.title}
            />
          ))}
        </div>
      </div>
    );
  }
}
