import { v4 as uuidv4 } from "uuid";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const BEARER_JWT_TOKEN = import.meta.env.VITE_BEARER_JWT_TOKEN;

enum TransactionTypeEnum {
    DEPOSIT = "DEPOSIT",
    EXPENSE = "EXPENSE",
    INVESTMENT = "INVESTMENT",
}

enum TransactionCategoryEnum {
    SALARY = "SALARY",
    FREELANCER = "FREELANCER",
    INVESTMENT_PROFIT = "INVESTMENT_PROFIT",
    FOOD = "FOOD",
    SUBSCRIPTIONS = "SUBSCRIPTIONS",
    SHOP = "SHOP",
    ENTERTAINMENT = "ENTERTAINMENT",
    TRANSPORT = "TRANSPORT",
    HOUSE = "HOUSE",
    SERVICES = "SERVICES",
    FIXED_INCOME = "FIXED_INCOME",
    VARIABLE_INCOME = "VARIABLE_INCOME",
    CRIPTOCURRENCIES = "CRIPTOCURRENCIES",
    OTHERS = "OTHERS",
}

export interface ITransaction {
    id: string;
    created_at: string;
    updated_at: string | null;
    type: TransactionTypeEnum;
    category: TransactionCategoryEnum;
    description: string;
    amount: number;
}
export interface IAccount {
    account_id: string;
    current_balance: number;
    total_expenses: number;
    total_food: number;
    total_subscriptions: number;
    total_shop: number;
    total_entertainment: number;
    total_transport: number;
    total_house: number;
    total_services: number;
    investments_total: number;
    investments_fixed_income: number;
    investments_variable_income: number;
    investments_criptocurrencies: number;
    investments_others: number;
    Transaction: ITransaction[];
}

let Account: IAccount = {
    account_id: uuidv4(),
    current_balance: 0,
    total_expenses: 0,
    total_food: 0,
    total_subscriptions: 0,
    total_shop: 0,
    total_entertainment: 0,
    total_transport: 0,
    total_house: 0,
    total_services: 0,
    investments_total: 0,
    investments_fixed_income: 0,
    investments_variable_income: 0,
    investments_criptocurrencies: 0,
    investments_others: 0,
    Transaction: [],
};

async function getDashboardData(){
	const request = await fetch(`${API_ENDPOINT}/account/dashboard`, {
		method: "GET",
		headers: {
			"Content-type": "application/json;charset=UTF-8",
			"Accept": "application/json",
			"Authorization": `Bearer ${BEARER_JWT_TOKEN}`
		}
	});

	const response =  await request.json()
	return response.data
}

Account = await getDashboardData()

if(Account){
	Account.current_balance = 0;
	Account.total_expenses = 0;
	Account.total_food = 0;
	Account.total_subscriptions = 0;
	Account.total_shop = 0;
	Account.total_entertainment = 0;
	Account.total_transport = 0;
	Account.total_house = 0;
	Account.total_services = 0;
	Account.investments_total = 0;
	Account.investments_fixed_income = 0;
	Account.investments_variable_income = 0;
	Account.investments_criptocurrencies = 0;
	Account.investments_others = 0;

	for (let i = 0; i < Account.Transaction.length; i++) {
		if (Account.Transaction[i].type === "DEPOSIT") {
			Account.current_balance += Account.Transaction[i].amount;
		} else if (Account.Transaction[i].type === "EXPENSE") {
			Account.total_expenses += Account.Transaction[i].amount;
			Account.current_balance -= Account.Transaction[i].amount;

			if (Account.Transaction[i].category === "FOOD") Account.total_food += Account.Transaction[i].amount;
			if (Account.Transaction[i].category === "SUBSCRIPTIONS")
				Account.total_subscriptions += Account.Transaction[i].amount;
			if (Account.Transaction[i].category === "SHOP") Account.total_shop += Account.Transaction[i].amount;
			if (Account.Transaction[i].category === "ENTERTAINMENT")
				Account.total_entertainment += Account.Transaction[i].amount;
			if (Account.Transaction[i].category === "TRANSPORT")
				Account.total_transport += Account.Transaction[i].amount;
			if (Account.Transaction[i].category === "HOUSE") Account.total_house += Account.Transaction[i].amount;
			if (Account.Transaction[i].category === "SERVICES")
				Account.total_services += Account.Transaction[i].amount;
		} else if (Account.Transaction[i].type === "INVESTMENT") {
			Account.investments_total += Account.Transaction[i].amount;
			Account.current_balance -= Account.Transaction[i].amount;

			if (Account.Transaction[i].category === "FIXED_INCOME")
				Account.investments_fixed_income += Account.Transaction[i].amount;
			if (Account.Transaction[i].category === "VARIABLE_INCOME")
				Account.investments_variable_income += Account.Transaction[i].amount;
			if (Account.Transaction[i].category === "CRIPTOCURRENCIES")
				Account.investments_criptocurrencies += Account.Transaction[i].amount;
			if (Account.Transaction[i].category === "OTHERS")
				Account.investments_others += Account.Transaction[i].amount;
		}
	}
}

export function transformToBRL(amount: number) {
    return (amount / 100).toLocaleString("pt-br", { minimumFractionDigits: 2 });
}

function transformToFixedTwo(value: number) {
    return value.toFixed(2);
}

export function getDateTimeBrazil() {
    let date = new Date().toLocaleDateString("pt-BR");
    let time = new Date().toLocaleTimeString("pt-BR");
    return `${date} ${time}`;
}

export function transformStringInputValueMaskToNumber(value: string): number {
    value = value.replace("R$ ", "");
    value = value.replace(",", "");
    value = value.replace(".", "");
    return Number(value);
}

export function getTransactionCategoryIcon(category: string) {
    switch (category) {
        case "SALARY":
            return `<i class="bi bi-building-fill-add"></i>`;
        case "FREELANCER":
            return `<i class="bi bi-file-earmark-medical"></i>`;
        case "FOOD":
            return `<i class="bi bi-apple"></i>`;
        case "SUBSCRIPTIONS":
            return `<i class="bi bi-bookmark-star"></i>`;
        case "SHOP":
            return `<i class="bi bi-shop"></i>`;
        case "ENTERTAINMENT":
            return `<i class="bi bi-controller"></i>`;
        case "TRANSPORT":
            return `<i class="bi bi-car-front-fill"></i>`;
        case "HOUSE":
            return `<i class="bi bi-house-door"></i>`;
        case "SERVICES":
            return `<i class="bi bi-tools"></i>`;
        case "FIXED_INCOME":
            return `<i class="bi bi-graph-up-arrow"></i>`;
        case "VARIABLE_INCOME":
            return `<i class="bi bi-graph-down-arrow"></i>`;
        case "CRIPTOCURRENCIES":
            return `<i class="bi bi-currency-bitcoin"></i>`;
        case "OTHERS":
            return `<i class="bi bi-gem"></i>`;
        default:
            return "";
    }
}

export const currentBalance = transformToBRL(Account.current_balance);
export const currentExpense = transformToBRL(Account.total_expenses);
export const currentInvestments = transformToBRL(Account.investments_total);

export const investments_fixed_income = transformToBRL(Account.investments_fixed_income);
export const percentage_fixed_income = transformToFixedTwo(
    Account.investments_total ? (Account.investments_fixed_income / Account.investments_total) * 100 : 0,
);

export const investments_variable_income = transformToBRL(Account.investments_variable_income);
export const percentage_variable_income = transformToFixedTwo(
    Account.investments_total ? (Account.investments_variable_income / Account.investments_total) * 100 : 0,
);

export const investments_criptocurrencies = transformToBRL(Account.investments_criptocurrencies);
export const percentage_criptocurrencies = transformToFixedTwo(
    Account.investments_total ? (Account.investments_criptocurrencies / Account.investments_total) * 100 : 0,
);

export const investments_others = transformToBRL(Account.investments_others);
export const percentage_others = transformToFixedTwo(
    Account.investments_total ? (Account.investments_others / Account.investments_total) * 100 : 0,
);

export const total_food = transformToBRL(Account.total_food);
export const percentage_food = transformToFixedTwo(
    Account.total_expenses ? (Account.total_food / Account.total_expenses) * 100 : 0,
);

export const total_subscriptions = transformToBRL(Account.total_subscriptions);
export const percentage_subscriptions = transformToFixedTwo(
    Account.total_expenses ? (Account.total_subscriptions / Account.total_expenses) * 100 : 0,
);

export const total_shop = transformToBRL(Account.total_shop);
export const percentage_shop = transformToFixedTwo(
    Account.total_expenses ? (Account.total_shop / Account.total_expenses) * 100 : 0,
);

export const total_entertainment = transformToBRL(Account.total_entertainment);
export const percentage_entertainment = transformToFixedTwo(
    Account.total_expenses ? (Account.total_entertainment / Account.total_expenses) * 100 : 0,
);

export const total_transport = transformToBRL(Account.total_transport);
export const percentage_transport = transformToFixedTwo(
    Account.total_expenses ? (Account.total_transport / Account.total_expenses) * 100 : 0,
);

export const total_house = transformToBRL(Account.total_house);
export const percentage_house = transformToFixedTwo(
    Account.total_expenses ? (Account.total_house / Account.total_expenses) * 100 : 0,
);

export const total_services = transformToBRL(Account.total_services);
export const percentage_services = transformToFixedTwo(
    Account.total_expenses ? (Account.total_services / Account.total_expenses) * 100 : 0,
);
