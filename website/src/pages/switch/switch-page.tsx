import { CodeBlock } from '../../components/code-block/code-block';
import { Switch } from '@essence-ui/components/ui/switch';
import styles from './switch-page.module.css';
import { Link } from 'react-router-dom';

export const SwitchPage = () => {
	const product = {
		name: 'Essence',
	};
	const switchCode = `<Switch text="Hello World" />`;
	const disabledSwitchCode = `<Switch disabled={true} text="Hello World" />`;
	const customSwitchCode = `<Switch className={styles['custom-switch-theme']} text="Hello World" />`;
	const defaultCheckedSwitchCode = `<Switch text="Hello World" defaultChecked />`;
	const customStyle = `.custom-switch-theme {
    --theme-color: green;
}`;
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>
			<div className="flex justify-center">
				<Switch className="mt-3" text="Hello World" />
			</div>

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { Switch } from '@essence-ui/components/ui/switch';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock fileName="sample.tsx" code={switchCode} language="html"></CodeBlock>
			<Switch text="Hello World" />

			<div className="text-2xl font-bold mt-8">Disabled Switch</div>
			<CodeBlock fileName="sample.tsx" code={disabledSwitchCode} language="html"></CodeBlock>
			<Switch text="Hello World" disabled={true} />

			<div className="text-2xl font-bold mt-8">Default Checked Switch</div>
			<CodeBlock fileName="sample.tsx" code={defaultCheckedSwitchCode} language="html"></CodeBlock>
			<Switch text="Hello World" defaultChecked />

			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				{product.name} switches are native <code>&lt;input&gt;</code> elements enhanced with {product.name}{' '}
				Design styling. Native <code>&lt;input&gt;</code> elements are always used in order to provide the most
				straightforward and accessible experience for users. A <code>&lt;Switch&gt;</code> element should be
				used whenever some action is performed.
			</p>

			<div className="text-3xl font-bold mt-8">Theming</div>
			<p className="mt-3">To change the color of the button on hover apply a custom class as below.</p>
			<CodeBlock fileName="sample.tsx" code={customSwitchCode} language="tsx"></CodeBlock>

			<p>In your css file</p>
			<CodeBlock fileName="sample.css" code={customStyle} language="css"></CodeBlock>
			<Switch defaultChecked className={styles['custom-switch-theme']} text="Hello World" />
			<p className="mt-3">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
