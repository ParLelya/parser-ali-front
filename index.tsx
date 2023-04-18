import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>
);
