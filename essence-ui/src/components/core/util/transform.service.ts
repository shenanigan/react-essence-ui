export const transformRotation = (element: HTMLElement, x: number, y: number): void => {
	if (element.style.transform.indexOf('rotateX(') < 0) {
		element.style.transform += ` rotateX(${x}deg) rotateY(${y}deg) `;
	} else {
		element.style.transform = element.style.transform.replace(
			/rotateX\(.*deg\) rotateY\(.*deg\)/,
			`rotateX(${x}deg) rotateY(${y}deg) `,
		);
	}
};

export const transformScale = (element: HTMLElement, scale: number): void => {
	if (element.style.transform.indexOf('scale(') < 0) {
		element.style.transform += ` scale(${scale} `;
	} else {
		element.style.transform = element.style.transform.replace(/scale\([0-9.]*\)/, ` scale(${scale}) `);
	}
};
