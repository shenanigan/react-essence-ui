import { CodeBlock } from '../../components/code-block/code-block';
import { Link } from 'react-router-dom';
import styles from './tile-page.module.css';
import { Tile } from '@essence-ui/components/ui/tile';

export const TilePage = () => {
	const tileCode = `<Tile frontTile="Front Tile" backTile="Back Tile" />`;
	const customTileCode = `<Tile frontTile="Front Tile" backTile="Back Tile" className={styles['custom-tile-theme']} />`;
	const disabledTileCode = `<Tile frontTile="Front Tile" backTile="Back Tile" disabled />`;
	const customStyle = `.custom-tile-theme {
    --theme-color: green;
}`;

	return (
		<div className="docs-markdown">
			<div className="text-3xl font-bold">Demo</div>
			<Tile
				frontTile={<div className="text-2xl font-bold">Front Tile</div>}
				backTile={<div className="text-2xl font-bold">Back Tile</div>}
				className="mt-3"
				onClick={() => {
					console.log('clicked');
				}}
				animationDuration={2500}
				rowSpan={2}
				columnSpan={1}
			/>

			<div className="text-2xl font-bold mt-8">Import the component</div>
			<CodeBlock fileName="sample.tsx" code="import { Tile } from '@essence-ui/components/ui/tile';"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Use the component</div>
			<CodeBlock fileName="sample.tsx" code={tileCode} language="html"></CodeBlock>

			<div className="text-2xl font-bold mt-8">Disabled Input</div>
			<CodeBlock fileName="sample.tsx" code={disabledTileCode} language="html"></CodeBlock>
			<Tile frontTile="Front Tile" backTile="Back Tile" className="mt-3" />

			<div className="text-3xl font-bold mt-8">About</div>
			<p className="mt-3">
				Input is a reusable component that can be used to display a text input. It is a native{' '}
				<code>&lt;input&gt;</code> element enhanced with Essence Design styling. <code>&lt;Input&gt;</code>{' '}
				provides the most straightforward and accessible experience for users.
			</p>
			<div className="text-3xl font-bold mt-8">Theming</div>

			<p className="mt-3">To change the theme color of the input apply a custom class as below.</p>

			<CodeBlock fileName="sample.tsx" code={customTileCode} language="tsx"></CodeBlock>

			<p>In your css file</p>
			<CodeBlock fileName="sample.css" code={customStyle} language="css"></CodeBlock>
			<Tile frontTile="Front Tile" backTile="Back Tile" className={styles['custom-tile-theme']} />
			<p className="mt-10">
				For changing the overall theme for all elements, check the <Link to="/theme">Theme</Link> section.
			</p>
		</div>
	);
};
