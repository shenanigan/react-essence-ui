import React, { useEffect, useState } from 'react';
import { PickerOverlay } from '@essence-ui/components/core/picker-overlay/picker-overlay';
import { Input } from '@essence-ui/components/ui/input';
import { cn } from '@essence-ui/lib/utils';
import type { IPickerOption } from '@essence-ui/components/core/model/i-picker-option';
import { Clickable } from '@essence-ui/components/core/clickable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface ListPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
	options: ListPickerOption[];
	onOptionSelected(option: IPickerOption): void;
}

interface ListPickerOption extends IPickerOption {
	displayRow?: React.ReactNode;
}

function ListPicker({ options, onOptionSelected, className, ...props }: ListPickerProps) {
	const [hidePicker, setHidePicker] = useState<boolean>(true);

	const [selectedOption, setSelectedOption] = useState<ListPickerOption>(options[0]);

	const reject = () => {
		window.history.back();
		setHidePicker(true);
	};

	useEffect(() => {
		const handleHashChange = () => {
			setHidePicker(window.location.hash !== '#picker-open');
		};
		window.addEventListener('hashchange', handleHashChange);
		return () => {
			window.removeEventListener('hashchange', handleHashChange);
		};
	}, []);

	const openPicker = (event: React.FocusEvent<HTMLInputElement>) => {
		event.preventDefault();
		setHidePicker(false);
		window.location.hash = '#picker-open';
		event.target.blur();
	};

	const openPickerViaChevron = () => {
		setHidePicker(false);
		window.location.hash = '#picker-open';
	};

	const onAccept = () => {
		window.history.back();
		setHidePicker(true);
		onOptionSelected(selectedOption);
	};

	return (
		<div className={cn(className)}>
			<div className={cn('list-picker-input-container')}>
				<Input
					{...props}
					style={{ width: '100%', cursor: props.disabled ? 'not-allowed' : 'pointer' }}
					onFocus={openPicker}
					value={selectedOption.title}
					readOnly
					inputMode="none"
				/>
				{!props.disabled && (
					<FontAwesomeIcon
						className={cn('list-picker-chevron-icon')}
						icon={faChevronDown}
						onClick={openPickerViaChevron}
					/>
				)}
			</div>
			{!hidePicker && (
				<PickerOverlay onAccept={onAccept} onReject={reject} showAcceptButton={false}>
					<div className={cn('list-picker-container')}>
						{options.map(option => (
							<Clickable
								style={{
									cursor: 'pointer',
								}}
								key={option.index}
								onClick={() => {
									setSelectedOption(option);
									onOptionSelected(option);
									setHidePicker(true);
									window.history.back();
								}}>
								{option.displayRow || (
									<div className={cn('list-picker-item', 'h3')}>{option.title}</div>
								)}
							</Clickable>
						))}
					</div>
				</PickerOverlay>
			)}
		</div>
	);
}

export { ListPicker };
