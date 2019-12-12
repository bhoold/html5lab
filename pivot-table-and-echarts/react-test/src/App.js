import React from 'react';

import './App.css';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import ChartLib from './widgets/ChartLib';
import Stage from './widgets/Stage';
import Property from './widgets/Property';

import rootReducer from './store/reducers'

const store = createStore(rootReducer)

console.log(store)
function App() {
    return (
    <Provider store={store}>
        <div id="layout">
            <ChartLib />
            <Stage />
            <Property />
        </div>
    </Provider>
    );
}

export default App;
