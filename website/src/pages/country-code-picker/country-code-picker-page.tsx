import { CodeBlock } from '../../components/code-block/code-block';
import { CountryCodePicker } from '@wp-essence-ui/components';
import { Link } from 'react-router-dom';
import styles from './country-code-picker-page.module.css';

export const CountryCodePickerPage = () => {
	const countryCodes = [
		{ index: 0, title: '+91', subtitle: 'India', value: '+91' },
		{ index: 1, title: '+1', subtitle: 'USA', value: '+1' },
	];
	const product = {
		name: 'Essence',
	};
	const countryCodesCode = `const countryCodes = [
		{ index: 0, title: '+91', subtitle: 'India', value: '+91' },
		{ index: 1, title: '+1', subtitle: 'USA', value: '+1' },
	]`;
	const countryCodePickerCode = `<CountryCodePicker countryCodes={countryCodes} onAccept={option => console.log(option)} />`;
	const disabledCountryCodePickerCode = `<CountryCodePicker countryCodes={countryCodes} onAccept={option => console.log(option)} disabled />`;
	const customCountryCodePickerCode = `<CountryCodePicker countryCodes={countryCodes} onAccept={option => console.log(option)} className={styles['custom-country-code-picker-theme']} />`;
	const customStyle = `.custom-country-code-picker-theme {
    --color-theme: green;
}`;
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>
			<CountryCodePicker countryCodes={countryCodes} onAccept={option => console.log(option)} className="mt-3" />
			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { CountryCodePicker } from '@wp-essence-ui/components';"></CodeBlock>
			<div className="text-2xl font-bold mt-8">Use the component</div>
			<p>You need to mention the country codes in the countryCodes prop as below.</p>
			<CodeBlock fileName="sample.tsx" code={countryCodesCode} language="tsx"></CodeBlock>
			<br />
			<p>You can then use the component as below.</p>
			<CodeBlock fileName="sample.tsx" code={countryCodePickerCode} language="tsx"></CodeBlock>
			<CountryCodePicker countryCodes={countryCodes} onAccept={() => {}} />
			<div className="text-2xl font-bold mt-8">Disabled TimePicker</div>
			<CodeBlock fileName="sample.tsx" code={disabledCountryCodePickerCode} language="tsx"></CodeBlock>
			<CountryCodePicker countryCodes={countryCodes} onAccept={() => {}} disabled />
			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				{product.name} country code picker is native <code>&lt;input&gt;</code> elements enhanced with{' '}
				{product.name} Design styling. Native <code>&lt;input&gt;</code> elements are always used in order to
				provide the most straightforward and accessible experience for users. A <code>&lt;TimePicker&gt;</code>{' '}
				element should be used whenever some action is performed.
			</p>
			<div className="text-3xl font-bold mt-8">Theming</div>
			<p className="mt-3">To change the color of the button on hover apply a custom class as below.</p>
			<CodeBlock fileName="sample.tsx" code={customCountryCodePickerCode} language="tsx"></CodeBlock>
			<p>In your css file</p>
			<CodeBlock fileName="sample.css" code={customStyle} language="css"></CodeBlock>
			<CountryCodePicker
				countryCodes={countryCodes}
				onAccept={() => {}}
				className={styles['custom-country-code-picker-theme']}
			/>
			<p className="mt-3">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
