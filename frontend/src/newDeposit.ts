import { transformStringInputValueMaskToNumber } from "./getDashboardData";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export function newDeposit(
    element: HTMLButtonElement,
    amountDeposit: HTMLInputElement,
    depositDescription: HTMLInputElement,
    depositCategory: HTMLSelectElement,
) {
    element.addEventListener("click", async () => {

        if (amountDeposit.value && depositDescription.value && depositCategory.value) {
            const amountDeposited = transformStringInputValueMaskToNumber(amountDeposit.value);

            if (amountDeposited <= 0) {
                alert("Enter a valid deposit value greater than 0!");
            }

            if (amountDeposited > 0) {

				const request = await fetch(`${apiEndpoint}/transaction/create`, {
						method: "POST",
						headers: {
							"Content-type": "application/json;charset=UTF-8",
							"Accept": "application/json",
							"Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmNlOWUxNzYtODI2NC00NzE0LWFmMjUtYzczY2ZmMjE5ODE2IiwiaWF0IjoxNjcyNjgyMDk5LCJleHAiOjE2NzI2ODU2OTl9.KoR2-QH3fXoS8HAaR-7yhRZ3kQYc-uCmsTJ1EF8DWdY`
						},
						body: JSON.stringify({
							user_id: "69c4f756-57b0-4bca-b5a3-4fef42e9bc82",
							type: "DEPOSIT",
							category: depositCategory.value,
							description: depositDescription.value,
							amount: amountDeposited,
						})
					})
				const response = await request.json()

				if(!response) alert('Something went wrong to make this deposit!')
            }
        }
    });
}
