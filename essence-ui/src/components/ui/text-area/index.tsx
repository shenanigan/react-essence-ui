import * as React from 'react';

import { cn } from '../../../lib/utils';

function TextArea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
	return <textarea {...props} data-slot="textarea" className={cn('text-area', 'subtitle-1', className)} />;
}

export { TextArea };
