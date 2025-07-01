import { Button } from '@essence-ui/components/ui/button';
import styles from './alert.module.css';

export interface AlertInfo {
	show: boolean;
	message: string;
}
export interface AlertProps extends React.ComponentProps<'button'> {
	message: string;
	okButton: string;
	dismissButton?: string;
	onOk?: React.MouseEventHandler<HTMLButtonElement>;
	onDismiss?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}
function Alert({ onOk, onDismiss, message, okButton, dismissButton, ...props }: AlertProps) {
	return (
		<>
			<div className={styles.overlay} onClick={onDismiss} />
			<div className={styles.alert}>
				<div className={styles['txt-message']}>{message}</div>
				<div className={styles['buttons-container']}>
					{dismissButton && (
						<Button {...props} onClick={onDismiss}>
							{dismissButton}
						</Button>
					)}
					{okButton && (
						<Button {...props} onClick={onOk}>
							{okButton}
						</Button>
					)}
				</div>
			</div>
		</>
	);
}

export { Alert };
