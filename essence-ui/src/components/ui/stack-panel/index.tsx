import React, { useEffect, useState } from 'react';
import { Input } from '@essence-ui/components/ui/input';
import { cn } from '@essence-ui/lib/utils';
import type { IPickerOption } from '@essence-ui/components/core/model/i-picker-option';
import Clickable from '@essence-ui/components/core/clickable';

interface StackPanelProps extends React.ComponentProps<typeof Input> {
	options: IPickerOption[];
	onOptionSelected(option: IPickerOption): void;
}

function StackPanel({ options, onOptionSelected, className, ...props }: StackPanelProps) {
	const [hidePicker, setHidePicker] = useState<boolean>(true);
	const [sortedOptions, setSortedOptions] = useState<IPickerOption[]>(options);

	const [selectedOption, setSelectedOption] = useState<IPickerOption>(options[0]);

	const togglePicker = (event: React.MouseEvent<HTMLInputElement>) => {
		event.preventDefault();
		setHidePicker(!hidePicker);
		event.currentTarget.blur();
	};

	useEffect(() => {
		setSortedOptions(options.filter(o => o.index !== selectedOption.index));
	}, [options, selectedOption]);

	const selectOption = (option: IPickerOption) => {
		setSelectedOption(option);
		onOptionSelected(option);
		setHidePicker(true);
		// TODO:remove the selected option
		setSortedOptions(options.filter(o => o.index !== option.index));
	};

	return (
		<div className={cn(className)}>
			<div className={cn('stack-panel-input-container', hidePicker ? '' : 'active')}>
				<Input
					{...props}
					style={{
						width: '100%',
						border: 'none',
						margin: 0,
						cursor: props.disabled ? 'not-allowed' : 'pointer',
					}}
					onClick={togglePicker}
					value={selectedOption.title}
					readOnly
					inputMode="none"
				/>

				{sortedOptions.map(option => (
					<Clickable
						style={{
							cursor: 'pointer',
						}}
						key={option.index}
						onClick={() => {
							selectOption(option);
						}}>
						<div className={cn('stack-panel-item', 'subtitle-1')}>{option.title}</div>
					</Clickable>
				))}
			</div>
		</div>
	);
}

export { StackPanel };
