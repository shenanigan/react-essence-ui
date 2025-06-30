import { useState } from 'react';
import styles from './switch.module.css';
import { cn } from '@essence-ui/lib/utils';
import Clickable from '@essence-ui/components/core/clickable';

interface SwitchProps extends React.ComponentProps<'button'> {
	defaultChecked?: boolean;
	onCheckedChange?(checked: boolean): void;
	text?: string;
}

function Switch({ onCheckedChange, defaultChecked, ...props }: SwitchProps) {
	const [isChecked, setChecked] = useState(defaultChecked ?? false);
	const handleChange = () => {
		if (props?.disabled) return;
		const newChecked = !isChecked;
		onCheckedChange?.(newChecked);
		setChecked(newChecked);
	};

	const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		handleChange();
		props?.onClick?.(e);
	};

	return (
		<div className={cn(styles['switch'], props.className)}>
			<div>{props.text}</div>
			<Clickable {...props} className="" onEnterOrSpaceKeyDown={handleChange} onClick={onClick}>
				<div className={styles['switch-container']}>
					<input
						className={styles['switch-input']}
						tabIndex={-1}
						type="checkbox"
						checked={isChecked}
						onChange={handleChange}
						value={isChecked ? '1' : '0'}
					/>
					<div className={styles['slider']}>
						<span className={styles['inner']}></span>
					</div>
				</div>
			</Clickable>
		</div>
	);
}

export { Switch };
