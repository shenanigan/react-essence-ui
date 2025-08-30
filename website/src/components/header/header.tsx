import { useState } from 'react';
import { Button } from '@wp-essence-ui/components';
import { Switch } from '@wp-essence-ui/components';
import styles from './header.module.css';

export function Header() {
	const colors = ['FF6D6A', '8BD3E6', 'EFBE7D', 'B1A2CA', '6495EC'];
	const [currentSize, setCurrentSize] = useState('small');
	const [currentColor, setCurrentColor] = useState('FF6D6A');
	const [isLightTheme, setLightTheme] = useState(true);

	const setSize = ($event?: string) => {
		if (currentSize) {
			document.body.classList.remove(currentSize);
		}
		if ($event) {
			document.body.classList.add($event);
			setCurrentSize($event);
		}
	};

	const setColor = (color?: string) => {
		if (color) {
			setCurrentColor(color);
			document.body.style.setProperty('--color-theme', `#${color}`);
		}
	};

	const toggleTheme = () => {
		if (isLightTheme) {
			setLightTheme(false);
			document.body.classList.add('theme-dark');
			document.body.classList.remove('theme-light');
		} else {
			setLightTheme(true);
			document.body.classList.add('theme-light');
			document.body.classList.remove('theme-dark');
		}
	};
	return (
		<div
			className={` items-center justify-between p-5 hidden md:flex m-0 mb-lg-3 ${styles['header-border-bottom']}`}>
			<div className="text-3xl">
				<strong>ESSENCE UI</strong>
			</div>
			<div className="flex items-center">
				<div>Size:</div>
				<Button className="mx-4" onClick={() => setSize('theme-size-small')}>
					S
				</Button>
				<Button className="mx-4" onClick={() => setSize(undefined)}>
					M
				</Button>
				<Button className="mx-4" onClick={() => setSize('theme-size-large')}>
					L
				</Button>
				<div className="ml-5">Color:</div>
				{colors.map(color => (
					<div
						className={`${styles[`bg-${color}`]} ${currentColor === color ? 'border-2 border-theme-color' : ''} cursor-pointer ms-2 w-[30px] h-[30px]`}
						key={color}
						onClick={() => setColor(color)}></div>
				))}
				<div className="flex items-center ms-5">
					<Switch
						className="ms-3"
						text={isLightTheme ? 'Light' : 'Dark'}
						defaultChecked={isLightTheme}
						onCheckedChange={toggleTheme}
					/>
				</div>
			</div>
		</div>
	);
}
