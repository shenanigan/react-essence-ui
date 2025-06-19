import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/header';
import { NavComponents } from '../components/nav-components/nav-components';

function Home() {
	return (
		<div style={{ background: 'var(--primary-bkg-color)', color: 'var(--primary-color)', minHeight: '100vh' }}>
			<Header />
			<div className="flex gap-5 mb-5">
				<div className="d-none d-lg-block">
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
