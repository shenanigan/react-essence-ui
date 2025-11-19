import React, { useCallback, useEffect, useState } from 'react';
import { PickerList } from '@essence-ui/components/core/picker-list/picker-list';
import { PickerOverlay } from '@essence-ui/components/core/picker-overlay/picker-overlay';
import type { IPickerOption } from '@essence-ui/components/core/model/i-picker-option';
import { Input } from '@essence-ui/components/ui/input';
import { cn } from '@essence-ui/lib/utils';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
	date: Date | string | undefined;
	minDate?: Date;
	maxDate?: Date;
	onClose?(): void;
	onAccept?(date: Date): void;
}

function DatePicker({ date, minDate, maxDate, onClose, onAccept, className, ...props }: DatePickerProps) {
	const [minDateState] = useState<Date>(minDate ? minDate : new Date(1900, 1, 1));
	const [maxDateState] = useState<Date>(maxDate ? maxDate : new Date(2050, 12, 1));

	const [currentDate, setCurrentDate] = useState<Date>(
		date instanceof Date ? date : date ? new Date(date) : new Date(),
	);
	const [internalDate, setInternalDate] = useState<Date>(
		date instanceof Date ? date : date ? new Date(date) : new Date(),
	);
	const [hidePicker, setHidePicker] = useState<boolean>(true);

	// const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	const [dateOption, setDateOption] = useState<IPickerOption>({ index: 0, title: '', value: 1 });
	const [monthOption, setMonthOption] = useState<IPickerOption>({
		index: 0,
		title: '',
		subtitle: '',
		value: 0,
	});
	const [yearOption, setYearOption] = useState<IPickerOption>({ index: 0, title: '', value: 0 });

	const [dates, setDates] = useState<IPickerOption[]>([]);
	const [months, setMonths] = useState<IPickerOption[]>([]);
	const [years, setYears] = useState<IPickerOption[]>([]);

	const accept = () => {
		setHidePicker(true);
		const date = new Date(internalDate.getTime());
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

	const _checkdate = useCallback(() => {
		let numberOfDays = 31;
		const thirtyOneDaysMonths = [1, 3, 5, 7, 8, 10, 12];
		const isThirtyOneDaysMonth = thirtyOneDaysMonths.includes(Number(monthOption.value));
		if (isThirtyOneDaysMonth) {
			numberOfDays = 31;
		} else if (monthOption.value == 2 && yearOption.value) {
			if (
				(Number(yearOption.value) % 4 == 0 && Number(yearOption.value) % 100 != 0) ||
				Number(yearOption.value) % 400 == 0
			) {
				numberOfDays = 29;
			} else {
				numberOfDays = 28;
			}
		} else {
			numberOfDays = 30;
		}
		const localDates: IPickerOption[] = [];

		for (let index = 1; index <= numberOfDays; index++) {
			localDates.push({
				index: index - 1,
				title: index.toString(),
				value: index,
			});
		}
		setDates(localDates);
	}, [monthOption, yearOption]);

	const _updateOptions = useCallback((minDate: Date, maxDate: Date) => {
		const years: IPickerOption[] = [];
		const months: IPickerOption[] = [];
		for (let index: number = maxDate.getFullYear(); index >= minDate.getFullYear(); index--) {
			years.push({
				index: maxDate.getFullYear() - index,
				title: index.toString(),
				value: index,
			});
		}

		setYears(years);

		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		for (let index = 1; index <= 12; index++) {
			months.push({
				index: index - 1,
				title: index.toString(),
				subtitle: monthNames[index - 1],
				value: index,
			});
		}

		setMonths(months);
	}, []);

	useEffect(() => {
		_updateOptions(minDateState, maxDateState);
	}, [_updateOptions, maxDateState, minDateState]);

	useEffect(() => {
		if (months.length > 0 && years.length > 0) {
			_checkdate();
		}
	}, [months, years, _checkdate]);

	useEffect(() => {
		if (dates.length > 0 && dateOption.value !== dates[internalDate.getDate() - 1]?.value) {
			const date = dates[internalDate.getDate() - 1];
			setDateOption(date);
		}
		if (months.length > 0 && monthOption.value !== months[internalDate.getMonth()]?.value) {
			setMonthOption(months[internalDate.getMonth()]);
		}
		if (
			years.length > 0 &&
			yearOption.value !== years[maxDateState.getFullYear() - internalDate.getFullYear()]?.value
		) {
			setYearOption(years[maxDateState.getFullYear() - internalDate.getFullYear()]);
		}
	}, [dateOption, dates, internalDate, maxDateState, monthOption, months, yearOption, years]);

	const onDateChange = ($event: IPickerOption) => {
		const date = $event;
		setDateOption(date);
		internalDate.setDate(Number(date.value));
		setInternalDate(internalDate);
	};

	const onMonthChange = ($event: IPickerOption) => {
		const month = $event;
		internalDate.setMonth(month.index);
		setInternalDate(internalDate);
		setMonthOption(month);
	};

	const onYearChange = ($event: IPickerOption) => {
		const year = $event;
		internalDate.setFullYear(Number(year.value));
		setInternalDate(internalDate);
		setYearOption(year);
	};

	return (
		<div className={cn(className)}>
			<Input
				{...props}
				onFocus={openDatePicker}
				value={currentDate.toISOString().replace(/T.*/, '').split('-').reverse().join('-')}
				readOnly
				inputMode="none"
			/>
			{!hidePicker && (
				<PickerOverlay onAccept={accept} onReject={reject}>
					<PickerList id="date-picker-days-id" value={dateOption} onChange={onDateChange} options={dates} />

					<PickerList
						id="date-picker-months-id"
						value={monthOption}
						onChange={onMonthChange}
						options={months}
					/>

					<PickerList id="date-picker-years-id" value={yearOption} onChange={onYearChange} options={years} />
				</PickerOverlay>
			)}
		</div>
	);
}

export { DatePicker };
