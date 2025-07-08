import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CodeBlock } from '../../components/code-block/code-block';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@essence-ui/components/ui/button';
import styles from './button-page.module.css';
import { Link } from 'react-router-dom';

export const ButtonPage = () => {
	const product = {
		name: 'Essence',
	};
	const textButtonCode = `<Button>Hello World</Button>`;
	const disabledButtonCode = `<Button disabled>Hello World</Button>`;
	const iconButtonCode = `<Button><FontAwesomeIcon icon={faCoffee} className="me-2" />Hello World</Button>`;
	const customButtonCode = `<Button className={styles['custom-button-theme']}>Hello World</Button>`;
	const customStyle = `.custom-button-theme {
    --color-theme: green;
}`;
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>
			<Button className="mt-3">Hello World</Button>

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { Button } from '@essence-ui/components/ui/button';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Text Button</div>
			<CodeBlock fileName="sample.tsx" code={textButtonCode} language="html"></CodeBlock>
			<Button>Hello World</Button>

			<div className="text-3xl font-bold mt-8">Props</div>
			<p className="mt-3">
				Button component accepts all the props of <code>React.ComponentProps&lt;'button'&gt;</code>.
			</p>

			<div className="text-2xl font-bold mt-8">Disabled Button</div>
			<CodeBlock fileName="sample.tsx" code={disabledButtonCode} language="html"></CodeBlock>
			<Button disabled>Hello World</Button>

			<div className="text-2xl font-bold mt-8">Icon Button</div>

			<CodeBlock fileName="sample.tsx" code={iconButtonCode} language="html"></CodeBlock>
			<Button>
				<FontAwesomeIcon icon={faCoffee} className="me-2" />
				Hello World
			</Button>

			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				{product.name} buttons are native <code>&lt;button&gt;</code> elements enhanced with {product.name}{' '}
				Design styling. Native <code>&lt;button&gt;</code> elements are always used in order to provide the most
				straightforward and accessible experience for users. A <code>&lt;Button&gt;</code> element should be
				used whenever some action is performed.
			</p>

			<div className="text-3xl font-bold mt-8">Capitalization</div>

			<p className="mt-3">
				According to the {product.name} design specification, the button text has to be in lower case. So the
				buttons will have <code>text-transform: lowercase</code> applied by default. The consuming app can
				update the <code>text-transform</code> property as per the requirement.
			</p>

			<div className="text-3xl font-bold mt-8">Theming</div>

			<p className="mt-3">To change the color of the button on hover apply a custom class as below.</p>

			<CodeBlock fileName="sample.tsx" code={customButtonCode} language="tsx"></CodeBlock>

			<p>In your module css file</p>
			<CodeBlock fileName="sample.module.css" code={customStyle} language="css"></CodeBlock>
			<Button className={styles['custom-button-theme']}>Hello World</Button>
			<p className="mt-3">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>

			<div className="text-3xl font-bold mt-8">Accessiblity</div>
			<p className="mt-3">
				{product.name} uses native <code>&lt;button&gt;</code> elements to ensure an accessible experience by
				default. All standard accessibility best practices for buttons apply to <code>Button</code>.
			</p>
		</div>
	);
};
