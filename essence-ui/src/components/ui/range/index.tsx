import styles from './range.module.css';
import { cn } from '@essence-ui/lib/utils';

function Range({ ...props }: React.ComponentProps<'input'>) {
	return <input {...props} type="range" className={cn(styles['range-input'], props.className)} />;
}

export { Range };
