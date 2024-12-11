import { useMemo, useRef, useState } from "react";

export function isTouchEvent({nativeEvent}){
    return window.TouchEvent ? nativeEvent instanceof TouchEvent : "touches" in nativeEvent;
}

export function isMouseEvent(event){
    return event.nativeEvent instanceof MouseEvent;
}

export default function useLongPress(callback, options = {}){
    const {
		threshold = 400,
		onStart,
		onFinish,
		onCancel,
		movementThreshold = 10,
	} = options;
    const isLongPressActive = useRef(false);
    const isPressed = useRef(false)
    const timerId = useRef()
    const [startPosition, setStartPosition] = useState(null);

    return useMemo(() => {
		if (typeof callback !== "function") {
			return {};
		}
		const start = (event) => {
			if (!isMouseEvent(event) && !isTouchEvent(event)) return;
			if (onStart) {
				onStart(event);
			}
			isPressed.current = true;
			setStartPosition({ x: event.clientX, y: event.clientY });

			timerId.current = setTimeout(() => {
				callback(event);
				isLongPressActive.current = true;
			}, threshold);
		};

		const cancel = (event) => {
			if (!isMouseEvent(event) && !isTouchEvent(event)) return;
			if (isLongPressActive.current || isPressed.current) {
				if (startPosition) {
					const dx = Math.abs(event.clientX - startPosition.x);
					const dy = Math.abs(event.clientY - startPosition.y);
					if (dx > movementThreshold || dy > movementThreshold) {
						if (onCancel) {
							onCancel(event);
						}
					} else if (isLongPressActive.current && onFinish) {
						onFinish(event);
					}
				}
			}
			isLongPressActive.current = false;
			isPressed.current = false;
			setStartPosition(null);
			if (timerId.current) {
				window.clearTimeout(timerId.current);
			}
		};

		const mouseHandlers = {
			onMouseDown: start,
			onMouseUp: cancel,
			onMouseLeace: cancel,
			onMouseMove: (e) => {
				cancel(e);
			},
		};

		const touchHandlers = {
			onTouchStart: start,
			onTouchEnd: cancel,
			onTouchMove: (e) => {
				cancel(e);
			},
		};
		return { ...mouseHandlers, ...touchHandlers };
	}, [callback, threshold, onCancel, onFinish, onStart, movementThreshold]);
}