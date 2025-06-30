import type { PropsWithChildren } from 'react';
import styles from './page.module.css';

interface PageProps extends PropsWithChildren {
	title?: string | React.ReactNode;
	onTitleClick?: React.MouseEventHandler<HTMLDivElement>;
	className?: string;
	titleClassName?: string;
}

export default function Page({ title, onTitleClick, children, className, titleClassName }: PageProps) {
	return (
		<div className={`${styles.component} ${className ?? ''}`}>
			{title && (
				<div className={`${styles.title} ${titleClassName ?? ''}`} onClick={onTitleClick}>
					{title}
				</div>
			)}
			<div className={styles.template}>{children}</div>
		</div>
	);
}
