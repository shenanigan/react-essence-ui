import { CodeBlock } from '../../components/code-block/code-block';
import { CheckBox } from '@essence-ui/components/ui/check-box';
import styles from './check-box-page.module.css';
import { Link } from 'react-router-dom';

export const CheckBoxPage = () => {
	const product = {
		name: 'Essence',
	};
	const checkBoxCode = `<CheckBox text="Hello World" />`;
	const disabledCheckBoxCode = `<CheckBox disabled={true} text="Hello World" />`;
	const customCheckBoxCode = `<CheckBox className="custom-check-box-theme" text="Hello World" />`;
	const defaultCheckedCheckBoxCode = `<CheckBox text="Hello World" defaultChecked />`;
	const customStyle = `.custom-check-box-theme {
    --theme-color: green;
}`;
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>
			<CheckBox className="mt-3" text="Hello World" />

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { CheckBox } from '@essence-ui/components/ui/check-box';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock fileName="sample.tsx" code={checkBoxCode} language="html"></CodeBlock>
			<CheckBox text="Hello World" />

			<div className="text-2xl font-bold mt-8">Disabled Check Box</div>
			<CodeBlock fileName="sample.tsx" code={disabledCheckBoxCode} language="html"></CodeBlock>
			<CheckBox text="Hello World" disabled={true} />

			<div className="text-2xl font-bold mt-8">Default Checked Check Box</div>
			<CodeBlock fileName="sample.tsx" code={defaultCheckedCheckBoxCode} language="html"></CodeBlock>
			<CheckBox text="Hello World" defaultChecked />

			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				{product.name} check boxes are native <code>&lt;input&gt;</code> elements enhanced with {product.name}{' '}
				Design styling. Native <code>&lt;input&gt;</code> elements are always used in order to provide the most
				straightforward and accessible experience for users. A <code>&lt;CheckBox&gt;</code> element should be
				used whenever some action is performed.
			</p>

			<div className="text-3xl font-bold mt-8">Theming</div>
			<p className="mt-3">To change the color of the button on hover apply a custom class as below.</p>
			<CodeBlock fileName="sample.tsx" code={customCheckBoxCode} language="html"></CodeBlock>

			<p>In your css file</p>
			<CodeBlock fileName="sample.css" code={customStyle} language="css"></CodeBlock>
			<CheckBox defaultChecked className={styles['custom-check-box-theme']} text="Hello World" />
			<p className="mt-3">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
