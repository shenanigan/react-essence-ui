import { CodeBlock } from '../../components/code-block/code-block';
import { TextArea } from '@essence-ui/components/ui/text-area';
import { Link } from 'react-router-dom';
import styles from './text-area-page.module.css';

export const TextAreaPage = () => {
	const inputCode = `<TextArea placeholder="sample placeholder" />`;
	const customInputCode = `<TextArea placeholder="sample placeholder" className="custom-text-area-theme" />`;
	const disabledInputCode = `<TextArea placeholder="sample placeholder" disabled />`;
	const customStyle = `.custom-text-area-theme {
    --theme-color: green;
}`;

	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>

			<TextArea placeholder="sample placeholder" className="mt-3" />

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { TextArea } from '@essence-ui/components/ui/text-area';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock fileName="sample.tsx" code={inputCode} language="html"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Disabled Input</div>
			<CodeBlock fileName="sample.tsx" code={disabledInputCode} language="html"></CodeBlock>
			<TextArea placeholder="sample placeholder" disabled />

			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				Input is a reusable component that can be used to display a text input. It is a native{' '}
				<code>&lt;input&gt;</code> element enhanced with Essence Design styling. <code>&lt;Input&gt;</code>{' '}
				provides the most straightforward and accessible experience for users.
			</p>
			<div className="text-3xl font-bold mt-8">Theming</div>

			<p className="mt-3">To change the theme color of the input apply a custom class as below.</p>

			<CodeBlock fileName="sample.tsx" code={customInputCode} language="html"></CodeBlock>

			<p>In your css file</p>
			<CodeBlock fileName="sample.css" code={customStyle} language="css"></CodeBlock>
			<TextArea placeholder="sample placeholder" className={styles['custom-text-area-theme']} />
			<p className="mt-10">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
