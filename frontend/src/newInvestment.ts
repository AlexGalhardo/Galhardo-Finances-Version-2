import { transformStringInputValueMaskToNumber } from "./getDashboardData";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const BEARER_JWT_TOKEN = import.meta.env.VITE_BEARER_JWT_TOKEN;
const USER_TEST_ID = import.meta.env.VITE_USER_TEST_ID;

export function newInvestment(
    element: HTMLButtonElement,
    amountInvestment: HTMLInputElement,
    investmentDescription: HTMLInputElement,
    investmentCategory: HTMLSelectElement,
) {
    element.addEventListener("click", async (event: Event) => {

		event.preventDefault()

        if (amountInvestment.value && investmentDescription.value && investmentCategory.value) {

            const amountInvested = transformStringInputValueMaskToNumber(amountInvestment.value);

            if (amountInvested <= 0) {
                alert("Enter a valid investment value greater than 0!");
            }

            if (amountInvested > 0) {
                const request = await fetch(`${API_ENDPOINT}/transaction/create`, {
						method: "POST",
						headers: {
							"Content-type": "application/json;charset=UTF-8",
							"Accept": "application/json",
							"Authorization": `Bearer ${BEARER_JWT_TOKEN}`
						},
						body: JSON.stringify({
							user_id: USER_TEST_ID,
							type: "INVESTMENT",
							category: investmentCategory.value,
							description: investmentDescription.value,
							amount: amountInvested,
						})
					})

				const response = await request.json()

				if(!response) alert('Something went wrong to make this investment!')

				window.location.reload();
            }
        }
    });
}
