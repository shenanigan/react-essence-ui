import type { PropsWithChildren } from 'react';
import styles from './page.module.css';
import { cn } from '@essence-ui/lib/utils';

interface PageProps extends PropsWithChildren {
	title?: string | React.ReactNode;
	onTitleClick?: React.MouseEventHandler<HTMLDivElement>;
	className?: string;
	titleClassName?: string;
}

export default function Page({ title, onTitleClick, children, className, titleClassName }: PageProps) {
	return (
		<div className={cn(styles.component, className)}>
			{title && (
				<div className={cn(styles.title, titleClassName, 'h4')} onClick={onTitleClick}>
					{title}
				</div>
			)}
			<div className={styles.template}>{children}</div>
		</div>
	);
}
