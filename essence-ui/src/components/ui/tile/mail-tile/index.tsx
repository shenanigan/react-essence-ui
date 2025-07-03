import * as React from 'react';

import { cn } from '../../../../lib/utils';
import styles from './mail-tile.module.css';
import { useVariantContext } from '../context/variant-context';

export interface MailTileProps extends React.ComponentProps<'div'> {
	badge: number | string;
	subject: string;
	preview: string;
	iconUrl: string;
}
function MailTile({ className, badge, subject, preview, iconUrl, ...props }: MailTileProps) {
	const { variant } = useVariantContext();
	const tile = React.useMemo(() => {
		switch (variant) {
			case 'smallest':
				return (
					<div {...props} className={cn(styles['tile'], styles['smallest'], className)}>
						<img src={iconUrl} alt={subject} className={styles['icon']} />
						<div className={styles['badge-container']}>
							<div className={styles['badge']}>{badge}</div>
						</div>
					</div>
				);

			default:
				return (
					<div {...props} className={cn(styles['tile'], className)}>
						<div className={styles['preview-container']}>
							<div className={styles['subject']}>{subject}</div>
							<div className={styles['preview']}>{preview}</div>
						</div>
						<div className={styles['icon-container']}>
							<img src={iconUrl} alt={subject} className={styles['icon']} />
							<div className={styles['badge']}>{badge}</div>
						</div>
					</div>
				);
		}
	}, [badge, className, iconUrl, preview, props, subject, variant]);

	return tile;
}

export { MailTile };
