import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './tile.module.css';
import { useEffect } from 'react';
import Clickable from '@essence-ui/components/core/clickable';

export interface TileProps extends React.ComponentProps<'div'> {
	frontTile: React.ReactNode;
	backTile: React.ReactNode;
	onClick?: () => void;
	animationDuration?: number;
	colSpan?: number;
}

function Tile({ className, frontTile, backTile, onClick, animationDuration = 2500, colSpan = 1, ...props }: TileProps) {
	const tileRef = React.useRef<HTMLButtonElement>(null);
	const frontTileRef = React.useRef<HTMLDivElement>(null);
	const backTileRef = React.useRef<HTMLDivElement>(null);
	const [isRotated, setIsRotated] = React.useState(false);

	useEffect(() => {
		if (tileRef.current && colSpan >= 1) {
			tileRef.current.style.width = `calc(25%  * ${colSpan})`;
			tileRef.current.style.aspectRatio = `${colSpan} / ${1}`;
		}
	}, [colSpan]);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsRotated(!isRotated);
		}, animationDuration);
		return () => {
			clearInterval(interval);
		};
	}, [isRotated, animationDuration]);

	return (
		<Clickable className={cn(styles['tile-container'], className)} onClick={onClick} ref={tileRef}>
			<div className="w-full h-full">
				<div {...props} className={cn(styles['tile'], isRotated && styles['rotated'])}>
					<div ref={frontTileRef} className={styles['front-tile']}>
						{frontTile}
					</div>
					<div ref={backTileRef} className={styles['back-tile']}>
						{backTile}
					</div>
				</div>
			</div>
		</Clickable>
	);
}

export { Tile };
