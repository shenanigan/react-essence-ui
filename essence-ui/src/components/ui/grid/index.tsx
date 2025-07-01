import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './grid.module.css';
import { GridTile, type GridTileProps } from '../grid-tile';
import { useCallback } from 'react';
import type { Key } from 'react';

export interface GridProps extends React.ComponentProps<'div'> {
	tiles: GridTileProps[];
	onTileSizeChanged?: (key: Key | null | undefined, colSpan: 0.5 | 1 | 2 | 3 | 4, tiles?: GridTileProps[]) => void;
	onTileMovePrevious?: (key: Key | null | undefined, tiles?: GridTileProps[]) => void;
	onTileMoveNext?: (key: Key | null | undefined, tiles?: GridTileProps[]) => void;
	onTileDelete?: (key: Key | null | undefined, tiles?: GridTileProps[]) => void;
}

function Grid({
	className,
	tiles,
	onTileSizeChanged,
	onTileMovePrevious,
	onTileMoveNext,
	onTileDelete,
	...props
}: GridProps) {
	const gridRef = React.useRef<HTMLDivElement>(null);
	const [tilesState, setTilesState] = React.useState<GridTileProps[]>(tiles);

	const onSizeChanged = useCallback(
		(key: Key | null | undefined, colSpan: 0.5 | 1 | 2 | 3 | 4) => {
			const newTiles = tilesState.map(t => {
				if (t.key === key) {
					return { ...t, colSpan: colSpan };
				}
				return t;
			});
			setTilesState(newTiles);
			onTileSizeChanged?.(key, colSpan, newTiles);
		},
		[tilesState, onTileSizeChanged],
	);

	const onMovePrevious = useCallback(
		(key: Key | null | undefined) => {
			const index = tilesState.findIndex(t => t.key === key);
			if (index === 0) return;
			const newTiles = [...tilesState];
			const temp = newTiles[index - 1];
			newTiles[index - 1] = newTiles[index];
			newTiles[index] = temp;
			setTilesState(newTiles);
			onTileMovePrevious?.(key, newTiles);
		},
		[tilesState, onTileMovePrevious],
	);

	const onMoveNext = useCallback(
		(key: Key | null | undefined) => {
			const index = tilesState.findIndex(t => t.key === key);
			if (index === tilesState.length - 1) return;
			const newTiles = [...tilesState];
			const temp = newTiles[index + 1];
			newTiles[index + 1] = newTiles[index];
			newTiles[index] = temp;
			setTilesState(newTiles);
			onTileMoveNext?.(key, newTiles);
		},
		[tilesState, onTileMoveNext],
	);

	const onDelete = useCallback(
		(key: Key | null | undefined) => {
			const newTiles = tilesState.filter(t => t.key !== key);
			setTilesState(newTiles);
			onTileDelete?.(key, newTiles);
		},
		[tilesState, onTileDelete],
	);

	const onShowControls = useCallback(
		(key: Key | null | undefined) => {
			const newTiles = tilesState.map(t => {
				if (t.key === key) {
					return { ...t, showControls: true };
				}
				return { ...t, showControls: false };
			});
			setTilesState(newTiles);
		},
		[tilesState],
	);

	const getTiles = useCallback(() => {
		const emptyTiles: React.ReactNode[] = [];
		let grid = React.createElement('div', { className: styles['tile-group'], key: -1, children: emptyTiles });

		const newTiles = tilesState.map(tile => {
			const animationDuration = tile.animationDuration ?? Math.random() * (10000 - 4000) + 4000;
			if (tile.colSpan && tile.colSpan < 1) {
				if (grid.props.children.length === 4) {
					grid = React.createElement('div', {
						className: styles['tile-group'],
						key: Math.random(),
						children: [],
					});
				}
				grid.props.children.push(
					<GridTile
						{...tile}
						key={tile.key}
						className={styles['tile-no-padding']}
						animationDuration={animationDuration}
						onSizeChanged={colSpan => {
							onSizeChanged(tile.key, colSpan);
						}}
						onMovePrevious={() => onMovePrevious(tile.key)}
						onMoveNext={() => onMoveNext(tile.key)}
						onDelete={() => onDelete(tile.key)}
						onShowControls={() => onShowControls(tile.key)}
						canShowControls={tile.canShowControls ?? true}
					/>,
				);
				if (grid.props.children.length === 1) {
					return grid;
				}
			} else {
				grid = React.createElement('div', {
					className: styles['tile-group'],
					key: Math.random(),
					children: [],
				});
				return (
					<GridTile
						{...tile}
						key={tile.key}
						onSizeChanged={colSpan => {
							onSizeChanged(tile.key, colSpan);
						}}
						animationDuration={animationDuration}
						onMovePrevious={() => onMovePrevious(tile.key)}
						onMoveNext={() => onMoveNext(tile.key)}
						onDelete={() => onDelete(tile.key)}
						onShowControls={() => onShowControls(tile.key)}
						canShowControls={tile.canShowControls ?? true}
					/>
				);
			}
		});

		return newTiles;
	}, [onDelete, onMoveNext, onMovePrevious, onShowControls, onSizeChanged, tilesState]);

	return (
		<div ref={gridRef} className={cn(styles['grid'], className)} {...props}>
			{getTiles()}
		</div>
	);
}

export { Grid };
