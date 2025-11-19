import * as React from 'react';

import { cn } from '../../../../lib/utils';
import styles from './tile-container.module.css';
import { useEffect } from 'react';
import { Clickable } from '@essence-ui/components/core/clickable';

interface TileContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	frontTile: React.ReactNode;
	backTile: React.ReactNode;
	animationDuration?: number;
	onLongPress?: () => void;
}

function TileContainer({
	className,
	frontTile,
	backTile,
	onClick,
	animationDuration = 2500,
	onLongPress,
	...props
}: TileContainerProps) {
	const frontTileRef = React.useRef<HTMLDivElement>(null);
	const backTileRef = React.useRef<HTMLDivElement>(null);
	const [isRotated, setIsRotated] = React.useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsRotated(!isRotated);
		}, animationDuration);
		return () => {
			clearInterval(interval);
		};
	}, [isRotated, animationDuration]);

	return (
		<Clickable
			className={cn(styles['tile-container'])}
			onClick={onClick as (e: React.MouseEvent<HTMLElement>) => void}
			onLongPress={onLongPress}>
			<div {...props} className={cn(styles['tile-container'], className)}>
				<div className={cn(styles['tile'], isRotated && styles['rotated'])}>
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

export { TileContainer, type TileContainerProps };
