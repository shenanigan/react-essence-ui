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
	const deleteAlertProps = {
		message: 'Are you sure you want to delete this nice tile?',
		okButton: 'Delete',
		dismissButton: 'Cancel',
	};

	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>
			<Grid
				className={'mt-3'}
				onTileSizeChanged={(key, colSpan, tiles) => {
					console.log('onTileSizeChanged', key, colSpan, tiles);
				}}
				onTileMovePrevious={(key, tiles) => {
					console.log('onTileMovePrevious', key, tiles);
				}}
				onTileMoveNext={(key, tiles) => {
					console.log('onTileMoveNext', key, tiles);
				}}
				onTileDelete={(key, tiles) => {
					console.log('onTileDelete', key, tiles);
				}}
				tiles={[
					{
						frontTile: 'Front Tile 1',
						backTile: 'Back Tile 1',
						colSpan: 1,
						key: 1,
						deleteAlertProps: deleteAlertProps,
					},
					{
						frontTile: 'Front Tile 2',
						backTile: 'Back Tile 2',
						colSpan: 3,
						key: 2,
						deleteAlertProps: deleteAlertProps,
					},
					{
						frontTile: 'Front Tile 3',
						backTile: 'Back Tile 3',
						colSpan: 0.5,
						key: 3,
						canShowControls: false,
					},
					{ frontTile: 'Front Tile 4', backTile: 'Back Tile 4', colSpan: 0.5, key: 4 },
					{ frontTile: 'Front Tile 5', backTile: 'Back Tile 5', colSpan: 0.5, key: 5 },
					{ frontTile: 'Front Tile 6', backTile: 'Back Tile 6', colSpan: 0.5, key: 6 },
					{ frontTile: 'Front Tile 7', backTile: 'Back Tile 7', colSpan: 2, key: 7 },
					{ frontTile: 'Front Tile 8', backTile: 'Back Tile 8', colSpan: 1, key: 8 },
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
					{ frontTile: 'Front Tile', backTile: 'Back Tile', key: 1 },
					{ frontTile: 'Front Tile', backTile: 'Back Tile', key: 2 },
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
					{ frontTile: 'Front Tile', backTile: 'Back Tile', key: 1 },
					{ frontTile: 'Front Tile', backTile: 'Back Tile', key: 2 },
				]}></Grid>
			<p className="mt-10">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
