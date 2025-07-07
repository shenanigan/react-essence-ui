import { useCallback, useEffect, useRef, useState } from 'react';
import Page from '../page';
import { cn } from '@essence-ui/lib/utils';

interface PanoramaItem {
	title: string | React.ReactNode;
	child: React.ReactNode;
	grow?: number;
}
interface PanoramaProps extends React.ComponentProps<'div'> {
	title: string;
	index?: number;
	panoramaItems: PanoramaItem[];
	titleParallax?: boolean;
}
export default function Panorama({ title, panoramaItems, index, titleParallax = true, ...props }: PanoramaProps) {
	const panoramaTitleRef = useRef<HTMLDivElement | null>(null);
	const panoramaContainerRef = useRef<HTMLDivElement | null>(null);
	const componentContainer = useRef<HTMLDivElement | null>(null);
	const [currentIndex, setCurrentIndex] = useState(index ?? 0);

	useEffect(() => {
		if (panoramaContainerRef.current && !panoramaContainerRef.current?.style.backgroundPositionX) {
			panoramaContainerRef.current.style.backgroundPositionX = `0px`;
		}
	}, [panoramaContainerRef]);

	const scrollToIndex = useCallback(
		(i: number, behavior: ScrollBehavior) => {
			componentContainer.current?.scrollTo({
				left: (componentContainer.current.scrollWidth / panoramaItems.length) * i,
				behavior,
			});
		},
		[panoramaItems.length],
	);

	const onScroll = () => {
		if (componentContainer.current) {
			let index = 0;
			let breakpoint = 0;
			const children = componentContainer.current.children;
			for (let i = 0; i < children.length; i++) {
				const containerWidth = children[i].clientWidth;
				if (componentContainer.current.scrollLeft < breakpoint + containerWidth) {
					index = i;
					break;
				} else {
					breakpoint += containerWidth;
				}
			}

			if (panoramaTitleRef.current && titleParallax) {
				panoramaTitleRef.current.style.marginLeft = `${16 + (-1 * componentContainer.current.scrollLeft) / 5}px`;
			}

			if (panoramaContainerRef.current && titleParallax) {
				const newBackgroundPositionX = (-1 * componentContainer.current.scrollLeft) / 5;
				panoramaContainerRef.current.style.backgroundPositionX = `${newBackgroundPositionX}px`;
			}

			setCurrentIndex(index);
		}
	};

	const onTitleClick = (i: number) => {
		scrollToIndex(i, 'smooth');
	};

	return (
		<div ref={panoramaContainerRef} className={cn('panorama-container', props.className)}>
			<div ref={panoramaTitleRef} className={cn('panorama-title', 'h1')}>
				{title}
			</div>

			<div ref={componentContainer} className={'panorama-component-container'} onScroll={onScroll}>
				{panoramaItems.map((panoramaItem, i) => {
					return (
						<Page
							key={i}
							title={panoramaItem.title}
							onTitleClick={() => {
								onTitleClick(i);
							}}>
							{panoramaItem.child}
						</Page>
					);
				})}
			</div>
			<div className={'panorama-dots-container'}>
				{panoramaItems.map((_, i) => {
					return (
						<div
							key={i}
							onClick={() => {
								onTitleClick(i);
							}}>
							<div className={cn('panorama-dots', i === currentIndex ? 'active' : '')}></div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
