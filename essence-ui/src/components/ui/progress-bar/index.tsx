import { cn } from '@essence-ui/lib/utils';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
	value: number;
}

function ProgressBar(props: ProgressBarProps) {
	return (
		<div {...props} className={cn('bg-bar', props.className)}>
			<div className={'value-bar'} style={{ width: `${props.value}%` }}></div>
		</div>
	);
}

export { ProgressBar };
