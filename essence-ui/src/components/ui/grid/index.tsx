import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './grid.module.css';
import { GridTile, type GridTileProps } from './grid-tile-container';
import { useCallback, useEffect, useMemo } from 'react';
import type { Key } from 'react';
import { VariantProvider } from '../tile/context/variant-provider';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
	tiles: GridTileProps[];
	onTileSizeChanged?: (
		key: Key | null | undefined,
		variant: 'smallest' | 'smaller' | 'medium' | 'large' | 'largest',
		tiles: GridTileProps[],
	) => void;
	onTileMovePrevious?: (key: Key | null | undefined, tiles: GridTileProps[]) => void;
	onTileMoveNext?: (key: Key | null | undefined, tiles: GridTileProps[]) => void;
	onTileDelete?: (key: Key | null | undefined, tiles: GridTileProps[]) => void;
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
	const measureTileRef = React.useRef<HTMLDivElement>(null);
	const [tileHeight, setTileHeight] = React.useState(0);

	useEffect(() => {
		setTilesState(tiles);
	}, [tiles]);

	useEffect(() => {
		if (measureTileRef.current) {
			const width = measureTileRef.current.getBoundingClientRect().width;
			setTileHeight(width);
		}

		const handleResize = () => {
			if (measureTileRef.current) {
				measureTileRef.current.style.position = 'relative';
				const width = measureTileRef.current.getBoundingClientRect().width;
				setTileHeight(width);
				measureTileRef.current.style.position = 'absolute';
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (measureTileRef.current && tileHeight > 0) {
			measureTileRef.current.style.position = 'absolute';
		}
	}, [tileHeight]);

	const onSizeChanged = useCallback(
		(key: Key | null | undefined, colSpan: 0.5 | 1 | 2 | 3 | 4) => {
			const variant =
				colSpan === 4
					? 'largest'
					: colSpan === 3
						? 'large'
						: colSpan === 2
							? 'medium'
							: colSpan === 1
								? 'smaller'
								: 'smallest';
			const newTiles = tilesState.map(t => {
				if (t.key === key) {
					return { ...t, variant: variant, colSpan: colSpan };
				}
				return t;
			});
			setTilesState(newTiles);

			onTileSizeChanged?.(key, variant, newTiles);
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

	const getTiles = useMemo(() => {
		const emptyTiles: React.ReactNode[] = [];
		let grid = React.createElement('div', {
			className: styles['tile-group'],
			key: -1,
			children: emptyTiles,
			style: {
				height: `${tileHeight}px`,
			},
		});

		const newTiles = tilesState.map(tile => {
			const animationDuration = tile.animationDuration ?? Math.random() * (10000 - 4000) + 4000;
			if (tile.colSpan && tile.colSpan < 1) {
				if (grid.props.children.length === 4) {
					grid = React.createElement('div', {
						className: styles['tile-group'],
						key: Math.random(),
						children: [],
						style: {
							height: `${tileHeight}px`,
						},
					});
				}
				grid.props.children.push(
					<VariantProvider key={tile.key}>
						<GridTile
							{...tile}
							key={tile.key}
							animationDuration={animationDuration}
							onSizeChanged={colSpan => {
								onSizeChanged(tile.key, colSpan);
							}}
							onMovePrevious={() => onMovePrevious(tile.key)}
							onMoveNext={() => onMoveNext(tile.key)}
							onDelete={() => onDelete(tile.key)}
							onShowControls={() => onShowControls(tile.key)}
							canShowControls={tile.canShowControls ?? true}
						/>
					</VariantProvider>,
				);
				if (grid.props.children.length === 1) {
					return grid;
				}
			} else {
				grid = React.createElement('div', {
					className: styles['tile-group'],
					key: Math.random(),
					children: [],
					style: {
						height: `${tileHeight}px`,
					},
				});
				return (
					<VariantProvider key={tile.key}>
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
							tileHeight={tileHeight}
						/>
					</VariantProvider>
				);
			}
		});

		return newTiles;
	}, [tileHeight, tilesState, onSizeChanged, onMovePrevious, onMoveNext, onDelete, onShowControls]);

	return (
		<div ref={gridRef} className={cn(styles['grid'], className)} {...props}>
			<div className={cn(styles['measure-tile'], styles['tile'])} ref={measureTileRef} />
			{getTiles}
		</div>
	);
}

export { Grid };
