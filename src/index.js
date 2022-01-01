import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { ThemeProvider } from '@mui/system';
import ColorTheme from './components/Theme'
import {Provider} from 'react-redux'
import store from './app/store'
import {AppState} from './AppState'

ReactDOM.render(
  <AppState>

  <Router>
    <React.StrictMode>
      {/* <Provider store={store}> */}
        <ThemeProvider theme={ColorTheme}>
          {/* <App /> */}
        <Route path="/" component={App} />
        </ThemeProvider>
      {/* </Provider> */}
    </React.StrictMode>
  </Router>
  </AppState>

  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
