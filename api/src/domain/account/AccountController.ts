import { Request, Response } from "express";

import { getAccountsRepository } from "../../factories/getAccountsRepository";
import { getDecodedJwtToken } from "../../helpers/DecodeJwtToken";
import GetDashboardDataUseCase from "./GetDashboardDataUseCase";

class AccountController {
    async getDashboardData(req: Request, res: Response) {
        const dashboardData = await new GetDashboardDataUseCase(getAccountsRepository()).execute(
            getDecodedJwtToken(req).user_id,
        );

        return res.status(dashboardData ? 200 : 404).json({
            success: !!dashboardData,
            data: dashboardData,
        });
    }
}

export default new AccountController();
