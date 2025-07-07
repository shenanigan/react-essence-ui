import * as React from 'react';

import { cn } from '../../../../lib/utils';
import styles from './mail-tile.module.css';
import { useVariantContext } from '../context/variant-context';

export interface MailTileProps extends React.ComponentProps<'div'> {
	badge?: number | string;
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
							{badge && <div className={cn(styles['badge'], 'h5')}>{badge}</div>}
						</div>
					</div>
				);

			default:
				return (
					<div {...props} className={cn(styles['tile'], className)}>
						<div className={styles['preview-container']}>
							<div className={cn(styles['subject'], 'h4')}>{subject}</div>
							<div className={cn(styles['preview'], 'subtitle-1')}>{preview}</div>
						</div>
						<div className={cn(styles['icon-container'], 'h5')}>
							<img src={iconUrl} alt={subject} className={styles['icon']} />
							{badge && <div className={styles['badge']}>{badge}</div>}
						</div>
					</div>
				);
		}
	}, [badge, className, iconUrl, preview, props, subject, variant]);

	return tile;
}

export { MailTile };
