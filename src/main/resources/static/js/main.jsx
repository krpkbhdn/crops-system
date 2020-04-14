import React from 'react';
import {render} from 'react-dom';
import App from 'app.jsx';

import './style.scss';

render(<React.StrictMode><App /></React.StrictMode>, document.getElementById("app"));
