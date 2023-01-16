import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { connect, Provider } from 'react-redux'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const DECIMAL = 'DECIMAL';
const decimal = () => {
  return {
    type: DECIMAL,
    operation: "."
  }
}
const ADD = 'ADD';
const add = () => {
  return {
    type: ADD,
    operation: "+"
  }
}
const SUBTRACT = 'SUBTRACT';
const subtract = () => {
  return {
    type: SUBTRACT,
    operation: "-"
  }
}
const MULTIPLY = 'MULTIPLY';
const multiply = () => {
  return {
    type: MULTIPLY,
    operation: '*'
  }
}
const DIVIDE = 'DIVIDE';
const divide = () => {
  return {
    type: DIVIDE,
    operation: '/'
  }
}
const EQUALS = 'EQUALS';
const equals = () => {
  return {
    type: EQUALS
  }
}

const defaultState = {
  input: '0',
  display: ''
}

//Function to convert the string into an array in Reverse Polish Notation
const convertEquation = (str) => {
  const operatorStack = [];
  const resultQueue = [];
  const precedenceObj = {
    "+": 1,
    "-": 1,
    "/": 2,
    "*": 2,
    "(": 3,
    ")": 3
  };
  //Split the equation into an array of numbers and operators, in infix order
  const inputArr = str.split(" ");
  //Push the numbers encountered in the array into the result queue
  //If an operator is encountered, push it to the stack. If the precedence of the encountered operator is lower than the operator at the top of the stack, move on-stack operators to queue and then push encountered operator onto stack.
  for (let i = 0; i < inputArr.length; i++) {
    if (Number.isFinite(parseFloat(inputArr[i]))) {
      resultQueue.push(parseFloat(inputArr[i]));
    }
    else if (!Number.isFinite(parseFloat(inputArr[i]))) {
      if (precedenceObj[inputArr[i]] < precedenceObj[operatorStack[operatorStack.length - 1]]) {
        while (operatorStack.length > 0) {
          resultQueue.push(operatorStack.pop());
        }
        operatorStack.push(inputArr[i]);
      }
    }
  };
  while (operatorStack.length > 0) {
   resultQueue.push(operatorStack.pop());
  };
  return resultQueue;
}

const solveEquation = (queue) => {
  const resultStack = [];
  for (let i = 0; i < queue.length; i++) {
    if (Number.isNaN(queue[i])) {
      resultStack.push(queue[i])
    } else {
      let b = resultStack.pop();
      let a = resultStack.pop();
      let result;
      switch (queue[i]) {
        case "+":
          result = a + b;
          break;
        case "-":
          result = a - b;
          break;
        case "/":
          result = a / b;
          break;
        case "*":
          result = a * b;
          break;
        default:
          break;
      }
      resultStack.push(result);
    }
  }
  return resultStack[0].toString();
}

const calcReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD:
    case SUBTRACT:
    case MULTIPLY:
    case DIVIDE:
      return {
        ...state,
        display: state.display.concat(state.input, " ", action.operation, " "),
        input: "0"
      }
    case DECIMAL:
      if (state.input.indexOf('.') === -1) {
        return {
          input: state.input.concat(".")
        }
      } else {
        break;
      }
    case EQUALS:
      return {
        ...state,
        display: solveEquation(convertEquation(state.display)),
        input: "0"
      }
    default:
      break;
  }
}

const store = configureStore({
  reducer: calcReducer
})


//REACT-REDUX
const mapStateToProps = (state) => {
  return {
    input: state.input,
    display: state.display
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    divide: function() {
      dispatch(divide());
    },
    multiply: function() {
      dispatch(multiply());
    },
    add: function() {
      dispatch(add());
    },
    subtract: function() {
      dispatch(subtract());
    },
    decimal: function() {
      dispatch(decimal());
    },
    equals: function() {
      dispatch(equals());
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Container />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
