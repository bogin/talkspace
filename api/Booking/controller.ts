import { NextFunction, Request, Response } from "express";
import { BookingService } from "./service";

export class BookingController {
  constructor() {}

  async getBookingsStatsForUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID must be provided as a query parameter." });
    }

    try {
      const bookingService = new BookingService();
      const { bookings, stats } =
        await bookingService.getBookingsStatsForUserId(`${userId}`);

      res.status(200).json({ bookings, stats });
    } catch (error) {
      console.error("Error retrieving bookings:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving bookings." });
    }
  }

  async createBooking(req: Request, res: Response, next: NextFunction) {
    const { time, patient, provider } = req.body;

    try {
      const bookingService = new BookingService();
      const booking = await bookingService.createBooking(
        time,
        patient,
        provider
      );
      res.status(201).json({
        message: "Booking created successfully",
        booking: booking.toJSON(),
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the booking." });
    }
  }
}
