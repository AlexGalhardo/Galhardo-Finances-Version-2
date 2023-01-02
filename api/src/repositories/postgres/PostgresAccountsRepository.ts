/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { Account } from "@prisma/client";
import { randomUUID } from "crypto";

import prisma from "../../config/prisma";
import { IAccountsRepository, TypeAccountDashboard } from "../../ports/IAccountsRepository";

export default class PostgresAccountsRepository implements IAccountsRepository {
    async getDashboardData(user_id: string): Promise<Account | TypeAccountDashboard> {
        if (process.env.NODE_ENV === "development") {
            user_id = process.env.USER_TEST_ID;
        }

        const Account = await prisma.account.findFirst({
            where: {
                user_id,
            },
            include: {
                Transaction: true,
            },
        });

        if (Account) return Account as Account;

        return {
            account_id: randomUUID(),
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
    }
}
