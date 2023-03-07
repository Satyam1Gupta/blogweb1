import React from 'react';
import App from './App';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById("root"));

root.render( <HashRouter>
              <App/>
           </HashRouter>);
