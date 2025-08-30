import { CodeBlock } from '../../components/code-block/code-block';
import { DatePicker } from '@wp-essence-ui/components';
import { Link } from 'react-router-dom';
import styles from './date-picker-page.module.css';

export const DatePickerPage = () => {
	const product = {
		name: 'Essence',
	};
	const datePickerCode = `<DatePicker date={new Date()} onAccept={date => console.log(date)} />`;
	const disabledDatePickerCode = `<DatePicker date={new Date()} onAccept={date => console.log(date)} disabled />`;
	const customDatePickerCode = `<DatePicker date={new Date()} onAccept={date => console.log(date)} className={styles['custom-date-picker-theme']} />`;
	const customStyle = `.custom-date-picker-theme {
    --color-theme: green;
}`;
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>

			<DatePicker date={new Date()} onAccept={() => {}} className="mt-3" />

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock fileName="sample.tsx" code="import { DatePicker } from '@wp-essence-ui/components';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock fileName="sample.tsx" code={datePickerCode} language="tsx"></CodeBlock>
			<DatePicker date={new Date()} onAccept={() => {}} />

			<div className="text-2xl font-bold mt-8">Disabled DatePicker</div>
			<CodeBlock fileName="sample.tsx" code={disabledDatePickerCode} language="tsx"></CodeBlock>
			<DatePicker date={new Date()} onAccept={() => {}} />

			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				{product.name} date picker is native <code>&lt;input&gt;</code> elements enhanced with {product.name}{' '}
				Design styling. Native <code>&lt;input&gt;</code> elements are always used in order to provide the most
				straightforward and accessible experience for users. A <code>&lt;DatePicker&gt;</code> element should be
				used whenever some action is performed.
			</p>

			<div className="text-3xl font-bold mt-8">Theming</div>
			<p className="mt-3">To change the color of the button on hover apply a custom class as below.</p>
			<CodeBlock fileName="sample.tsx" code={customDatePickerCode} language="tsx"></CodeBlock>

			<p>In your css file</p>
			<CodeBlock fileName="sample.css" code={customStyle} language="css"></CodeBlock>
			<DatePicker date={new Date()} onAccept={() => {}} className={styles['custom-date-picker-theme']} />
			<p className="mt-3">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
