import * as zz from "zod/v4-mini";

export const z = {
	enum: zz.enum,
	number: zz.number,
	string: zz.string,
	boolean: zz.boolean,
	array: zz.array,
	object: zz.object,
};

export type zobj = typeof z;
