import { useEffect, useState } from 'react';
import { PickerList } from '../../core/picker-list/picker-list';
import { PickerOverlay } from '../../core/picker-overlay/picker-overlay';
import { Input } from '../input';
import { cn } from '../../../lib/utils';
import type { IPickerOption } from '../../core/model/i-picker-option';
import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	onClose?(): void;
	onAccept(option: IPickerOption): void;
	countryCodes: IPickerOption[];
}
function CountryCodePicker(props: Props) {
	const countryCodes: IPickerOption[] =
		props.countryCodes.length === 0
			? [
					{ index: 0, title: '+91', subtitle: 'India', value: '+91' },
					{ index: 1, title: '+1', subtitle: 'USA', value: '+1' },
				]
			: props.countryCodes;

	const [internalCountryCode, setInternalCountryCode] = useState(countryCodes[0]);
	const [hidePicker, setHidePicker] = useState(true);

	const [countryCode, setCountryCode] = useState(countryCodes[0]);

	useEffect(() => {
		props.onAccept(countryCode);
	}, [countryCode, props, props.onAccept]);

	const onCountryCodeChange = (option: IPickerOption) => {
		setInternalCountryCode(option);
	};

	const accept = () => {
		setHidePicker(true);
		setCountryCode(internalCountryCode);
		props.onAccept(internalCountryCode);
	};

	const reject = () => {
		setHidePicker(true);
		if (props.onClose) {
			props.onClose();
		}
	};

	const openPicker = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setHidePicker(false);
	};

	return (
		<div>
			<div onClick={openPicker}>
				<Input
					{...props}
					value={countryCode.title}
					readOnly
					inputMode="none"
					className={cn('country-code-picker-input', props.className)}
				/>
			</div>
			{!hidePicker && (
				<PickerOverlay onAccept={accept} onReject={reject}>
					<PickerList
						id="country-code-picker-id"
						value={countryCode}
						onChange={onCountryCodeChange}
						options={countryCodes}
					/>
				</PickerOverlay>
			)}
		</div>
	);
}

export { CountryCodePicker };
