import * as React from 'react';

import { cn } from '../../../lib/utils';

function TextArea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return <textarea data-slot="textarea" className={cn('text-area', 'subtitle-1', className)} {...props} />;
}

export { TextArea };
