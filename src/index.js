import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import { Provider } from "react-redux";
import store from "./reducers";
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './theme/fonts.css';
import './theme/style.css';

const AppContainer = () => (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();
