export function readCsv(text: string): Record<string, string[]> {
	const rows = text.split("\n");
	if (rows.length === 0) {
		return {};
	}
	const headers = rows[0].split(",");
	const colNum = headers.length;
	const obj: Record<string, string[]> = {};
	for (let j = 0; j < colNum; j++) {
		const header = headers[j];
		obj[header] = [];
	}
	const rowNum = rows.length - 1;

	for (let i = 1; i < rowNum; i++) {
		const row = rows[i].split(",");
		if (row.length != colNum) throw new Error("row number " + i + "is incomplete: " + rows[i]);
		for (let j = 0; j < colNum; j++) {
			const header = headers[j];
			obj[header].push(row[j]);
		}
	}
	return obj;
}
