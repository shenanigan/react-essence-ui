import { transformScale, transformRotation } from './util/transform.service';
import styles from './clickable.module.css';
import React, { type PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

function Clickable({
	onEnterOrSpaceKeyDown,
	onLongPress,
	...props
}: PropsWithChildren<
	React.ComponentProps<'button'> & {
		onEnterOrSpaceKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
		onLongPress?: () => void;
	}
>) {
	const ref = React.useRef<HTMLButtonElement>(null);
	const [pressTimer, setPressTimer] = React.useState<number | null>(null);
	const [isLongPressed, setIsLongPressed] = React.useState(false);
	const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onEnterOrSpaceKeyDown?.(e);
			transformScale(e.target as HTMLElement, 0.98);
			setTimeout(() => {
				transformScale(e.target as HTMLElement, 1);
			}, 100);
		}
		props?.onKeyDown?.(e);
		setPressTimer(
			window.setTimeout(() => {
				setIsLongPressed(true);
				onLongPress?.();
			}, 1000),
		);
	};
	const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
		if (props?.disabled) return;
		transformScale(event.currentTarget, 0.98);
	};

	const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
		if (props?.disabled) return;
		event.preventDefault();
		setPressTimer(
			window.setTimeout(() => {
				setIsLongPressed(true);
				onLongPress?.();
			}, 700),
		);
		transformScale(event.currentTarget, 0.98);
	};

	const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
		if (props?.disabled) return;
		transformScale(event.currentTarget, 1);
		transformRotation(event.currentTarget as HTMLElement, 0, 0);
	};

	const handleMouseUp = (event: React.MouseEvent<HTMLElement>) => {
		if (props?.disabled) return;
		event.preventDefault();
		if (isLongPressed) {
			setIsLongPressed(false);
		}
		transformScale(event.currentTarget, 1);
		transformRotation(event.currentTarget as HTMLElement, 0, 0);
		if (pressTimer) {
			clearTimeout(pressTimer);
		}
	};

	const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
		if (props?.disabled) return;
		event.preventDefault();
		transformScale(event.currentTarget, 1);
		transformRotation(event.currentTarget as HTMLElement, 0, 0);
	};

	const handleMouseMove = ($event: React.MouseEvent<HTMLElement>) => {
		if (props?.disabled) return;

		$event.preventDefault();
		if (pressTimer) {
			clearTimeout(pressTimer);
		}
		transformRotation($event.currentTarget as HTMLElement, 0, 0);

		if ($event.currentTarget) {
			// Get the specific element on which the mouse moves
			let element = $event.target as HTMLElement;

			// Get the offset x & y of the mouse within that specific element
			let offsetX = $event.nativeEvent.offsetX;
			let offsetY = $event.nativeEvent.offsetY;

			// Calculate the x & y for the parent divs till we hit the main parent to which
			// the wp-clickable attribute is added
			while (element && element !== $event.currentTarget) {
				offsetX += element.offsetLeft;
				offsetY += element.offsetTop;
				if (element.parentNode) {
					element = element.parentNode as HTMLElement;
				} else {
					break;
				}
			}

			// Get the height & width of the container div
			const height = $event.currentTarget.offsetHeight;
			const width = $event.currentTarget.offsetWidth;

			const XMULTIPLIER = 3 / height;
			const YMULTIPLIER = 3 / width;

			const MAX_X_DEG = 16 / height;
			const MAX_Y_DEG = 16 / width;

			let finalXRotation = 0;
			const calculatedXRotation = (XMULTIPLIER * (offsetY - height / 2)) / height;
			// We want to limit the max degrees of rotation for X
			if (calculatedXRotation > 0) {
				finalXRotation = -1 * Math.min(MAX_X_DEG, calculatedXRotation);
			} else {
				finalXRotation = -1 * Math.max(-1 * MAX_X_DEG, calculatedXRotation);
			}

			let finalYRotation = 0;
			// We want to limit the max degrees of rotation for Y
			const calculatedYRotation = (YMULTIPLIER * (offsetX - width / 2)) / width;
			if (calculatedYRotation > 0) {
				finalYRotation = Math.min(MAX_Y_DEG, calculatedYRotation);
			} else {
				finalYRotation = Math.max(-1 * MAX_Y_DEG, calculatedYRotation);
			}

			// Apply the transform to the first child div which will be the clickable container.
			transformRotation($event.currentTarget as HTMLElement, finalXRotation, finalYRotation);
		}
	};

	const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
		setIsLongPressed(true);
		if (onLongPress) {
			event.preventDefault();
			onLongPress();
		}
	};

	if (React.isValidElement(props.children)) {
		return (
			<button
				ref={ref}
				{...props}
				data-slot="button"
				tabIndex={props?.disabled ? -1 : 0}
				onKeyDown={handleKeyDown}
				className={cn(styles['clickable'], props?.disabled && styles['disabled'], props?.className)}>
				{React.cloneElement(
					props.children as React.ReactElement<{
						onMouseUp?: (e: React.MouseEvent<HTMLElement>) => void;
						onMouseDown?: (e: React.MouseEvent<HTMLElement>) => void;
						onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
						onMouseMove?: (e: React.MouseEvent<HTMLElement>) => void;
						onTouchStart?: (e: React.TouchEvent<HTMLElement>) => void;
						onTouchEnd?: (e: React.TouchEvent<HTMLElement>) => void;
						onContextMenu?: (e: React.MouseEvent<HTMLElement>) => void;
					}>,
					{
						onMouseUp: handleMouseUp,
						onMouseDown: handleMouseDown,
						onMouseLeave: handleMouseLeave,
						onMouseMove: handleMouseMove,
						onTouchStart: handleTouchStart,
						onTouchEnd: handleTouchEnd,
						onContextMenu: handleContextMenu,
					},
				)}
			</button>
		);
	}
	return props.children;
}

export default Clickable;
