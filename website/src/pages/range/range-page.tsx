import { CodeBlock } from '../../components/code-block/code-block';
import { Range } from '@essence-ui/components/ui/range';
import { Link } from 'react-router-dom';
import styles from './range-page.module.css';
import { cn } from '@essence-ui/lib/utils';

export const RangePage = () => {
	const product = {
		name: 'Essence',
	};
	const rangeCode = `<Range />`;
	const disabledRangeCode = `<Range disabled />`;
	const customRangeCode = `<Range className={styles['custom-range-theme']} />`;
	const customStyle = `.custom-range-theme {
    --color-theme: green;
}`;
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>

			<Range className="w-1/2 mt-3" />

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { Range } from '@essence-ui/components/ui/range';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock fileName="sample.tsx" code={rangeCode} language="html"></CodeBlock>
			<Range className="w-1/2" />

			<div className="text-2xl font-bold mt-8">Disabled Range</div>
			<CodeBlock fileName="sample.tsx" code={disabledRangeCode} language="html"></CodeBlock>
			<Range className="w-1/2" disabled />

			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				{product.name} range is a native <code>&lt;input&gt;</code> element enhanced with {product.name} Design
				styling. Native <code>&lt;input&gt;</code> elements are always used in order to provide the most
				straightforward and accessible experience for users. A <code>&lt;Range&gt;</code> element should be used
				whenever some action is performed.
			</p>

			<div className="text-3xl font-bold mt-8">Theming</div>
			<p className="mt-3">To change the color of the button on hover apply a custom class as below.</p>
			<CodeBlock fileName="sample.tsx" code={customRangeCode} language="tsx"></CodeBlock>

			<p>In your css file</p>
			<CodeBlock fileName="sample.css" code={customStyle} language="css"></CodeBlock>
			<Range className={cn('w-1/2', styles['custom-range-theme'])} />
			<p className="mt-3">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
