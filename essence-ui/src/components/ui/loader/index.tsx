import { cn } from '@essence-ui/lib/utils';

function Loader(props: React.ComponentProps<'div'>) {
	return (
		<div {...props} className={cn('loader-bar', props.className)}>
			<span className={'loader-dot'}></span>
			<span className={'loader-dot'}></span>
			<span className={'loader-dot'}></span>
			<span className={'loader-dot'}></span>
			<span className={'loader-dot'}></span>
		</div>
	);
}

export { Loader };
