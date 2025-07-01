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
						frontTile: (
							<div className="text-2xl font-bold bg-blue-100 h-full w-full flex items-center justify-center">
								Front Tile 1
							</div>
						),
						backTile: (
							<div className="text-2xl font-bold bg-orange-100 h-full w-full flex items-center justify-center">
								Back Tile 1
							</div>
						),
						colSpan: 1,
						key: 1,
						deleteAlertProps: deleteAlertProps,
					},
					{
						frontTile: (
							<div className="text-2xl font-bold bg-red-100 h-full w-full flex items-center justify-center">
								Front Tile 2
							</div>
						),
						backTile: (
							<div className="text-2xl font-bold bg-blue-100 h-full w-full flex items-center justify-center">
								Back Tile 2
							</div>
						),
						colSpan: 3,
						key: 2,
						deleteAlertProps: deleteAlertProps,
					},
					{
						frontTile: (
							<div className="text-2xl font-bold bg-purple-100 h-full w-full flex items-center justify-center">
								Front Tile 3
							</div>
						),
						backTile: (
							<div className="text-2xl font-bold bg-red-100 h-full w-full flex items-center justify-center">
								Back Tile 3
							</div>
						),
						colSpan: 2,
						key: 3,
					},
					{
						frontTile: (
							<div className="text-2xl font-bold bg-orange-100 h-full w-full flex items-center justify-center">
								Front Tile 4
							</div>
						),
						backTile: (
							<div className="text-2xl font-bold bg-purple-100 h-full w-full flex items-center justify-center">
								Back Tile 4
							</div>
						),
						key: 4,
					},
					{
						frontTile: (
							<div className="text-2xl font-bold bg-fuchsia-100 h-full w-full flex items-center justify-center">
								Front Tile 5
							</div>
						),
						backTile: (
							<div className="text-2xl font-bold bg-pink-100 h-full w-full flex items-center justify-center">
								Back Tile 5
							</div>
						),
						colSpan: 0.5,
						key: 5,
					},
					{
						frontTile: (
							<div className="text-2xl font-bold bg-amber-100 h-full w-full flex items-center justify-center">
								Front Tile 6
							</div>
						),
						backTile: (
							<div className="text-2xl font-bold bg-fuchsia-200 h-full w-full flex items-center justify-center">
								Back Tile 6
							</div>
						),
						colSpan: 0.5,
						key: 6,
					},
					{
						frontTile: (
							<div className="text-2xl font-bold bg-green-100 h-full w-full flex items-center justify-center">
								Front Tile 7
							</div>
						),
						backTile: (
							<div className="text-2xl font-bold bg-gray-200 h-full w-full flex items-center justify-center">
								Back Tile 7
							</div>
						),
						colSpan: 0.5,
						key: 7,
					},
					{
						frontTile: (
							<div className="text-2xl font-bold bg-gray-100 h-full w-full flex items-center justify-center">
								Front Tile 8
							</div>
						),
						backTile: (
							<div className="text-2xl font-bold bg-green-100 h-full w-full flex items-center justify-center">
								Back Tile 8
							</div>
						),
						colSpan: 0.5,
						key: 8,
					},
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
