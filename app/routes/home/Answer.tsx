import { Input } from "old/src/components/ui/input";
import { Button } from "~/components/ui/button";
import { useStatistics } from "~/hooks/use-stats";
import { useMode } from "~/hooks/use-mode";
import { z } from "zod";
import { useState } from "react";
import { Constellation, readConstellationCsv } from "~/puzzle/read-csv";
import { distance } from "~/puzzle/distance";

interface AnswerProps {
	name: string;
	constellations: Constellation[];
}
function Answer({ name, constellations }: AnswerProps) {
	const [mode] = useMode();
	const { addAnswer, completed, answers, resetPuzzle } = useStatistics(mode);
	const [error, setError] = useState("");
	const target = constellations.find(
		(c) => c.name.trim().toLowerCase() === name.trim().toLowerCase()
	);
	if (!target) {
		throw new Error("target constellation is invalid!!! " + name);
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const inputEl = e.currentTarget.querySelector("input");
		const answerRaw = z.string().safeParse(formData.get("answer"));
		if (!answerRaw.success || !inputEl) {
			throw new Error("formData 'answer' is invalid");
		}
		const answer = answerRaw.data.trim().toLowerCase();
		const guess = constellations.find((c) => c.name.trim().toLowerCase() === answer);
		if (!guess) {
			setError("Rasi tidak valid");
			return;
		}
		if (answers.find((a) => a.name === answer)) {
			setError("Sudah dicoba");
			return;
		}
		const dist = distance({ ra: guess.ra, dec: guess.dec }, { ra: target.ra, dec: target.dec });
		setError("");
		inputEl.value = "";
		addAnswer({ name: answer, distance: dist }, name.trim().toLowerCase());
	};
	return (
		<form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
			{error ? <p className="text-red-500 text-sm">{error}</p> : <p className="text-sm">&nbsp;</p>}
			<Input name="answer" disabled={completed} type="text" />
			<div className="flex items-center gap-2">
				<Button type="submit" disabled={completed}>
					Jawab
				</Button>
				{mode === "unlimited" ? (
					<Button onClick={resetPuzzle} variant="secondary" type="button">
						{completed ? "Selanjutnya" : "Lewati"}
					</Button>
				) : null}
			</div>
		</form>
	);
}

export default Answer;
