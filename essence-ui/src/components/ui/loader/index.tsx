import { cn } from '@essence-ui/lib/utils';

function Loader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn('loader-bar', className)} {...props}>
			<span className={'loader-dot'}></span>
			<span className={'loader-dot'}></span>
			<span className={'loader-dot'}></span>
			<span className={'loader-dot'}></span>
			<span className={'loader-dot'}></span>
		</div>
	);
}

export { Loader };
