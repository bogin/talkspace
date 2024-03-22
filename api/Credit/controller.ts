import { NextFunction, Request, Response } from "express";
import { CreditService } from "./service";

export class CreditController {
  constructor() {}

  async getCreditsForPatient(req: Request, res: Response, next: NextFunction) {
    const { patientId } = req.params;

    try {
      const creditService = new CreditService();

      const { credits, stats } = await creditService.getCreditsForPatient(
        `${patientId}`
      );
      res.status(200).json({ credits, stats });
    } catch (error) {
      console.error("Error retrieving monthly credits used statistics:", error);
      res
        .status(500)
        .json({
          error:
            "An error occurred while retrieving monthly credits used statistics.",
        });
    }
  }
}
