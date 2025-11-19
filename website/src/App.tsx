import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import GAListener from './GAListener';

function App() {
	useEffect(() => {
		ReactGA.initialize(import.meta.env.VITE_GA_ID);
	}, []);

	return (
		<BrowserRouter>
			<GAListener />
			<AppRoutes />
		</BrowserRouter>
	);
}

export default App;
