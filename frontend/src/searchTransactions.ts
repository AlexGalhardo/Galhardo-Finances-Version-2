import { deleteTransaction } from "./deleteTransaction";
import { getTransactionCategoryIcon, transformToBRL } from "./getDashboardData";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const BEARER_JWT_TOKEN = import.meta.env.VITE_BEARER_JWT_TOKEN;

export function searchTransactions(
    buttonSearchTransactions: HTMLButtonElement,
    searchCategory: HTMLSelectElement,
    searchStartDate: HTMLSelectElement,
    searchFinalDate: HTMLSelectElement,
) {
    buttonSearchTransactions.addEventListener("click", async (event: Event) => {

		event.preventDefault();

		const request = await fetch(`${API_ENDPOINT}/transaction/all`, {
			method: "GET",
			headers: {
				"Content-type": "application/json;charset=UTF-8",
				"Accept": "application/json",
				"Authorization": `Bearer ${BEARER_JWT_TOKEN}`
			}
		})

        if (request) {

			if (searchStartDate.value && searchFinalDate.value) {

				const response = await request.json()

                const transactions = response.reverse();

                if (!transactions) return "No transactions available";

                let transactionsFiltered = "";

                for (let i = 0; i < transactions.length; i++) {

					let created_at = transactions[i].created_at.slice(0, 10);
                    let dateFormated = `${created_at[3]}${created_at[4]}/${created_at[0]}${created_at[1]}/${created_at[6]}${created_at[7]}${created_at[8]}${created_at[9]}`;
                    let dateFormatedTimestamp = new Date(dateFormated).getTime();

                    if (
                        searchCategory.value === "ALL" &&
                        dateFormatedTimestamp >= new Date(searchStartDate.value).getTime() &&
                        dateFormatedTimestamp <= new Date(searchFinalDate.value).getTime()
                            ? true
                            : transactions[i].category === searchCategory.value &&
                              dateFormatedTimestamp >= new Date(searchStartDate.value).getTime() &&
                              dateFormatedTimestamp <= new Date(searchFinalDate.value).getTime()
                    ) {
                        let colorType =
                            transactions[i].type === "DEPOSIT"
                                ? "text-success"
                                : transactions[i].type === "EXPENSE"
                                ? "text-danger"
                                : "text-primary";

                        let simbolType =
                            transactions[i].type === "DEPOSIT"
                                ? "+"
                                : transactions[i].type === "EXPENSE"
                                ? "-"
                                : "";

                        transactionsFiltered += `
							<li class="list-group-item list-group-item-action d-flex justify-content-between">
								<div class="me-auto">
									<h5 class="fw-bold ${colorType}">${getTransactionCategoryIcon(transactions[i].category)}   ${
                            transactions[i].description
                        }</h5>
									<small>${transactions[i].created_at}</small>
								</div>
								<div class="ms-auto">
									<h5 class="fw-bold ${colorType}">${simbolType} R$ ${transformToBRL(transactions[i].amount)}</h5>
										<form class="d-flex justify-content-end">
											<button type="submit" class="btn btn-sm btn-outline-danger button_delete_transaction" id="${
                                                transactions[i].transaction_id
                                            }"><i class="bi bi-trash"></i> Delete</button>
										</form>
								</div>
							</li>
						`;
                    }
                }

				document.querySelector("#ul_transactions")!.innerHTML = transactionsFiltered;

				deleteTransaction(document.querySelectorAll(".button_delete_transaction")!);

            } else {
                alert("Please select a start date and final date to filter transactions!");
            }
        } else {
            document.querySelector("#ul_transactions")!.innerHTML = "There's no transactions available";
        }
    });
}
