import { useMemo, useRef } from "react";

export function isTouchEvent({ nativeEvent }) {
	return window.TouchEvent
		? nativeEvent instanceof TouchEvent
		: "touches" in nativeEvent;
}

export function isMouseEvent(event) {
	return event.nativeEvent instanceof MouseEvent;
}

export default function useLoongPress(callback, options = {}) {
	const {
		threshold = 400,
		onStart,
		onFinish,
		onCancel,
		moveThreshold = 10,
	} = options;
	const isLongPressActive = useRef(false);
	const isPressed = useRef(false);
	const timerId = useRef();
	const startX = useRef(0);
	const startY = useRef(0);

	return useMemo(() => {
		if (typeof callback !== "function") {
			return {};
		}

		const start = (event) => {
			if (!isMouseEvent(event) && !isTouchEvent(event)) return;

			const { clientX, clientY } = event.nativeEvent.touches
				? event.nativeEvent.touches[0]
				: event.nativeEvent;

			startX.current = clientX;
			startY.current = clientY;

			if (onStart) {
				onStart(event);
			}

			isPressed.current = true;
			timerId.current = setTimeout(() => {
				callback(event);
				isLongPressActive.current = true;
			}, threshold);
		};

		const move = (event) => {
			if (!isPressed.current || !isTouchEvent(event)) return;

			const { clientX, clientY } = event.nativeEvent.touches[0];
			const dx = Math.abs(clientX - startX.current);
			const dy = Math.abs(clientY - startY.current);

			if (dx > moveThreshold || dy > moveThreshold) {
				cancel(event);
			}
		};

		const cancel = (event) => {
			if (!isMouseEvent(event) && !isTouchEvent(event)) return;

			if (isLongPressActive.current) {
				if (onFinish) {
					onFinish(event);
				}
			} else if (isPressed.current) {
				if (onCancel) {
					onCancel(event);
				}
			}

			isLongPressActive.current = false;
			isPressed.current = false;

			if (timerId.current) {
				window.clearTimeout(timerId.current);
			}
		};

		const mouseHandlers = {
			onMouseDown: start,
			onMouseUp: cancel,
			onMouseLeave: cancel,
		};

		const touchHandlers = {
			onTouchStart: start,
			onTouchMove: move, // Track finger movement
			onTouchEnd: cancel,
			onTouchCancel: cancel,
		};

		return { ...mouseHandlers, ...touchHandlers };
	}, [callback, threshold, onCancel, onFinish, onStart, moveThreshold]);
}
