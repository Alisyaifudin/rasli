export type coordType = {
	RA: number;
	DEC: number;
};

export type constellationType = {
	name: string;
	coordinate: coordType;
	src: string;
};
export interface ConstellationState {
	secret: constellationType;
	all: constellationType[];
	guesses: constellationType[];
	guess: string;
	error: {
		value: boolean;
		message: string;
	}
}
