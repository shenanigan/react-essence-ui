import styles from './nav-components.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

export const NavComponents = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentPath = location.pathname;
	const components = [
		{
			path: '/components/button',
			name: 'Button',
		},
		{
			path: '/components/loader',
			name: 'Loader',
		},
		{
			path: '/components/progress-bar',
			name: 'Progress Bar',
		},
		{
			path: '/components/input',
			name: 'Input',
		},
		{
			path: '/components/text-area',
			name: 'Text Area',
		},
		{
			path: '/components/check-box',
			name: 'Check Box',
		},
		{
			path: '/components/radio',
			name: 'Radio',
		},
		{
			path: '/components/switch',
			name: 'Switch',
		},
		{
			path: '/components/range',
			name: 'Range',
		},
		{
			path: '/components/alert',
			name: 'Alert',
		},
		{
			path: '/components/time-picker',
			name: 'Time Picker',
		},
		{
			path: '/components/date-picker',
			name: 'Date Picker',
		},
	];

	const comingSoonComponents = [
		{
			path: '/components/icon-button',
			name: 'Icon Button',
		},
		{
			path: '/components/dropdown',
			name: 'Dropdown',
		},
		{
			path: '/components/autocomplete',
			name: 'Autocomplete',
		},
		{
			path: '/components/hub',
			name: 'Hub',
		},
		{
			path: '/components/pivot-page',
			name: 'Pivot Page',
		},
		{
			path: '/components/accordian',
			name: 'Accordian',
		},
		{
			path: '/components/tiles',
			name: 'Tiles',
		},
		{
			path: '/components/grid',
			name: 'Grid',
		},
		{
			path: '/components/contacts-picker',
			name: 'Contacts Picker',
		},
	];

	const handleClick = (path: string) => {
		navigate(path);
	};
	return (
		<div className="flex-start w-[250px] mt-8">
			<ul>
				<li
					className={`${styles['keep-together']} ${currentPath === '/getting-started' ? styles['active'] : ''}`}
					onClick={() => handleClick('/getting-started')}>
					Getting Started
				</li>
				<li>Components</li>
				<ul>
					{components.map(component => (
						<li
							key={component.path}
							onClick={() => handleClick(component.path)}
							className={currentPath === component.path ? styles['active'] : ''}>
							{component.name}
						</li>
					))}
				</ul>

				<li className={styles['disabled']}>Coming soon...</li>
				<ul>
					{comingSoonComponents.map(component => (
						<li
							key={component.path}
							className={styles['disabled']}
							onClick={() => handleClick(component.path)}>
							{component.name}
						</li>
					))}
				</ul>
			</ul>
		</div>
	);
};
