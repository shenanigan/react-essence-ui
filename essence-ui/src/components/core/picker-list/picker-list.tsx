import { useCallback, useEffect, useRef, useState } from 'react';
import { PickerOption } from '@essence-ui/components/core/picker-option/picker-option';
import styles from './picker-list.module.css';
import type { IPickerOption } from '@essence-ui/components/core/model/i-picker-option';

interface Props {
	options: IPickerOption[];
	onChange(option: IPickerOption): void;
	value: IPickerOption;
	id: string;
}
function PickerList({ options, onChange, value, id }: Props) {
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();

	const scroller = useRef<HTMLUListElement>(null);

	const [state, setState] = useState({
		isScrolling: false,
		activeIndex: value.index,
		isHovering: false,
	});

	const scrollToIndex = useCallback((index: number) => {
		const optionHeight = scroller.current?.firstElementChild?.clientHeight ?? 0;
		scroller.current?.scrollTo({
			top: index * optionHeight,
			behavior: 'smooth',
		});
	}, []);

	useEffect(() => {
		scrollToIndex(state.activeIndex);
	}, [scrollToIndex, state.activeIndex]);

	const onScroll = () => {
		setState({
			...state,
			isScrolling: true,
		});

		clearTimeout(timeoutId);
		const newTimeoutId = setTimeout(() => {
			const optionHeight = scroller.current?.firstElementChild?.clientHeight ?? 0;
			const approxIndex = (scroller.current?.scrollTop ?? 0 - 16) / optionHeight;

			const roundedNumber = Math.round(approxIndex);
			onScrollEnd(roundedNumber);
		}, 200);

		setTimeoutId(newTimeoutId);
	};

	const onScrollEnd = (index: number) => {
		onChange(options[index]);

		setState({
			isScrolling: false,
			isHovering: false,
			activeIndex: index,
		});
	};

	const selectOption = (option: IPickerOption) => {
		scrollToIndex(option.index);
	};

	return (
		<ul
			ref={scroller}
			className={styles.scroller}
			id={id}
			onScroll={onScroll}
			onMouseOver={() => {
				setState({
					isScrolling: state.isScrolling,
					isHovering: true,
					activeIndex: state.activeIndex,
				});
			}}
			onMouseLeave={() => {
				setState({
					isScrolling: state.isScrolling,
					isHovering: false,
					activeIndex: state.activeIndex,
				});
			}}>
			{options.map((option, i) => (
				<li key={i} className={styles['list-item']}>
					<PickerOption
						isHovering={state.isHovering}
						isScrolling={state.isScrolling}
						isActive={i === state.activeIndex}
						option={{ ...option, index: i }}
						onClick={selectOption}
					/>
				</li>
			))}
		</ul>
	);
}

export { PickerList };
