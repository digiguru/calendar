import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import {TeamSlider} from './views/TeamSlider';
import { AppHolder } from './AppHolder';

import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<TeamSlider />, document.getElementById('root'));
ReactDOM.render(<AppHolder />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
