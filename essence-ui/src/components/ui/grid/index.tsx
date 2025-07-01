import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './grid.module.css';
import { Tile } from '../tile';
import { useCallback } from 'react';

export interface TileProps {
	frontTile: React.ReactNode;
	backTile: React.ReactNode;
	columnSpan?: 0.5 | 1 | 2 | 3 | 4;
	animationDuration?: number;
}

export interface GridProps extends React.ComponentProps<'div'> {
	tiles: TileProps[];
}

function Grid({ className, tiles, ...props }: GridProps) {
	const gridRef = React.useRef<HTMLDivElement>(null);

	const getTiles = useCallback((tiles: TileProps[]) => {
		console.log('tiles', tiles);
		const emptyTiles: React.ReactNode[] = [];
		let grid = React.createElement('div', { className: styles['tile-group'], children: emptyTiles });

		const newTiles = tiles.map((tile, i) => {
			const animationDuration = tile.animationDuration ?? Math.random() * (10000 - 4000) + 4000;
			console.log('animationDuration', animationDuration, tile.animationDuration);
			if (tile.columnSpan && tile.columnSpan < 1) {
				if (grid.props.children.length === 4) {
					grid = React.createElement('div', { className: styles['tile-group'], key: i, children: [] });
				}
				grid.props.children.push(
					<Tile
						key={i}
						{...tile}
						className={styles['tile-no-padding']}
						animationDuration={animationDuration}
						colSpan={tile.columnSpan ?? 1}
					/>,
				);
				if (grid.props.children.length === 1) {
					return grid;
				}
			} else {
				grid = React.createElement('div', { className: styles['tile-group'], key: i, children: [] });
				return <Tile key={i} {...tile} animationDuration={animationDuration} colSpan={tile.columnSpan ?? 1} />;
			}
		});

		return newTiles;
	}, []);

	return (
		<div ref={gridRef} className={cn(styles['grid'], className)} {...props}>
			{getTiles(tiles)}
		</div>
	);
}

export { Grid };
