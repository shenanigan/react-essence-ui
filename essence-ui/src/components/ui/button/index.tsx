import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Clickable } from '../../core/clickable';

function Button({ ...props }: React.ComponentProps<'button'>) {
	return (
		<Clickable {...props}>
			<div className={cn('button', 'h6', props.disabled && 'disabled')}>{props.children}</div>
		</Clickable>
	);
}

export { Button };
