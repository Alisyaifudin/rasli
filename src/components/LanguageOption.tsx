import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";
import Select from "./Atom/Select";

export default function LanguageOption() {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, asPath, query, locale = "en" } = router;
	const handleChange = (value: string) => {
		router.push({ pathname, query }, asPath, { locale: value });
	};
	const options = [
		{ value: "en", label: t("ENGLISH") },
		{ value: "id", label: t("INDONESIAN") },
	];
	return (
		<div className="text-white my-auto">
			<Select
				classNames={{ label: "dark:bg-zinc-800 bg-white dark:text-white/50", selected: "text-black dark:text-white" }}
				label={t("LANGUAGE")}
				value={locale}
				options={options}
				onChange={handleChange}
				
			/>
		</div>
	);
}
