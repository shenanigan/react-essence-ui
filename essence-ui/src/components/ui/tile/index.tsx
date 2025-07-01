import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './tile.module.css';
import { useEffect } from 'react';
import Clickable from '@essence-ui/components/core/clickable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleChevronLeft,
	faCircleChevronRight,
	faTrash,
	faUpRightAndDownLeftFromCenter,
	faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Alert, type AlertProps } from '../alert';

export interface TileProps extends React.ComponentProps<'div'> {
	frontTile: React.ReactNode;
	backTile: React.ReactNode;
	onClick?: () => void;
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
	const tileRef = React.useRef<HTMLButtonElement>(null);
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

	const onExpandClicked = () => {
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

	const onMovePreviousClicked = () => {
		onMovePrevious?.();
	};

	const onMoveNextClicked = () => {
		onMoveNext?.();
	};

	const onDeleteClicked = () => {
		if (deleteAlertProps) {
			setShowDeleteAlert(true);
		} else {
			onDelete?.();
		}
	};

	const onHideControls = () => {
		setDisplayControls(false);
	};

	const onDeleteConfirmed = () => {
		setShowDeleteAlert(false);
		onDelete?.();
	};

	return (
		<>
			{showDeleteAlert && deleteAlertProps && (
				<Alert {...deleteAlertProps} onOk={onDeleteConfirmed} onDismiss={() => setShowDeleteAlert(false)} />
			)}
			<Clickable
				className={cn(styles['tile-container'], className)}
				onClick={onClick}
				ref={tileRef}
				animate={!displayControls}
				onLongPress={onLongPressed}>
				<div className="w-full h-full relative">
					{displayControls && (
						<div className={styles['controls']}>
							<div
								className={cn(styles['control'], styles['move-previous-control'])}
								onClick={onMovePreviousClicked}>
								<FontAwesomeIcon icon={faCircleChevronLeft} />
							</div>
							<div
								className={cn(styles['control'], styles['move-next-control'])}
								onClick={onMoveNextClicked}>
								<FontAwesomeIcon icon={faCircleChevronRight} />
							</div>
							<div className={cn(styles['control'], styles['delete-control'])} onClick={onDeleteClicked}>
								<FontAwesomeIcon icon={faTrash} />
							</div>
							<div className={cn(styles['control'], styles['expand-control'])} onClick={onExpandClicked}>
								<FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
							</div>
							<div className={cn(styles['control'], styles['close-control'])} onClick={onHideControls}>
								<FontAwesomeIcon icon={faCircleXmark} />
							</div>
						</div>
					)}
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
		</>
	);
}

export { Tile };
