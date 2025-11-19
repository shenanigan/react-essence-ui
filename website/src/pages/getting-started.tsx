import { CodeBlock } from '../components/code-block/code-block';

function GettingStarted() {
	return (
		<div className="docs-markdown">
			<h1 className="text-3xl font-bold">Install the library</h1>
			<p className="mt-3">
				You can install the library using the <code>npm install</code> command. To install the library, run the
				following command:
			</p>
			<CodeBlock fileName="terminal" code="npm install @wp-essence-ui/components" language="bash"></CodeBlock>

			<h1 className="text-3xl font-bold mt-8">Import the component</h1>
			<p className="mt-3">
				To use the components you can import the respective components. e.g. Import a button component in your
				tsx file as below.
			</p>
			<CodeBlock fileName="sample.tsx" code="import { Button } from '@wp-essence-ui/components';"></CodeBlock>

			<h1 className="text-3xl font-bold mt-8">Use the component</h1>
			<p className="mt-3">You can use the component as below.</p>
			<CodeBlock
				fileName="sample.tsx"
				code="&lt;Button&gt;Hello World&lt;/Button&gt;"
				language="html"></CodeBlock>
		</div>
	);
}

export default GettingStarted;
