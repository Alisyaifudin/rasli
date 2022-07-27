import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Portal from "./Portal";

interface ModalProps {
	children: React.ReactElement | React.ReactElement[];
	open: boolean;
	onClose?: () => void;
	className?: string;
	classNames?: {
		portal?: string;
	}
}

function Modal({ children, onClose, open, className, classNames: clasNames }: ModalProps) {
	const [mounted, setMounted] = useState(false);
	const handleClickClose = () => {
		setMounted(false);
		setTimeout(() => onClose?.(), 200);
	};
	const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
		if (e.code === "Escape") handleClickClose();
	};
	useEffect(() => {
		document.body.addEventListener("keydown", closeOnEscapeKeyDown);
		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (open) {
			setTimeout(() => setMounted(true), 10);
		} else setMounted(false);
	}, [open]);
	return (
		<Portal>
			{open && (
				<div
					onMouseDown={handleClickClose}
					className={twMerge(
						"fixed  z-20 left-0 right-0 top-0 bottom-0 dark:bg-white/20 bg-black/50 flex items-center justify-center transition duration-200",
						mounted ? "opacity-100" : "opacity-0 pointer-events-none",
						clasNames?.portal
					)}
				>
					<div
						onMouseDown={(event) => event.stopPropagation()}
						className={twMerge(
							"max-w-[500px] mx-2 z-30 w-full dark:bg-zinc-800 max-h-[95%] bg-white rounded-lg p-2 relative overflow-y-auto",
							className
						)}
					>
						{children}
					</div>
				</div>
			)}
		</Portal>
	);
}

export default Modal;
