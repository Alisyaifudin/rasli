import { Children } from "@kitajs/html";
import { Button, ButtonProps } from "./button";
import { X } from "~/icons/x";
import { cn } from "~/lib/utils";

export function DialogTrigger({ class: className, ...props }: ButtonProps) {
	return <Button {...props} class={cn(className, "dialog-trigger")} />;
}

export function DialogTitle({ children }: { children: Children }) {
	return <div class="dialog-title flex justify-center sm:justify-start flex-1">{children}</div>;
}

export function DialogContent({ children }: { children: Children }) {
	return (
		<dialog class="bg-black/80 dialog-el">
			<div class="flex items-center justify-center h-full dialog-backdrop">
				<div class="bg-white max-h-[90%] pb-8 overflow-hidden dark:bg-zinc-800 card flex flex-col gap-2 dark:text-white p-1 w-full max-w-lg sm:rounded-lg dialog-card duration-200">
					<div class="flex items-center justify-between pl-6 pb-4">
						<div class="dialog-title-slot" />
						<Button class="dialog-close" size="icon" variant="outline" autofocus>
							<X />
						</Button>
					</div>
					{children}
				</div>
			</div>
		</dialog>
	);
}

export function Dialog({ children }: { children: Children }) {
	return <div class="dialog-root">{children}</div>;
}
