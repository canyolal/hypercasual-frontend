import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root'))