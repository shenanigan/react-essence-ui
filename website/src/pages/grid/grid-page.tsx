import { CodeBlock } from '../../components/code-block/code-block';
import { Link } from 'react-router-dom';
import styles from './grid-page.module.css';
import { Grid } from '@essence-ui/components/ui/grid';

export const GridPage = () => {
	const gridCode = `<Grid>
		<Tile frontTile="Front Tile" backTile="Back Tile" />
		<Tile frontTile="Front Tile" backTile="Back Tile" />
	</Grid>`;

	const customGridCode = `<Grid className={styles['custom-grid-theme']}>
		<Tile frontTile="Front Tile" backTile="Back Tile" />
		<Tile frontTile="Front Tile" backTile="Back Tile" />
	</Grid>`;

	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>
			<Grid
				className={'mt-3'}
				tiles={[
					{ frontTile: 'Front Tile 1', backTile: 'Back Tile 1', columnSpan: 1 },
					{ frontTile: 'Front Tile 2', backTile: 'Back Tile 2', columnSpan: 3 },
					{ frontTile: 'Front Tile 3', backTile: 'Back Tile 3', columnSpan: 0.5 },
					{ frontTile: 'Front Tile 4', backTile: 'Back Tile 4', columnSpan: 0.5 },
					{ frontTile: 'Front Tile 5', backTile: 'Back Tile 5', columnSpan: 0.5 },
					{ frontTile: 'Front Tile 6', backTile: 'Back Tile 6', columnSpan: 0.5 },
					{ frontTile: 'Front Tile 7', backTile: 'Back Tile 7', columnSpan: 2 },
					{ frontTile: 'Front Tile 8', backTile: 'Back Tile 8', columnSpan: 1 },
				]}></Grid>

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock fileName="sample.tsx" code="import { Tile } from '@essence-ui/components/ui/tile';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock fileName="sample.tsx" code={gridCode} language="html"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Disabled Input</div>
			<CodeBlock fileName="sample.tsx" code={customGridCode} language="html"></CodeBlock>
			<Grid
				className={styles['custom-grid-theme']}
				tiles={[
					{ frontTile: 'Front Tile', backTile: 'Back Tile' },
					{ frontTile: 'Front Tile', backTile: 'Back Tile' },
				]}></Grid>

			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				Input is a reusable component that can be used to display a text input. It is a native{' '}
				<code>&lt;input&gt;</code> element enhanced with Essence Design styling. <code>&lt;Input&gt;</code>{' '}
				provides the most straightforward and accessible experience for users.
			</p>
			<div className="text-3xl font-bold mt-8">Theming</div>

			<p className="mt-3">To change the theme color of the input apply a custom class as below.</p>

			<CodeBlock fileName="sample.tsx" code={customGridCode} language="tsx"></CodeBlock>

			<p>In your css file</p>
			<CodeBlock fileName="sample.css" code={customGridCode} language="css"></CodeBlock>
			<Grid
				className={styles['custom-grid-theme']}
				tiles={[
					{ frontTile: 'Front Tile', backTile: 'Back Tile' },
					{ frontTile: 'Front Tile', backTile: 'Back Tile' },
				]}></Grid>
			<p className="mt-10">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
