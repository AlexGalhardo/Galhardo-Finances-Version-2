import { transformStringInputValueMaskToNumber } from "./getDashboardData";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const BEARER_JWT_TOKEN = import.meta.env.VITE_BEARER_JWT_TOKEN;
const USER_TEST_ID = import.meta.env.VITE_USER_TEST_ID;

export function newExpense(
    element: HTMLButtonElement,
    amountExpense: HTMLInputElement,
    expenseDescription: HTMLInputElement,
    expenseCategory: HTMLSelectElement,
) {
    element.addEventListener("click", async () => {

        if (amountExpense.value && expenseDescription.value && expenseCategory.value) {
            const amountExpensed = transformStringInputValueMaskToNumber(amountExpense.value);

            if (amountExpensed <= 0) {
                alert("Enter a valid expense value greater than 0!");
            }

            if (amountExpensed > 0) {

                const request = await fetch(`${API_ENDPOINT}/transaction/create`, {
						method: "POST",
						headers: {
							"Content-type": "application/json;charset=UTF-8",
							"Accept": "application/json",
							"Authorization": `Bearer ${BEARER_JWT_TOKEN}`
						},
						body: JSON.stringify({
							user_id: USER_TEST_ID,
							type: "EXPENSE",
							category: expenseCategory.value,
							description: expenseDescription.value,
							amount: amountExpensed,
						})
					})

				const response = await request.json()

				if(!response) alert('Something went wrong to make this expense!')
            }
        }
    });
}
