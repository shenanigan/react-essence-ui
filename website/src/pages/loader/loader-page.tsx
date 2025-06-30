import { CodeBlock } from '../../components/code-block/code-block';
import { Loader } from '@essence-ui/components/ui/loader';
import { Link } from 'react-router-dom';
import styles from './loader-page.module.css';

export const LoaderPage = () => {
	const loaderCode = `<Loader />`;
	const customLoaderCode = `<Loader className={styles['custom-loader-theme']} />`;
	const customStyle = `.custom-loader-theme {
    --theme-color: green;
}`;
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>
			<Loader className="mt-3" />

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { Loader } from '@essence-ui/components/ui/loader';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock fileName="sample.tsx" code={loaderCode} language="html"></CodeBlock>

			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				Loader is a reusable component that can be used to display an infinite indicator while an asynchronous
				operation is in progress. To display a finite progress instead of the infinite one, check the{' '}
				<Link to="/components/progress-bar">Progress Bar</Link> component.
			</p>

			<div className="text-3xl font-bold mt-8">Theming</div>

			<p className="mt-3">To change the color of the loader apply a custom class as below.</p>

			<CodeBlock fileName="sample.tsx" code={customLoaderCode} language="tsx"></CodeBlock>

			<p>In your css file</p>
			<CodeBlock fileName="sample.css" code={customStyle} language="css"></CodeBlock>
			<Loader className={`${styles['custom-loader-theme']}`} />
			<p className="mt-10">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
