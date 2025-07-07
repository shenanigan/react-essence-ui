import { CodeBlock } from '../../components/code-block/code-block';
import { Link } from 'react-router-dom';
import { ListPicker } from '@essence-ui/components/ui/list-picker';

export const ListPickerPage = () => {
	const options = [
		{
			index: 0,
			title: 'Green: The color of nature',
			value: 'option1',
			displayRow: (
				<div className="flex flex-col items-start md:items-center">
					<div className=" text-green-900 text-3xl font-bold">Green: The color of nature. </div>
					<div className="text-green-600 font-bold">A really soothing color for your eyes.</div>
				</div>
			),
		},
		{
			index: 1,
			title: 'Red: The color of passion',
			value: 'option2',
			displayRow: (
				<div className="flex flex-col items-start md:items-center">
					<div className=" text-red-900 text-3xl font-bold">Red: The color of passion</div>
					<div className="text-red-600 font-bold">A nice warm color which is more exciting.</div>
				</div>
			),
		},
		{
			index: 2,
			title: 'Blue: The color of the sky',
			value: 'option3',
			displayRow: (
				<div className="flex flex-col items-start md:items-center">
					<div className=" text-blue-900 text-3xl font-bold">Blue: The color of the sky</div>
					<div className="text-blue-600 font-bold">A cool color which is more calming.</div>
				</div>
			),
		},
		{
			index: 3,
			title: 'Yellow: The color of the sun',
			value: 'option4',
			displayRow: (
				<div className="flex flex-col items-start md:items-center">
					<div className=" text-yellow-900 text-3xl font-bold">Yellow: The color of the sun</div>
					<div className="text-yellow-600 font-bold">A bright color which is more energetic.</div>
				</div>
			),
		},
		{
			index: 4,
			title: 'Purple: The color of royalty',
			value: 'option5',
			displayRow: (
				<div className="flex flex-col items-start md:items-center">
					<div className=" text-purple-900 text-3xl font-bold">Purple: The color of royalty</div>
					<div className="text-purple-600 font-bold">A rich color which is more luxurious.</div>
				</div>
			),
		},
		{
			index: 5,
			title: 'Orange: The color of the sunset',
			value: 'option6',
			displayRow: (
				<div className="flex flex-col items-start md:items-center">
					<div className=" text-orange-900 text-3xl font-bold">Orange: The color of the sunset</div>
					<div className="text-orange-600 font-bold">A warm color which is more inviting.</div>
				</div>
			),
		},
		{
			index: 6,
			title: 'Pink: The color of love',
			value: 'option7',
			displayRow: (
				<div className="flex flex-col items-start md:items-center">
					<div className=" text-pink-900 text-3xl font-bold">Pink: The color of love</div>
					<div className="text-pink-600 font-bold">A soft color which is more romantic.</div>
				</div>
			),
		},
		{
			index: 7,
			title: 'Gray: The color of the clouds',
			value: 'option8',
			displayRow: (
				<div className="flex flex-col items-start md:items-center">
					<div className=" text-gray-900 text-3xl font-bold">Gray: The color of the clouds</div>
					<div className="text-gray-600 font-bold">A neutral color which is more calming.</div>
				</div>
			),
		},
		{
			index: 8,
			title: 'Black: The color of the night',
			value: 'option9',
			displayRow: (
				<div className="flex flex-col items-start md:items-center">
					<div className=" text-black-900 text-3xl font-bold">Black: The color of the night</div>
					<div className="text-black-600 font-bold">A dark color which is more mysterious.</div>
				</div>
			),
		},
		{
			index: 9,
			title: 'I am just a lonely title with no row',
			value: 'option10',
		},
	];

	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>
			<ListPicker className="mt-3" options={options} onOptionSelected={option => console.log(option)} />

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { ListPicker } from '@essence-ui/components/ui/list-picker';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code={`<ListPicker options={options} onOptionSelected={option => console.log(option)} />`}
				language="tsx"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Disabled Input</div>
			<CodeBlock
				fileName="sample.tsx"
				code={`<ListPicker options={options} onOptionSelected={option => console.log(option)} />`}
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
