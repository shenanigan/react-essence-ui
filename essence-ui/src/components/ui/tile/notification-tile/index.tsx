import * as React from 'react';

import { cn } from '../../../../lib/utils';
import styles from './notification-tile.module.css';
import { useVariantContext } from '../context/variant-context';

export interface NotificationTileProps extends React.ComponentProps<'div'> {
	badge: number | string;
	title: string;
	iconUrl: string;
}
function NotificationTile({ className, badge, title, iconUrl, ...props }: NotificationTileProps) {
	const { variant } = useVariantContext();
	const tile = React.useMemo(() => {
		switch (variant) {
			case 'smallest':
				return (
					<div {...props} className={cn(styles['tile'], styles['smallest'], className)}>
						<img src={iconUrl} alt={title} className={styles['icon']} />
						<div className={styles['badge-container']}>
							<div className={styles['badge']}>{badge}</div>
						</div>
					</div>
				);

			default:
				return (
					<div {...props} className={cn(styles['tile'], className)}>
						<div className={styles['icon-container']}>
							<img src={iconUrl} alt={title} className={styles['icon']} />
						</div>
						<div className={styles['info-container']}>
							<div className={styles['title']}>{title}</div>
							<div className={styles['badge']}>{badge}</div>
						</div>
					</div>
				);
		}
	}, [badge, className, iconUrl, props, title, variant]);

	return tile;
}

export { NotificationTile };
