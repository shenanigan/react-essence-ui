import { CodeBlock } from '../../components/code-block/code-block';
import { Alert } from '@essence-ui/components/ui/alert';
import { useState } from 'react';
import { Button } from '@essence-ui/components/ui/button';

export const AlertPage = () => {
	const textButtonCode = `{showAlert && (
		<Alert
			message="Hello World"
			okButton="OK"
			dismissButton="Cancel"
			onOk={handleOk}
			onDismiss={handleDismiss}
		/>
	)}`;

	const [showAlert, setShowAlert] = useState(false);
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>
			{showAlert && (
				<Alert
					message="Hello World"
					okButton="OK"
					dismissButton="Cancel"
					className="mt-3"
					onOk={() => setShowAlert(false)}
					onDismiss={() => setShowAlert(false)}
				/>
			)}
			<Button className="mt-3" onClick={() => setShowAlert(true)}>
				Show Alert
			</Button>
			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock
				fileName="sample.tsx"
				code="import { Alert } from '@essence-ui/components/ui/alert';"></CodeBlock>
			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock fileName="sample.tsx" code={textButtonCode} language="tsx"></CodeBlock>
			<Button onClick={() => setShowAlert(true)}>Show Alert</Button>
			<p className="mt-10">
				You can hide the dismiss button by not setting the <code>dismissButton</code> property.
			</p>
		</div>
	);
};
