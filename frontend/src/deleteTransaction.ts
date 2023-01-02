const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export function deleteTransaction(elements: NodeListOf<HTMLButtonElement>) {

	for (let index = 0; index < elements.length; index++) {

		elements[index].addEventListener("click", async (event: any) => {

			if (confirm("Are you sure you want to delete this transaction?")) {

				const buttonId = event?.srcElement.id;

				console.log(apiEndpoint, buttonId)

				const request = await fetch(`${apiEndpoint}/transaction/delete/${buttonId}`, {
						method: "DELETE",
						headers: {
							"Content-type": "application/json;charset=UTF-8",
							"Accept": "application/json",
							"Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmNlOWUxNzYtODI2NC00NzE0LWFmMjUtYzczY2ZmMjE5ODE2IiwiaWF0IjoxNjcyNjgyMDk5LCJleHAiOjE2NzI2ODU2OTl9.KoR2-QH3fXoS8HAaR-7yhRZ3kQYc-uCmsTJ1EF8DWdY`
						}
					})

				const response = await request.json()

				if(!response) alert('Something went wrong with this delete operation!')
            }
        });
    }
}
