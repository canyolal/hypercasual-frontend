import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.render(
    <React.StrictMode>
            <App />
    </React.StrictMode>,
    document.getElementById('root')
)