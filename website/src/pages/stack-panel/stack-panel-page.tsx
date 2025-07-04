import { CodeBlock } from '../../components/code-block/code-block';
import { Link } from 'react-router-dom';
import { StackPanel } from '@essence-ui/components/ui/stack-panel';

export const StackPanelPage = () => {
	const options = [
		{
			index: 0,
			title: 'Green: The color of nature',
			value: 'option1',
		},
		{
			index: 1,
			title: 'Red: The color of passion',
			value: 'option2',
		},
		{
			index: 2,
			title: 'Blue: The color of the sky',
			value: 'option3',
		},
		{
			index: 3,
			title: 'Yellow: The color of the sun',
			value: 'option4',
		},
		{
			index: 4,
			title: 'Purple: The color of royalty',
			value: 'option5',
		},
		{
			index: 5,
			title: 'Orange: The color of the sunset',
			value: 'option6',
		},
		{
			index: 6,
			title: 'Pink: The color of love',
			value: 'option7',
		},
		{
			index: 8,
			title: 'Black: The color of the night',
			value: 'option9',
		},
	];

	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>

			<StackPanel options={options} onOptionSelected={option => console.log(option)} className="mt-3" />

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { StackPanel } from '@essence-ui/components/ui/stack-panel';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code={`<StackPanel options={options} onOptionSelected={option => console.log(option)} />`}
				language="tsx"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Disabled Input</div>
			<CodeBlock
				fileName="sample.tsx"
				code={`<StackPanel options={options} onOptionSelected={option => console.log(option)} disabled />`}
				language="tsx"></CodeBlock>

			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				Input is a reusable component that can be used to display a text input. It is a native{' '}
				<code>&lt;input&gt;</code> element enhanced with Essence Design styling. <code>&lt;Input&gt;</code>{' '}
				provides the most straightforward and accessible experience for users.
			</p>
			<p className="mt-10">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
