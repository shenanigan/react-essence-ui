import styles from './loader.module.css';
import { cn } from '@essence-ui/lib/utils';

function Loader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn(styles['loader-bar'], className)} {...props}>
			<span className={styles['loader-dot']}></span>
			<span className={styles['loader-dot']}></span>
			<span className={styles['loader-dot']}></span>
			<span className={styles['loader-dot']}></span>
			<span className={styles['loader-dot']}></span>
		</div>
	);
}

export { Loader };
