import { VariantContext } from './variant-context';
import { type PropsWithChildren, useState } from 'react';

export const VariantProvider = ({ children }: PropsWithChildren) => {
	const [variantState, setVariantState] = useState<'smallest' | 'smaller' | 'medium' | 'larger' | 'largest'>(
		'smaller',
	);

	const setVariant = (variant: 'smallest' | 'smaller' | 'medium' | 'larger' | 'largest') => {
		setVariantState(variant);
	};

	return <VariantContext.Provider value={{ variant: variantState, setVariant }}>{children}</VariantContext.Provider>;
};
