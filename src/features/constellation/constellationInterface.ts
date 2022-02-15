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
}
