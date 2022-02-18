import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setOpen, openStatisticsSL, languageSL, numberSL } from "../../features/meta/metaSlice";
import { StatisticDialog as StatisticDialogProto } from "../../prototypes/StatisticDialog";
import DICT, { GENERAL } from "../../utils/DICT";
import Image from "next/image";
import { statisticsSL, statusSL } from "../../features/constellation/constellationSlice";

function StatisticDialog() {
	const lang = useAppSelector(languageSL);
	const open = useAppSelector(openStatisticsSL);
	const stat = useAppSelector(statisticsSL);
	const status = useAppSelector(statusSL);
	const number= useAppSelector(numberSL);
	const dispatch = useAppDispatch();


	const handleClick = () => dispatch(setOpen({ type: "statistics", value: true }));
	const handleClose = () => dispatch(setOpen({ type: "statistics", value: false }));
	const handleShare = () =>
		navigator.clipboard.writeText(`RASLI ${number} ${status.number}/6 \nhttps://rasli.vercel.app`);
	const TEXT = useMemo(
		() => ({
			TITLE: DICT.STATISTICS[lang],
			STATS: [
				{ VALUE: stat.played, TEXT: DICT.PLAYED[lang] },
				{ VALUE: stat.winPerc, TEXT: DICT.WIN_PERC[lang] },
				{ VALUE: stat.currStreak, TEXT: DICT.CURR_STREAK[lang] },
				{ VALUE: stat.maxStreak, TEXT: DICT.MAX_STREAK[lang] },
			],
			DIST: {
				TEXT: DICT.DIST[lang],
				DIST: stat.dist.map((d, i) => ({ NAME: d.name, VALUE: d.number, LENGTH: d.length })),
			},
			NEXT: { TEXT: DICT.NEXT[lang] },
		}),
		[lang, stat]
	);

	return (
		<StatisticDialogProto
			onShare={handleShare}
			onClick={handleClick}
			onClose={handleClose}
			open={open}
			TEXT={TEXT}
			finished={status.finished}
		/>
	);
}

export default StatisticDialog;
