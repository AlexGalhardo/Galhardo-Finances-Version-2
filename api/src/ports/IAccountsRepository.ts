import { Account } from "@prisma/client";

export interface IGetDashboardDataResponse {
    success: boolean;
    data?: Account;
}

export type TypeAccountDashboard = {
    account_id: string;
    current_balance: 0;
    total_expenses: 0;
    total_food: 0;
    total_subscriptions: 0;
    total_shop: 0;
    total_entertainment: 0;
    total_transport: 0;
    total_house: 0;
    total_services: 0;
    investments_total: 0;
    investments_fixed_income: 0;
    investments_variable_income: 0;
    investments_criptocurrencies: 0;
    investments_others: 0;
    Transaction: [];
};

export interface IAccountsRepository {
    getDashboardData(user_id: string): Promise<Account | TypeAccountDashboard>;
}
