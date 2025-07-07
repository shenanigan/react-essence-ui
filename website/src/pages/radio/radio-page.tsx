import { CodeBlock } from '../../components/code-block/code-block';
import { Radio, RadioGroup } from '@essence-ui/components/ui/radio';
import { Link } from 'react-router-dom';

export const RadioPage = () => {
	const product = {
		name: 'Essence',
	};
	const radioCode = `<Radio text="Hello World" />`;
	const disabledRadioCode = `<Radio disabled text="Hello World" />`;
	const customRadioCode = `<Radio className={styles['custom-radio-theme']} text="Hello World" />`;
	const customStyle = `.custom-radio-theme {
    --color-theme: green;
}`;
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>

			<RadioGroup name="radio-group-1	" defaultValue="hello" className="mt-3">
				<Radio text="Hello" value="hello" />
				<Radio text="World" value="world" />
				<Radio text="Hello World" value="hello-world" />
			</RadioGroup>

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { Radio } from '@essence-ui/components/ui/radio';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock fileName="sample.tsx" code={radioCode} language="html"></CodeBlock>
			<RadioGroup name="radio-group-2" defaultValue="world" className="mt-3 flex flex-col gap-2">
				<Radio text="Hello" value="hello" />
				<Radio text="World" value="world" />
				<Radio text="Hello World" value="hello-world" />
			</RadioGroup>

			<div className="text-2xl font-bold mt-8">Disabled Radio</div>
			<CodeBlock fileName="sample.tsx" code={disabledRadioCode} language="html"></CodeBlock>
			<RadioGroup name="radio-group-1" defaultValue="hello" className="mt-3 flex flex-col gap-2">
				<Radio text="Hello" value="hello" disabled />
				<Radio text="World" value="world" disabled />
				<Radio text="Hello World" value="hello-world" disabled />
			</RadioGroup>

			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				{product.name} radio buttons are native <code>&lt;input&gt;</code> elements enhanced with {product.name}{' '}
				Design styling. Native <code>&lt;input&gt;</code> elements are always used in order to provide the most
				straightforward and accessible experience for users. A <code>&lt;Radio&gt;</code> element should be used
				whenever some action is performed.
			</p>

			<div className="text-3xl font-bold mt-8">Theming</div>
			<p className="mt-3">To change the color of the button on hover apply a custom class as below.</p>
			<CodeBlock fileName="sample.tsx" code={customRadioCode} language="tsx"></CodeBlock>

			<p>In your css file</p>
			<CodeBlock fileName="sample.css" code={customStyle} language="css"></CodeBlock>
			{/* <Radio defaultChecked className={styles['custom-radio-theme']} text="Hello World" /> */}
			<p className="mt-3">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
