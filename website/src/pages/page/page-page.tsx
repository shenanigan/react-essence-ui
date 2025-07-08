import { CodeBlock } from '../../components/code-block/code-block';
import Page from '@essence-ui/components/ui/page';
import styles from './page-page.module.css';

export const PagePage = () => {
	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>
			<div style={{ width: '25vw', height: '70vh', border: '1px solid var(--color-theme)' }} className="mt-8">
				<Page title={'page title'} className={styles.page}>
					<div>page content</div>
				</Page>
			</div>

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock fileName="sample.tsx" code="import { Page } from '@essence-ui/components/ui/page';"></CodeBlock>
		</div>
	);
};
