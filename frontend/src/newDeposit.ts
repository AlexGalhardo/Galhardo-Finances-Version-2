import { transformStringInputValueMaskToNumber } from "./getDashboardData";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const BEARER_JWT_TOKEN = import.meta.env.VITE_BEARER_JWT_TOKEN;
const USER_TEST_ID = import.meta.env.VITE_USER_TEST_ID;

export function newDeposit(
    element: HTMLButtonElement,
    amountDeposit: HTMLInputElement,
    depositDescription: HTMLInputElement,
    depositCategory: HTMLSelectElement,
) {
    element.addEventListener("click", async (event: Event) => {

		event.preventDefault()

        if (amountDeposit.value && depositDescription.value && depositCategory.value) {
            const amountDeposited = transformStringInputValueMaskToNumber(amountDeposit.value);

            if (amountDeposited <= 0) {
                alert("Enter a valid deposit value greater than 0!");
            }

            if (amountDeposited > 0) {

				const request = await fetch(`${API_ENDPOINT}/transaction/create`, {
					method: "POST",
					headers: {
						"Content-type": "application/json;charset=UTF-8",
						"Accept": "application/json",
						"Authorization": `Bearer ${BEARER_JWT_TOKEN}`
					},
					body: JSON.stringify({
						user_id: USER_TEST_ID,
						type: "DEPOSIT",
						category: depositCategory.value,
						description: depositDescription.value,
						amount: amountDeposited,
					})
				})

				const response = await request.json()

				if(!response) alert('Something went wrong to make this deposit!')

				window.location.reload();
            }
        }
    });
}
