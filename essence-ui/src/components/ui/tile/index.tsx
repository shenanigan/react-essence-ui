import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './tile.module.css';
import { useEffect } from 'react';
import Clickable from '@essence-ui/components/core/clickable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTrash,
	faCircleArrowRight,
	faCircleArrowLeft,
	faAnglesDown,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Alert, type AlertProps } from '../alert';

export interface TileProps extends React.ComponentProps<'div'> {
	frontTile: React.ReactNode;
	backTile: React.ReactNode;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	onMovePrevious?: () => void;
	onMoveNext?: () => void;
	onDelete?: () => void;
	onShowControls?: () => void;
	onLongPress?: () => void;
	showControls?: boolean;
	canShowControls?: boolean;
	animationDuration?: number;
	colSpan?: 0.5 | 1 | 2 | 3 | 4;
	onSizeChanged?: (colSpan: 0.5 | 1 | 2 | 3 | 4) => void;
	deleteAlertProps?: AlertProps;
}

function Tile({
	className,
	frontTile,
	backTile,
	onClick,
	showControls = false,
	onShowControls,
	animationDuration = 2500,
	colSpan = 1,
	onSizeChanged,
	onMovePrevious,
	onMoveNext,
	onDelete,
	canShowControls = false,
	deleteAlertProps,
	onLongPress,
	...props
}: TileProps) {
	const tileRef = React.useRef<HTMLDivElement>(null);
	const frontTileRef = React.useRef<HTMLDivElement>(null);
	const backTileRef = React.useRef<HTMLDivElement>(null);
	const [isRotated, setIsRotated] = React.useState(false);
	const [displayControls, setDisplayControls] = React.useState(showControls);
	const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);

	useEffect(() => {
		if (tileRef.current && colSpan >= 1) {
			tileRef.current.style.width = `calc(25%  * ${colSpan})`;
			tileRef.current.style.aspectRatio = `${colSpan} / ${1}`;
		}
	}, [colSpan]);

	useEffect(() => {
		setDisplayControls(showControls);
	}, [showControls]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (displayControls) return;
			setIsRotated(!isRotated);
		}, animationDuration);
		return () => {
			clearInterval(interval);
		};
	}, [isRotated, animationDuration, displayControls]);

	const onLongPressed = () => {
		if (canShowControls) {
			onShowControls?.();
			setDisplayControls(true);
		}
		onLongPress?.();
	};

	const onExpandClicked = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		e.preventDefault();
		if (colSpan === 4) {
			onSizeChanged?.(0.5);
		} else if (colSpan === 0.5) {
			onSizeChanged?.(1);
		} else if (colSpan === 1) {
			onSizeChanged?.(2);
		} else if (colSpan === 2) {
			onSizeChanged?.(3);
		} else if (colSpan === 3) {
			onSizeChanged?.(4);
		}
	};

	const onMovePreviousClicked = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		e.preventDefault();
		onMovePrevious?.();
	};

	const onMoveNextClicked = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		e.preventDefault();
		onMoveNext?.();
	};

	const onDeleteClicked = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		e.preventDefault();
		if (deleteAlertProps) {
			setShowDeleteAlert(true);
		} else {
			onDelete?.();
		}
	};

	const onHideControls = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		setDisplayControls(false);
	};

	const onDeleteConfirmed = () => {
		setShowDeleteAlert(false);
		onDelete?.();
	};

	const onClicked = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		console.log('onClicked', displayControls);
		if (displayControls) {
			onHideControls(e);
		} else {
			onClick?.(e);
		}
	};

	const onCollapseClicked = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		e.preventDefault();
		if (colSpan === 4) {
			onSizeChanged?.(3);
		} else if (colSpan === 0.5) {
			onSizeChanged?.(4);
		} else if (colSpan === 1) {
			onSizeChanged?.(0.5);
		} else if (colSpan === 2) {
			onSizeChanged?.(1);
		} else if (colSpan === 3) {
			onSizeChanged?.(2);
		}
	};

	const onCloseClicked = () => {};
	return (
		<div ref={tileRef} className={cn(styles['tile-container'], className)}>
			{showDeleteAlert && deleteAlertProps && (
				<Alert {...deleteAlertProps} onOk={onDeleteConfirmed} onDismiss={() => setShowDeleteAlert(false)} />
			)}
			{displayControls && (
				<div className={styles['controls']} onClick={onHideControls}>
					<div
						className={cn(styles['control'], styles['move-previous-control'])}
						onClick={onMovePreviousClicked}>
						<FontAwesomeIcon icon={faCircleArrowLeft} />
						<div style={{ fontSize: '10px' }}>Move</div>
					</div>
					<div className={cn(styles['control'], styles['move-next-control'])} onClick={onMoveNextClicked}>
						<FontAwesomeIcon icon={faCircleArrowRight} />
						<div style={{ fontSize: '10px' }}>Move</div>
					</div>

					{colSpan > 0.5 && (
						<div className={cn(styles['control'])} onClick={onCollapseClicked}>
							<FontAwesomeIcon icon={faAnglesDown} className={styles['collapse-control']} />
							<div style={{ fontSize: '10px' }}>Collapse</div>
						</div>
					)}
					{colSpan < 4 && (
						<div className={cn(styles['control'])} onClick={onExpandClicked}>
							<FontAwesomeIcon icon={faAnglesDown} className={styles['expand-control']} />
							<div style={{ fontSize: '10px' }}>Expand</div>
						</div>
					)}
					<div className={cn(styles['control'], styles['delete-control'])} onClick={onDeleteClicked}>
						<FontAwesomeIcon icon={faTrash} />
						<div style={{ fontSize: '10px' }}>Delete</div>
					</div>

					{colSpan === 0.5 && (
						<div className={cn(styles['control'])} onClick={onCloseClicked}>
							<FontAwesomeIcon icon={faXmark} className={styles['close-control']} />
							<div style={{ fontSize: '10px' }}>Close</div>
						</div>
					)}
				</div>
			)}
			<Clickable className={styles['clickable-container']} onClick={onClicked} onLongPress={onLongPressed}>
				<div className="w-full h-full relative">
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
		</div>
	);
}

export { Tile };
