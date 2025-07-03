import { createContext, useContext } from 'react';

export interface VariantContextProps {
	variant: 'smallest' | 'smaller' | 'medium' | 'larger' | 'largest';
	setVariant: (variant: 'smallest' | 'smaller' | 'medium' | 'larger' | 'largest') => void;
}
export const VariantContext = createContext<VariantContextProps>({
	variant: 'smallest',
	setVariant: () => {},
});

export const useVariantContext = () => {
	const context = useContext(VariantContext);
	if (!context) {
		throw new Error('useVariantContext must be used within a VariantProvider');
	}
	return context;
};
