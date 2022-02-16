import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GuessField as GuessFieldProto } from "../../prototypes/GuessField";
import DICT, { GENERAL } from "../../utils/DICT";
import Image from "next/image";
import { guessesSL, secretSL } from "../../features/constellation/constellationSlice";
import { getColor } from "../../utils/getColor";

function GuessField() {
	const guesses = useAppSelector(guessesSL);
	const secret = useAppSelector(secretSL);
	const fields = guesses.length ? guesses.map((guess) => guess.name) : [];
	const colors = guesses.map((guess) =>
		guess.name === secret.name ? GENERAL.RIGHT_COLOR : getColor(guess.coordinate, secret.coordinate)
	);
	return <GuessFieldProto fields={fields} colors={colors} />;
}

export default GuessField;
