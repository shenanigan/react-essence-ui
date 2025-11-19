import { Button } from '@essence-ui/components/ui/button';
import { cn } from '@essence-ui/lib/utils';

export interface AlertInfo {
	show: boolean;
	message: string;
}
export interface AlertProps extends React.HTMLAttributes<HTMLButtonElement> {
	message: string;
	okButton: string;
	dismissButton?: string;
	onOk?: React.MouseEventHandler<HTMLButtonElement>;
	onDismiss?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}
function Alert({ onOk, onDismiss, message, okButton, dismissButton, ...props }: AlertProps) {
	return (
		<>
			<div className={'alert-overlay'} onClick={onDismiss} />
			<div className={'alert'}>
				<div className={cn('message', 'h5')}>{message}</div>
				<div className={'alert-buttons-container'}>
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
