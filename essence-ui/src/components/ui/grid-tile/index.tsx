import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './tile.module.css';
import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTrash,
	faCircleArrowRight,
	faCircleArrowLeft,
	faAnglesDown,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Alert, type AlertProps } from '../alert';
import type { TileProps } from '../tile';
import { Tile } from '../tile';

export interface GridTileProps extends TileProps {
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	onMovePrevious?: () => void;
	onMoveNext?: () => void;
	onDelete?: () => void;
	onShowControls?: () => void;
	onLongPress?: () => void;
	showControls?: boolean;
	canShowControls?: boolean;
	colSpan?: 0.5 | 1 | 2 | 3 | 4;
	onSizeChanged?: (colSpan: 0.5 | 1 | 2 | 3 | 4) => void;
	deleteAlertProps?: AlertProps;
}

function GridTile({
	onClick,
	showControls = false,
	onShowControls,
	colSpan = 1,
	onSizeChanged,
	onMovePrevious,
	onMoveNext,
	onDelete,
	canShowControls = false,
	deleteAlertProps,
	onLongPress,
	...props
}: GridTileProps) {
	const [displayControls, setDisplayControls] = React.useState(showControls);
	const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
	const [style, setStyle] = React.useState<React.CSSProperties>({});

	useEffect(() => {
		// TODO: Not sure how but this works.
		if (colSpan === 4) {
			setStyle({
				width: `calc(25%  * ${colSpan})`,
				aspectRatio: `${colSpan} / ${1}`,
				position: 'relative',
			});
		} else if (colSpan === 1) {
			setStyle({
				width: `calc(25%  * ${colSpan} - (var(--gutter-margin-y) / 2))`,
				aspectRatio: `${colSpan} / ${1}`,
				position: 'relative',
			});
		} else if (colSpan === 2) {
			setStyle({
				width: `calc(25%  * ${colSpan} - (var(--gutter-margin-y) / 4))`,
				aspectRatio: `${colSpan} / ${1}`,
				position: 'relative',
			});
		} else if (colSpan === 3) {
			setStyle({
				width: `calc(25%  * ${colSpan} - (var(--gutter-margin-y) / 16))`,
				aspectRatio: `${colSpan} / ${1}`,
				position: 'relative',
			});
		} else if (colSpan >= 1) {
			setStyle({
				width: `calc(25%  * ${colSpan} - (var(--gutter-margin-y) / 4))`,
				aspectRatio: `${colSpan} / ${1}`,
				position: 'relative',
			});
		} else {
			setStyle({
				width: `calc(50% -  (var(--gutter-margin-y) / 4))`,
				height: `calc(50% -  (var(--gutter-margin-y) / 4))`,
				position: 'relative',
			});
		}
	}, [colSpan]);

	useEffect(() => {
		setDisplayControls(showControls);
	}, [showControls]);

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
		<div style={style}>
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
			<Tile
				{...props}
				onClick={onClicked}
				onLongPress={onLongPressed}
				style={{ width: '100%', height: '100%' }}
			/>
		</div>
	);
}

export { GridTile };
