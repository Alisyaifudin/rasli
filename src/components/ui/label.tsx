import { cn } from "~/lib/utils";

export function Label({ class: className, ...props }: JSX.HtmlLabelTag) {
	return (
		<label
			{...props}
			class={cn(
				"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				className
			)}
		/>
	);
}
