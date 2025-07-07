import { CodeBlock } from '../../components/code-block/code-block';
import Pivot from '@essence-ui/components/ui/pivot';
import styles from './pivot-page.module.css';

export const PivotPage = () => {
	const product = {
		name: 'Essence',
	};
	const datePickerCode = `<DatePicker date={new Date()} onAccept={date => console.log(date)} />`;
	const disabledDatePickerCode = `<DatePicker date={new Date()} onAccept={date => console.log(date)} disabled />`;
	const customDatePickerCode = `<DatePicker date={new Date()} onAccept={date => console.log(date)} className={styles['custom-date-picker-theme']} />`;
	const customStyle = `.custom-date-picker-theme {
    --color-theme: green;
}`;
	const pivotItems = [
		{
			title: 'Page 1',
			child: (
				<ul>
					<li>List Item 1</li>
					<li>List Item 2</li>
					<li>List Item 3</li>
					<li>List Item 4</li>
					<li>List Item 5</li>
					<li>List Item 6</li>
					<li>List Item 7</li>
					<li>List Item 8</li>
					<li>List Item 9</li>
					<li>List Item 10</li>
					<li>List Item 11</li>
					<li>List Item 12</li>
					<li>List Item 13</li>
					<li>List Item 14</li>
					<li>List Item 15</li>
					<li>List Item 16</li>
					<li>List Item 17</li>
					<li>List Item 18</li>
					<li>List Item 19</li>
					<li>List Item 20</li>
				</ul>
			),
		},
		{
			title: 'Page 2',
			child: <div>Content for Page 2</div>,
		},
		{
			title: 'Page 3',
			child: <div>Content for Page 3</div>,
		},
	];
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>
			<div style={{ width: '25vw', height: '70vh', border: '1px solid var(--color-theme)' }} className="mt-8">
				<Pivot title={'pivot title'} pivotItems={pivotItems} className="pivot" />
			</div>

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { Pivot } from '@essence-ui/components/ui/pivot';"></CodeBlock>
		</div>
	);
};
