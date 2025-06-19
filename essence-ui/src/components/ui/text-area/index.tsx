import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './text-area.module.css';

function TextArea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return <textarea data-slot="textarea" className={cn(styles['text-area'], className)} {...props} />;
}

export { TextArea };
