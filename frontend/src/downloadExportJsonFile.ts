const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const BEARER_JWT_TOKEN = import.meta.env.VITE_BEARER_JWT_TOKEN;

export function dowloadExportJsonFile(element: HTMLButtonElement) {
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
            let dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response.data));

            let exportFileDefaultName = "galhardo-finances.json";

            element.setAttribute("href", dataUri);
            element.setAttribute("download", exportFileDefaultName);
        } else {
            alert(`There's no data to export for now!`);
        }
    });
}
