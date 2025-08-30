import { useCallback, useRef, useState } from 'react';
import { cn } from '@essence-ui/lib/utils';

interface PivotItem {
	title: string;
	child: React.ReactNode;
}
interface PivotProps extends React.ComponentProps<'div'> {
	title: string;
	index?: number;
	pivotItems: PivotItem[];
}
function Pivot({ title, pivotItems, index, ...props }: PivotProps) {
	const pivotTitleRef = useRef<HTMLDivElement | null>(null);
	const componentContainer = useRef<HTMLDivElement | null>(null);
	const [currentIndex, setCurrentIndex] = useState(index ?? 0);

	const scrollToIndex = useCallback(
		(i: number, behavior: ScrollBehavior) => {
			componentContainer.current?.scrollTo({
				left: (componentContainer.current.scrollWidth / pivotItems.length) * i,
				behavior,
			});
		},
		[pivotItems.length],
	);

	const onScroll = () => {
		if (componentContainer.current) {
			let index = 0;
			let breakpoint = 0;
			const children = componentContainer.current.children;
			for (let i = 0; i < children.length; i++) {
				const containerWidth = children[i].clientWidth;
				if (Math.ceil(componentContainer.current.scrollLeft + 5) <= breakpoint + containerWidth) {
					index = i;
					break;
				} else {
					breakpoint += containerWidth;
				}
			}
			const scrollPercentage =
				(componentContainer.current.scrollLeft - index * children[0].clientWidth) /
				componentContainer.current.clientWidth;

			const titleWidths: number[] = [];
			for (let i = 0; i < (pivotTitleRef.current?.children.length ?? 0); i++) {
				const width = pivotTitleRef.current?.children[i].clientWidth ?? 0;
				titleWidths.push(width);
			}

			if (pivotTitleRef.current) {
				const previousTitleWidth = titleWidths.slice(0, index).reduce((acc, width) => acc + width, 0);
				const width = previousTitleWidth + titleWidths[index] * scrollPercentage;
				pivotTitleRef.current.style.marginLeft = `${-1 * width}px`;
			}

			setCurrentIndex(index);
		}
	};

	const onTitleClick = (i: number) => {
		scrollToIndex(i, 'smooth');
	};

	return (
		<div className={cn('pivot-container', props.className)}>
			<div className={cn('pivot-title', 'subtitle-1')}>{title}</div>
			<div ref={pivotTitleRef} className={'pivot-title-container'}>
				{pivotItems.map((pivotItem, i) => {
					return (
						<div
							key={i}
							className={cn('pivot-page-title', i === currentIndex && 'active-title', 'h3')}
							onClick={() => {
								onTitleClick(i);
							}}>
							{pivotItem.title}
						</div>
					);
				})}
			</div>
			<div ref={componentContainer} className={'pivot-content-container'} onScroll={onScroll}>
				{pivotItems.map((pivotItem, i) => {
					return (
						<div className={'pivot-content'} key={i}>
							{pivotItem.child}
						</div>
					);
				})}
			</div>
			<div className={'pivot-dots-container'}>
				{pivotItems.map((_, i) => {
					return (
						<div
							key={i}
							onClick={() => {
								onTitleClick(i);
							}}>
							<div className={cn('pivot-dots', i === currentIndex && 'active')}></div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export { Pivot, type PivotProps, type PivotItem };
