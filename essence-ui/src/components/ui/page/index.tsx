import type { PropsWithChildren } from 'react';
import { cn } from '@essence-ui/lib/utils';

interface PageProps extends PropsWithChildren {
	title?: string | React.ReactNode;
	onTitleClick?: React.MouseEventHandler<HTMLDivElement>;
	className?: string;
	titleClassName?: string;
}

export default function Page({ title, onTitleClick, children, className, titleClassName }: PageProps) {
	return (
		<div className={cn('page-component', className)}>
			{title && (
				<div className={cn('page-title', 'h3', titleClassName)} onClick={onTitleClick}>
					{title}
				</div>
			)}
			<div className={'page-template'}>{children}</div>
		</div>
	);
}
