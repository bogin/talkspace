import { NextFunction, Request, Response } from "express";
import { BookingStatusHistoryService } from "./service";

export class BookingStatusHistoryController {
  constructor() {}

  async getBookingStatusHistory(req: Request, res: Response, next: NextFunction) {
        const { bookingId } = req.params;
      
        try {
          const bookingStatusHistoryService = new BookingStatusHistoryService();
         const history = await bookingStatusHistoryService.getBookingsHistory(`${bookingId}`);
      
          res.status(200).json({ history });
        } catch (error) {
          console.error('Error retrieving booking status history:', error);
          res.status(500).json({ error: 'An error occurred while retrieving booking status history.' });
        }
      }
}
