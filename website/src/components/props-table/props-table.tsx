import { cn } from '@essence-ui/lib/utils';
import styles from './props-table.module.css';

export interface PropsTableItem {
	name: string;
	description?: string | React.ReactNode;
	type?: string | React.ReactNode;
	required?: boolean;
}
export interface PropsTableProps {
	items: PropsTableItem[];
	className?: string;
}
export const PropsTable = ({ items, className }: PropsTableProps) => {
	return (
		<table className={cn(styles['props-table'], className)}>
			<thead>
				<tr>
					<th className="h6">Name</th>
					<th className="h6">Type</th>
					<th className="h6">Description</th>
					<th className="h6">Required</th>
				</tr>
			</thead>
			<tbody>
				{items.map(item => (
					<tr key={item.name}>
						<td className="subtitle-1">{item.name}</td>
						<td className="subtitle-1">{item.type}</td>
						<td className="subtitle-1">{item.description}</td>
						<td className="subtitle-1">{item.required ? 'Yes' : 'No'}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
