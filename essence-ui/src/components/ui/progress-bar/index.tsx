import { cn } from '@essence-ui/lib/utils';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
	value: number;
}

function ProgressBar({ value, className, ...props }: ProgressBarProps) {
	return (
		<div className={cn('bg-bar', className)} {...props}>
			<div className={'value-bar'} style={{ width: `${value}%` }}></div>
		</div>
	);
}

export { ProgressBar };
