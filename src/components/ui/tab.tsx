import { Children } from "@kitajs/html";
import { cn } from "~/lib/utils";

export function Tab({
	children,
	value,
	id,
	class: className,
}: {
	children: Children;
	value: string;
	id?: string;
	class?: string;
}) {
	return (
		<div id={id} data-value={value} class={cn("tab-root py-1 flex-col flex gap-2", className)}>
			<div class="tab-trigger-slot outline w-fit outline-border inline-flex items-center rounded-lg bg-muted text-muted-foreground"></div>
			<div>{children}</div>
		</div>
	);
}

export function TabContent({
	children,
	trigger,
	value,
	class: className,
}: {
	children: Children;
	trigger: string;
	value: string;
	class?: string;
}) {
	return (
		<div hidden data-value={value} class={cn("tab-content", className)}>
			<button
				class={cn(
					"tab-trigger inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
					className
				)}
			>
				{trigger}
			</button>
			{children}
		</div>
	);
}
