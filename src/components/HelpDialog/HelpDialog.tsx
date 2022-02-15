import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setOpen, openHelpSL, languageSL } from "../../features/meta/metaSlice";
import { HelpDialog as HelpDialogProto } from "../../prototypes/HelpDialog";
import DICT, { GENERAL } from "../../utils/DICT";
import Image from "next/image";
import { secretSL } from "../../features/constellation/constellationSlice";

function HelpDialog() {
	const lang = useAppSelector(languageSL);
	const open = useAppSelector(openHelpSL);
	const src = useAppSelector(secretSL).src;
	const dispatch = useAppDispatch();

	const handleClick = () => dispatch(setOpen({ type: "help", value: true }));
	const handleClose = () => dispatch(setOpen({ type: "help", value: false }));

	const TEXT = useMemo(
		() => ({
			TITLE: DICT.HELP_TITLE[lang],
			HOWTO: DICT.HOWTO[lang],
			EXAMPLE: DICT.EXAMPLE[lang],
			EX: GENERAL.EX_GUESS_AND_COLOR.map((Ex, i) => ({
				GUESS: Ex.GUESS,
				COLOR: Ex.COLOR,
				HINT: DICT.EX_HINT[lang][i],
			})),
		}),
		[lang]
	);
	const ImageRenderer = (src: string) => (
		<div style={{ width: "100%", height: "300px", position: "relative" }}>
			<Image
				src="/UrsaMinor.png"
				layout="fill"
				alt={DICT.CONSTELLATION[lang]}
				objectFit="contain"
			/>
		</div>
	);
	return (
		<HelpDialogProto
			onClick={handleClick}
			onClose={handleClose}
			open={open}
			TEXT={TEXT}
			ImageRenderer={ImageRenderer}
			src={src}
		/>
	);
}

export default HelpDialog;
