import { createContext, useContext, useState, type ReactNode } from 'react';
import { cn } from '@essence-ui/lib/utils';
import { Clickable } from '@essence-ui/components/core/clickable';

interface RadioProps extends React.ComponentProps<'button'> {
	text?: string;
	value: string;
}

function Radio({ value, ...props }: RadioProps) {
	const { name, selected, setSelected } = useRadioGroup();
	const isChecked = selected === value;

	const handleChange = () => {
		setSelected(value);
	};

	return (
		<Clickable {...props} onEnterOrSpaceKeyDown={handleChange} onClick={handleChange}>
			<div className={cn('radio-container')}>
				<input
					tabIndex={-1}
					type="radio"
					name={name}
					value={value}
					className={cn('radio-input')}
					checked={isChecked}
					onChange={() => setSelected(value)}
				/>
				<div className={cn('radio-mark')}></div>
				{props.text && <div className={'h6'}>{props.text}</div>}
			</div>
		</Clickable>
	);
}

type RadioGroupContextType = {
	name: string;
	selected: string | null;
	setSelected: (val: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

type RadioGroupProps = {
	name: string;
	defaultValue?: string;
	children: ReactNode;
} & React.ComponentProps<'div'>;

const RadioGroup = ({ name, defaultValue, children, ...props }: RadioGroupProps) => {
	const [selected, setSelected] = useState<string | null>(defaultValue ?? null);

	return (
		<RadioGroupContext.Provider value={{ name, selected, setSelected }}>
			<div role="radiogroup" {...props} className={cn('radio-group', props.className)}>
				{children}
			</div>
		</RadioGroupContext.Provider>
	);
};

const useRadioGroup = () => {
	const context = useContext(RadioGroupContext);
	if (!context) {
		throw new Error('Radio must be used within a RadioGroup');
	}
	return context;
};

export { Radio, RadioGroup };
