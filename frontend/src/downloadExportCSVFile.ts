const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const BEARER_JWT_TOKEN = import.meta.env.VITE_BEARER_JWT_TOKEN;

function jsonToCsv(transactions: any[]) {
    const header = Object.keys(transactions[0]);

    const headerString = header.join(",");

    const replacer = (_key: any, value: any) => value ?? "";

    const rowItems = transactions.map((row) =>
        header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(","),
    );

    const csv = [headerString, ...rowItems].join("\r\n");

    return csv;
}

export function dowloadExportCSVFile(element: HTMLButtonElement) {
    element.addEventListener("click", async () => {

		const request = await fetch(`${API_ENDPOINT}/account/dashboard`, {
			method: "GET",
			headers: {
				"Content-type": "application/json;charset=UTF-8",
				"Accept": "application/json",
				"Authorization": `Bearer ${BEARER_JWT_TOKEN}`
			}
		})

        if (request) {

			const response = await request.json()

            const csv = jsonToCsv(response.data.Transaction);

            let dataUri = "data:text/csv;charset=utf-8," + csv;

            let exportFileDefaultName = "galhardo-finances.csv";

            element.setAttribute("href", dataUri);
            element.setAttribute("download", exportFileDefaultName);
        } else {
            alert(`There's no data to export for now!`);
        }
    });
}
