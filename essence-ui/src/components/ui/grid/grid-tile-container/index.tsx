import * as React from 'react';

import { cn } from '../../../../lib/utils';
import styles from './grid-tile-container.module.css';
import { useEffect, useLayoutEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTrash,
	faCircleArrowRight,
	faCircleArrowLeft,
	faAnglesDown,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Alert, type AlertProps } from '../../alert';
import { TileContainer, type TileContainerProps } from '../../tile/tile-container';
import { useVariantContext } from '../../tile/context/variant-context';

export interface GridTileProps extends TileContainerProps {
	tileHeight?: number;
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
	frontTile: React.ReactNode;
	backTile: React.ReactNode;
}
const sizeVariantMap: Record<0.5 | 1 | 2 | 3 | 4, 'smallest' | 'smaller' | 'medium' | 'larger' | 'largest'> = {
	0.5: 'smallest',
	1: 'smaller',
	2: 'medium',
	3: 'larger',
	4: 'largest',
};

const sizeArray: (0.5 | 1 | 2 | 3 | 4)[] = [0.5, 1, 2, 3, 4];

function GridTile({
	tileHeight,
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
	frontTile,
	backTile,
	...props
}: GridTileProps) {
	const [displayControls, setDisplayControls] = React.useState(showControls);
	const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
	const ref = React.useRef<HTMLDivElement>(null);
	const [isMobile, setIsMobile] = React.useState(false);
	const [colSpanState, setColSpanState] = React.useState(colSpan);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		setIsMobile(window.innerWidth < 768);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (isMobile) {
			setColSpanState(Math.min(colSpan, 2) as 0.5 | 1 | 2);
		} else {
			setColSpanState(colSpan);
		}
	}, [colSpan, isMobile]);

	const { setVariant } = useVariantContext();

	useLayoutEffect(() => {
		setVariant(sizeVariantMap[colSpanState]);

		if (ref.current) {
			ref.current.style.gridColumn = `span ${colSpanState}`;
			ref.current.style.position = 'relative';
			if (tileHeight) {
				ref.current.style.height = `${tileHeight}px`;
			}
		}
	}, [colSpanState, setVariant, tileHeight, isMobile]);

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

		const currentIndex = sizeArray.indexOf(colSpanState);
		if (currentIndex === sizeArray.length - 1) {
			return;
		}

		const nextSize = sizeArray[currentIndex + 1];
		if (isMobile && nextSize === 3) {
			return;
		}

		setVariant(sizeVariantMap[nextSize]);
		onSizeChanged?.(nextSize);
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
		const currentIndex = sizeArray.indexOf(colSpanState);
		if (currentIndex === 0) {
			return;
		}
		const nextSize = sizeArray[currentIndex - 1];
		setVariant(sizeVariantMap[nextSize]);
		onSizeChanged?.(nextSize);
	};

	const onCloseClicked = () => {};
	return (
		<div ref={ref}>
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

					{colSpanState > 0.5 && (
						<div className={cn(styles['control'])} onClick={onCollapseClicked}>
							<FontAwesomeIcon icon={faAnglesDown} className={styles['collapse-control']} />
							<div style={{ fontSize: '10px' }}>Collapse</div>
						</div>
					)}
					{((!isMobile && colSpanState < 4) || (isMobile && colSpanState < 2)) && (
						<div className={cn(styles['control'])} onClick={onExpandClicked}>
							<FontAwesomeIcon icon={faAnglesDown} className={styles['expand-control']} />
							<div style={{ fontSize: '10px' }}>Expand</div>
						</div>
					)}
					<div className={cn(styles['control'], styles['delete-control'])} onClick={onDeleteClicked}>
						<FontAwesomeIcon icon={faTrash} />
						<div style={{ fontSize: '10px' }}>Delete</div>
					</div>

					{colSpanState === 0.5 && (
						<div className={cn(styles['control'])} onClick={onCloseClicked}>
							<FontAwesomeIcon icon={faXmark} className={styles['close-control']} />
							<div style={{ fontSize: '10px' }}>Close</div>
						</div>
					)}
				</div>
			)}
			<TileContainer
				{...props}
				frontTile={frontTile}
				backTile={backTile}
				onClick={onClicked}
				onLongPress={onLongPressed}
			/>
		</div>
	);
}

export { GridTile };
