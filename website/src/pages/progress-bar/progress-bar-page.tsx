import { CodeBlock } from '../../components/code-block/code-block';
import { ProgressBar } from '@essence-ui/components/ui/progress-bar';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './progress-bar-page.module.css';

export const ProgressBarPage = () => {
	const progressBarCode = `<ProgressBar value={value} />`;
	const customProgressBarCode = `<ProgressBar value={value} className={styles['custom-progress-bar-theme']} />`;
	const customStyle = `.custom-progress-bar-theme {
    --color-theme: green;
}`;
	const [value, setValue] = useState(10);
	useEffect(() => {
		const interval = setInterval(() => {
			if (value < 100) {
				setValue(value + 5);
			} else {
				setValue(10);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [value]);
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>
			<ProgressBar value={value} className="mt-3" />

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { ProgressBar } from '@essence-ui/components/ui/progress-bar';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock fileName="sample.tsx" code={progressBarCode} language="html"></CodeBlock>

			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				ProgressBar is a reusable component that can be used to display a progress indicator.
			</p>

			<div className="text-3xl font-bold mt-8">Theming</div>

			<p className="mt-3">To change the color of the progress bar apply a custom class as below.</p>

			<CodeBlock fileName="sample.tsx" code={customProgressBarCode} language="tsx"></CodeBlock>

			<p>In your css file</p>
			<CodeBlock fileName="sample.css" code={customStyle} language="css"></CodeBlock>
			<ProgressBar value={value} className={styles['custom-progress-bar-theme']} />
			<p className="mt-10">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
