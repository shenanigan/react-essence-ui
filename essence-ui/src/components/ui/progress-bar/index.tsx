import styles from './progress-bar.module.css';
import { cn } from '@essence-ui/lib/utils';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
	value: number;
}

function ProgressBar({ value, className, ...props }: ProgressBarProps) {
	return (
		<div className={cn(styles['bkg-bar'], className)} {...props}>
			<div className={styles['value-bar']} style={{ width: `${value}%` }}></div>
		</div>
	);
}

export { ProgressBar };
