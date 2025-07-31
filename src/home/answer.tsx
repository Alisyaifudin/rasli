import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function Answer() {
	return (
		<form class="flex flex-col items-center gap-2" id="answer-form">
			<p class="text-red-500 text-sm hidden" id="answer-error"></p>
			<Input name="answer" type="text" id="answer-input" autocomplete="off" />
			<div class="flex items-center gap-2" id="answer-button-div">
				<Button id="answer-button">Jawab</Button>
				<Button hidden id="answer-aux" variant="secondary" type="button">
					Selanjutnya
				</Button>
			</div>
		</form>
	);
}
