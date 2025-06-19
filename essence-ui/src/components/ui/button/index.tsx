import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './button.module.css';
import Clickable from '../../core/clickable';

function Button({ ...props }: React.ComponentProps<'button'>) {
	return (
		<Clickable {...props}>
			<div className={cn(styles['essence-button'], props.disabled && styles['disabled'])}>{props.children}</div>
		</Clickable>
	);
}

export { Button };
