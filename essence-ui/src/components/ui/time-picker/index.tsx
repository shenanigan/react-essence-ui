import React, { useEffect, useState } from 'react';
import { PickerList } from '@essence-ui/components/core/picker-list/picker-list';
import { PickerOverlay } from '@essence-ui/components/core/picker-overlay/picker-overlay';
import type { IPickerOption } from '@essence-ui/components/core/model/i-picker-option';
import { Input } from '@essence-ui/components/ui/input';
import { cn } from '@essence-ui/lib/utils';

interface TimePickerProps extends React.ComponentProps<typeof Input> {
	date: Date | string | undefined;
	onClose?(): void;
	onAccept?(date: Date): void;
}

function TimePicker({ date, onClose, onAccept, className, ...props }: TimePickerProps) {
	const [currentDate, setCurrentDate] = useState<Date>(
		date instanceof Date ? date : date ? new Date(date) : new Date(),
	);

	const [hidePicker, setHidePicker] = useState<boolean>(true);

	const [meridiemOption, setMeridiemOption] = useState<IPickerOption>({ index: 0, title: 'AM', value: 0 });
	const [hourOption, setHourOption] = useState<IPickerOption>({ index: 0, title: '12', value: 0 });
	const [minuteOption, setMinuteOption] = useState<IPickerOption>({ index: 0, title: '00', value: 0 });

	const [meridiem, setMeridiem] = useState<IPickerOption[]>([]);
	const [hours, setHours] = useState<IPickerOption[]>([]);
	const [minutes, setMinutes] = useState<IPickerOption[]>([]);

	useEffect(() => {
		const hours = [];
		for (let i = 0; i < 12; i++) {
			hours.push({
				index: i,
				title: (i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
				value: i + 1,
			});
		}
		setHours(hours);

		const minutes = [];
		for (let i = 0; i < 60; i++) {
			minutes.push({
				index: i,
				title: i.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
				value: i,
			});
		}
		setMinutes(minutes);

		const meridiem = [];
		for (let i = 0; i < 2; i++) {
			meridiem.push({ index: i, title: i === 0 ? 'AM' : 'PM', value: i });
		}
		setMeridiem(meridiem);
	}, []);

	useEffect(() => {
		setMeridiemOption(meridiem[currentDate.getHours() < 12 ? 0 : 1]);
		if (currentDate.getHours() === 0 || currentDate.getHours() === 12) {
			setHourOption(hours[hours.length - 1]);
		} else {
			setHourOption(hours[(currentDate.getHours() % 12) - 1]);
		}
		setMinuteOption(minutes[currentDate.getMinutes()]);
	}, [meridiem, hours, minutes, currentDate]);

	const accept = () => {
		setHidePicker(true);
		const date = new Date(currentDate.getTime());

		if (meridiemOption.value === 0) {
			if (hourOption.value === 12) {
				date.setHours(0);
			} else {
				date.setHours(Number(hourOption.value));
			}
		} else {
			if (hourOption.value === 12) {
				date.setHours(12);
			} else {
				date.setHours(Number(hourOption.value) + 12);
			}
		}
		date.setMinutes(Number(minuteOption.value));
		setCurrentDate(date);
		if (onAccept) {
			onAccept(date);
		}
	};

	const reject = () => {
		setHidePicker(true);
		if (onClose) {
			onClose();
		}
	};

	const openDatePicker = (event: React.FocusEvent<HTMLInputElement>) => {
		event.preventDefault();
		setHidePicker(false);
	};

	const onMeridiemChange = ($event: IPickerOption) => {
		setMeridiemOption($event);
	};

	const onHoursChange = ($event: IPickerOption) => {
		setHourOption($event);
	};

	const onMinutesChange = ($event: IPickerOption) => {
		setMinuteOption($event);
	};

	return (
		<div className={cn(className)}>
			<Input
				onFocus={openDatePicker}
				value={currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
				readOnly
				inputMode="none"
				{...props}
			/>
			{!hidePicker && (
				<PickerOverlay onAccept={accept} onReject={reject}>
					<PickerList id="date-picker-days-id" value={hourOption} onChange={onHoursChange} options={hours} />

					<PickerList
						id="date-picker-months-id"
						value={minuteOption}
						onChange={onMinutesChange}
						options={minutes}
					/>

					<PickerList
						id="date-picker-years-id"
						value={meridiemOption}
						onChange={onMeridiemChange}
						options={meridiem}
					/>
				</PickerOverlay>
			)}
		</div>
	);
}

export { TimePicker };
