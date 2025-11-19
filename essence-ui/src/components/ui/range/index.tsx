import { cn } from '@essence-ui/lib/utils';

function Range({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
	return <input {...props} type="range" className={cn('range-input', props.className)} />;
}

export { Range };
