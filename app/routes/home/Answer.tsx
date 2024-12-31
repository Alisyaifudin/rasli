import { Input } from "old/src/components/ui/input";
import { Button } from "~/components/ui/button";
import { useStatistics } from "~/hooks/use-stats";
import { useMode } from "~/hooks/use-mode";
import { z } from "zod";
import { getConstellationNames } from "~/lib/utils";
import { useState } from "react";

interface AnswerProps {
	name: string;
	constellationCsv: string;
}
function Answer({ name, constellationCsv }: AnswerProps) {
	const [mode] = useMode();
	const { addAnswer, completed, answers } = useStatistics(mode);
	const [error, setError] = useState("");
	const constellationNames = getConstellationNames(constellationCsv);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const inputEl = e.currentTarget.querySelector("input");
		const answerRaw = z.string().safeParse(formData.get("answer"));
		if (!answerRaw.success || !inputEl) {
			throw new Error("formData 'answer' is invalid");
		}
		const answer = answerRaw.data.trim().toLowerCase();
		if (!constellationNames.includes(answer)) {
			setError("Rasi tidak valid");
			return;
		}
    if(answers.includes(answer)) {
      setError("Sudah dicoba");
			return;
    }
		setError("");
		inputEl.value = "";
    addAnswer(answer, name)
	};
	return (
		<form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
			{error ? <p className="text-red-500 text-sm">{error}</p> : <p className="text-sm">&nbsp;</p>}
			<Input name="answer" disabled={completed} type="text" />
			<Button>Jawab</Button>
		</form>
	);
}

export default Answer;
