import * as React from 'react';

import { cn } from '../../../lib/utils';
import Clickable from '../../core/clickable';

function Button({ ...props }: React.ComponentProps<'button'>) {
	return (
		<Clickable {...props}>
			<div className={cn('button', props.disabled && 'disabled', 'h6')}>{props.children}</div>
		</Clickable>
	);
}

export { Button };
