import type { PropsWithChildren } from 'react';
import styles from './picker-overlay.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

interface Props extends PropsWithChildren {
	onAccept: React.MouseEventHandler<SVGSVGElement>;
	onReject: React.MouseEventHandler<SVGSVGElement>;
}
function PickerOverlay({ children, onAccept, onReject }: Props) {
	return (
		<div className={styles['picker-overlay']}>
			{children}
			<div className={styles['action-bar']}>
				<FontAwesomeIcon className={styles['action-icon']} icon={faCircleCheck} onClick={onAccept} />
				<FontAwesomeIcon className={styles['action-icon']} icon={faCircleXmark} onClick={onReject} />
			</div>
		</div>
	);
}

export { PickerOverlay };
