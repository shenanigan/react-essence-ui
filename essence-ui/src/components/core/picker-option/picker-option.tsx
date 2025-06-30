import type { IPickerOption } from '@essence-ui/components/core/model/i-picker-option';
import styles from './picker-option.module.css';

interface Props {
	option: IPickerOption;
	isActive: boolean;
	isScrolling: boolean;
	isHovering: boolean;
	onClick(option: IPickerOption): void;
}

function PickerOption({ option, isActive, isScrolling, isHovering, onClick }: Props) {
	return (
		<div
			onClick={() => {
				onClick(option);
			}}
			className={`${styles['picker-option']} ${isActive ? styles.active : ''} ${
				isScrolling ? styles.scrolling : ''
			} ${isHovering ? styles.hovering : ''}`}>
			<div className={styles['picker-option-title']}>{option.title}</div>
			<div className={styles['picker-option-sub-title']}>{option.subtitle}</div>
		</div>
	);
}

export { PickerOption };
