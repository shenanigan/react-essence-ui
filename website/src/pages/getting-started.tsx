import { CodeBlock } from '../components/code-block/code-block';

function GettingStarted() {
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Install the library</div>
			<p className="mt-3">
				You can install the library using the <code>npm install</code> command. To install the library, run the
				following command:
			</p>
			<CodeBlock fileName="terminal" code="npm install @essence-ui/components" language="bash"></CodeBlock>

			<div className="text-3xl font-bold mt-8">Import the component</div>
			<p className="mt-3">
				To use the components you can import the respective components. e.g. Import a button component in your
				tsx file as below.
			</p>
			<CodeBlock
				fileName="sample.tsx"
				code="import { Button } from '@essence-ui/components/ui/button';"></CodeBlock>

			<div className="text-3xl font-bold mt-8">Use the component</div>
			<p className="mt-3">You can use the component as below.</p>
			<CodeBlock
				fileName="sample.tsx"
				code="&lt;Button&gt;Hello World&lt;/Button&gt;"
				language="html"></CodeBlock>
		</div>
	);
}

export default GettingStarted;
