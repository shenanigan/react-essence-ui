import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../components/header/header';
import { NavComponents } from '../components/nav-components/nav-components';
import { useEffect } from 'react';

function Home() {
	const navigate = useNavigate();
	useEffect(() => {
		if (window.location.pathname === '/') {
			navigate('/getting-started');
		}
	}, [navigate]);
	return (
		<div style={{ background: 'var(--bg-color-primary)', color: 'var(--color-primary)', minHeight: '100vh' }}>
			<Header />
			<div className="flex gap-5 mb-5">
				<div className="hidden md:block">
					<NavComponents />
				</div>

				<div className="grow p-8">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default Home;
