import type { PropsWithChildren } from 'react';
import styles from './picker-overlay.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

interface Props extends PropsWithChildren {
	onAccept: React.MouseEventHandler<SVGSVGElement>;
	onReject: React.MouseEventHandler<SVGSVGElement>;
	showActionButtons?: boolean;
	showAcceptButton?: boolean;
	showRejectButton?: boolean;
}
function PickerOverlay({
	children,
	onAccept,
	onReject,
	showActionButtons = true,
	showAcceptButton = true,
	showRejectButton = true,
}: Props) {
	return (
		<div className={styles['picker-overlay']}>
			{children}
			{showActionButtons && (
				<div className={styles['action-bar']}>
					{showAcceptButton && (
						<FontAwesomeIcon className={styles['action-icon']} icon={faCircleCheck} onClick={onAccept} />
					)}
					{showRejectButton && (
						<FontAwesomeIcon className={styles['action-icon']} icon={faCircleXmark} onClick={onReject} />
					)}
				</div>
			)}
		</div>
	);
}

export { PickerOverlay };
