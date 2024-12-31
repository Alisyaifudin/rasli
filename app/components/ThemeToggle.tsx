import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getTheme, setTheme } from "~/lib/theme-provider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const [currentTheme, setCurrentTheme] = useState<"dark" | "light" | "system" | null>(null);
	useEffect(() => {
		const savedTheme = getTheme();
		setCurrentTheme(savedTheme);
	}, []);

	const handleThemeChange = (newTheme: "dark" | "light" | "system") => () => {
		setTheme(newTheme);
		setCurrentTheme(newTheme);
	};
	if (!currentTheme)
		return (
			<Button variant="ghost" size="icon">
				<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<span className="sr-only">Toggle theme</span>
			</Button>
		);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={handleThemeChange("light")}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={handleThemeChange("dark")}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={handleThemeChange("system")}>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
