import { useState } from 'react';
import { cn } from '@essence-ui/lib/utils';
import { Clickable } from '@essence-ui/components/core/clickable';

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
		<div className={cn('switch', props.className)}>
			<div className={'subtitle-1'} id="switch-label">
				{props.text}
			</div>
			<Clickable {...props} className="" onEnterOrSpaceKeyDown={handleChange} onClick={onClick}>
				<div className={'switch-container'}>
					<input
						className={'switch-input'}
						tabIndex={-1}
						type="checkbox"
						checked={isChecked}
						onChange={handleChange}
						value={isChecked ? '1' : '0'}
						aria-label={props['aria-label']}
						aria-labelledby="switch-label"
					/>
					<div className={'switch-slider'}>
						<span className={'inner'}></span>
					</div>
				</div>
			</Clickable>
		</div>
	);
}

export { Switch };
