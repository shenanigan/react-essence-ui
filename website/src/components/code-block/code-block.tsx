import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CodeBlock as ReactEmailCodeBlock, dracula, type PrismLanguage } from '@react-email/code-block';
import styles from './code-block.module.css';
import { useState } from 'react';
export const CodeBlock = ({
	fileName,
	code,
	language = 'typescript',
}: {
	fileName: string;
	code: string;
	language?: PrismLanguage;
}) => {
	const [copied, setCopied] = useState(false);
	const copyToClipboard = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};
	return (
		<div className={styles['code-block']}>
			<div className="flex justify-between items-center p-3">
				<div className="font-style-italic">{fileName}</div>
				<div className="cursor-pointer" onClick={copyToClipboard}>
					{copied ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
				</div>
			</div>

			<ReactEmailCodeBlock
				className={styles['code-block-content']}
				code={code}
				language={language as PrismLanguage}
				theme={dracula}
			/>
		</div>
	);
};
