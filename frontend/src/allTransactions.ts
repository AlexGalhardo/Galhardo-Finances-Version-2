import { getTransactionCategoryIcon, transformToBRL } from "./getDashboardData";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const BEARER_JWT_TOKEN = import.meta.env.VITE_BEARER_JWT_TOKEN;

async function getTransactions () {
	let request = await fetch(`${API_ENDPOINT}/transaction/all`, {
		method: "GET",
		headers: {
			"Content-type": "application/json;charset=UTF-8",
			"Accept": "application/json",
			"Authorization": `Bearer ${BEARER_JWT_TOKEN}`
		}
	});

	if (request) {
		let response = await request.json()

		let transactions = response.reverse()

		if (!transactions.length) return "No transactions available";

		let returnTransactions = "";

		for (let i = 0; i < transactions.length; i++) {
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

			returnTransactions += `
				<li class="list-group-item list-group-item-action d-flex justify-content-between">
					<div class="me-auto">
						<h5 class="fw-bold ${colorType}">${getTransactionCategoryIcon(transactions[i].category)}   ${transactions[i].description
				}</h5>
						<small>${transactions[i].created_at}</small>
					</div>
					<div class="ms-auto">
						<h5 class="fw-bold ${colorType}">${simbolType} R$ ${transformToBRL(transactions[i].amount)}</h5>
							<form class="d-flex justify-content-end">
								<button type="submit" class="btn btn-sm btn-outline-danger button_delete_transaction" id="${transactions[i].transaction_id
				}"><i class="bi bi-trash"></i> Delete</button>
							</form>
					</div>
				</li>
			`;
		}

		return returnTransactions;
	} else {
		return "No transactions available";
	}
}

export const allTransactions = await getTransactions();
