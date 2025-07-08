import { CodeBlock } from '../../components/code-block/code-block';
import { TimePicker } from '@essence-ui/components/ui/time-picker';
import { Link } from 'react-router-dom';
import styles from './time-picker-page.module.css';

export const TimePickerPage = () => {
	const product = {
		name: 'Essence',
	};
	const timePickerCode = `<TimePicker date={new Date()} onAccept={date => console.log(date)} />`;
	const disabledTimePickerCode = `<TimePicker date={new Date()} onAccept={date => console.log(date)} disabled />`;
	const customTimePickerCode = `<TimePicker date={new Date()} onAccept={date => console.log(date)} className={styles['custom-time-picker-theme']} />`;
	const customStyle = `.custom-time-picker-theme {
    --color-theme: green;
}`;
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>

			<TimePicker date={new Date()} onAccept={() => {}} className="mt-3" />

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { TimePicker } from '@essence-ui/components/ui/time-picker/time-picker';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock fileName="sample.tsx" code={timePickerCode} language="tsx"></CodeBlock>
			<TimePicker date={new Date()} onAccept={() => {}} />

			<div className="text-2xl font-bold mt-8">Disabled TimePicker</div>
			<CodeBlock fileName="sample.tsx" code={disabledTimePickerCode} language="tsx"></CodeBlock>
			<TimePicker date={new Date()} onAccept={() => {}} disabled />

			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				{product.name} time picker is native <code>&lt;input&gt;</code> elements enhanced with {product.name}{' '}
				Design styling. Native <code>&lt;input&gt;</code> elements are always used in order to provide the most
				straightforward and accessible experience for users. A <code>&lt;TimePicker&gt;</code> element should be
				used whenever some action is performed.
			</p>

			<div className="text-3xl font-bold mt-8">Theming</div>
			<p className="mt-3">To change the color of the button on hover apply a custom class as below.</p>
			<CodeBlock fileName="sample.tsx" code={customTimePickerCode} language="tsx"></CodeBlock>

			<p>In your css file</p>
			<CodeBlock fileName="sample.css" code={customStyle} language="css"></CodeBlock>
			<TimePicker date={new Date()} onAccept={() => {}} className={styles['custom-time-picker-theme']} />
			<p className="mt-3">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
