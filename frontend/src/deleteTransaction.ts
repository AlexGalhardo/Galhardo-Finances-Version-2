const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const BEARER_JWT_TOKEN = import.meta.env.VITE_BEARER_JWT_TOKEN;

export function deleteTransaction(elements: NodeListOf<HTMLButtonElement>) {

	for (let index = 0; index < elements.length; index++) {

		elements[index].addEventListener("click", async (event: any) => {

			if (confirm("Are you sure you want to delete this transaction?")) {

				const buttonId = event?.srcElement.id;

				const request = await fetch(`${API_ENDPOINT}/transaction/delete/${buttonId}`, {
					method: "DELETE",
					headers: {
						"Content-type": "application/json;charset=UTF-8",
						"Accept": "application/json",
						"Authorization": `Bearer ${BEARER_JWT_TOKEN}`
					}
				})

				const response = await request.json()

				if(!response) alert('Something went wrong with this delete operation!')
            }
        });
    }
}
