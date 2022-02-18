export type coordType = {
	RA: number;
	DEC: number;
};

export type constellationType = {
	name: string;
	coordinate: coordType;
	src: string;
};
export type statusType = {
	finished: boolean;
	win: boolean;
	number: number;
};

export type statisticsType = {
	played: number;
	win: number;
	winPerc: number;
	lastRound: boolean; //Win or Not
	currStreak: number;
	maxStreak: number;
	dist: {
		name: string;
		number: number;
		length: number;
	}[];
};
export interface ConstellationState {
	secret: constellationType;
	all: constellationType[];
	guesses: constellationType[];
	guess: string;
	error: {
		value: boolean;
		message: string;
	};
	status: statusType;
	statistics?: statisticsType;
}
