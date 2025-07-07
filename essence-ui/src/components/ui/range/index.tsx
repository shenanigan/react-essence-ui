import { cn } from '@essence-ui/lib/utils';

function Range({ ...props }: React.ComponentProps<'input'>) {
	return <input {...props} type="range" className={cn('range-input', props.className)} />;
}

export { Range };
