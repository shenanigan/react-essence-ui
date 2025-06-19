import { useState } from 'react';
import styles from './check-box.module.css';
import { cn } from '@essence-ui/lib/utils';
import Clickable from '@essence-ui/components/core/clickable';

interface CheckBoxProps extends React.ComponentProps<'button'> {
	defaultChecked?: boolean;
	onCheckedChange?(checked: boolean): void;
	text?: string;
}

function CheckBox({ onCheckedChange, defaultChecked, ...props }: CheckBoxProps) {
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
		<Clickable {...props} onEnterOrSpaceKeyDown={handleChange} onClick={onClick}>
			<div className={cn(styles['checkbox-container'])}>
				<div className={cn(styles['checkbox'])}>
					<input type="checkbox" checked={isChecked} onChange={handleChange} />
					<div className={cn(styles['checkmark'])}></div>
				</div>

				{props.text && <div className={cn(styles['text'])}>{props.text}</div>}
			</div>
		</Clickable>
	);
}

export { CheckBox };
