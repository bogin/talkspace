import { Op } from "sequelize";
import { SequelizeORMService } from "../../data-providers/databases/Sequelize/orm.service";
import { BookingStatusHistoryService } from "../BookingStatusHistory/service";

export class BookingService extends SequelizeORMService {
  constructor() {
    super("Booking");
  }

  async getBookingsStatsForUserId(userId: string) {
    // Retrieve bookings from the database for the specified user
    const bookings = await this.findAll({
      where: {
        [Op.or]: [{ patient: userId }, { provider: userId }],
      },
    });

    let stats: any = [];
    if (bookings?.[0].provider === userId) {
      stats = await this.getStats(userId);
    }

    return { bookings, stats };
  }

  // Function to get statistics on canceled and rescheduled bookings for a specific provider
  async getStats(providerId) {
    try {
      // Retrieve canceled and rescheduled bookings for the specified provider
      const stats = await this.findAll({
        attributes: [
          [
            this.sequelizeProvider.fn(
              "COUNT",
              this.sequelizeProvider.literal(
                'DISTINCT CASE WHEN status = "canceled" THEN id END'
              )
            ),
            "canceledBookings",
          ],
          [
            this.sequelizeProvider.fn(
              "COUNT",
              this.sequelizeProvider.literal(
                'DISTINCT CASE WHEN status = "rescheduled" THEN id END'
              )
            ),
            "rescheduledBookings",
          ],
        ],
        where: {
          provider: providerId,
          [Op.or]: [{ status: "canceled" }, { status: "rescheduled" }],
        },
      });

      // Extract the results from the stats
      const [result] = stats;

      // Prepare the statistic information
      const canceledBookings = result.getDataValue("canceledBookings") || 0;
      const rescheduledBookings =
        result.getDataValue("rescheduledBookings") || 0;

      return [canceledBookings, rescheduledBookings];
    } catch (error) {
      console.error(
        "Error getting cancellation and reschedule statistics:",
        error
      );
      throw error;
    }
  }

  async createBooking(time: any, patient: any, provider: any) {
    // Find an unused credit that is not expired
    const d = new Date();
    const credit = await this.findOne({
      where: {
        expirationDate: {
          [Op.gt]: d, // Expiration date is greater than the current date
        },
        BookingId: null, // Credit is not associated with any booking
      },
    });

    if (!credit) {
      throw new Error("No unused, non-expired credits found.");
    }

    // Create a booking associated with the credit
    const booking = await this.create({ time, patient, provider });

    const bookingStatusHistoryService = new BookingStatusHistoryService();
    await bookingStatusHistoryService.create({
      status: "pending",
      BookingId: booking.id,
    });
    return booking;
    // Associate the booking with the credit
    /* await booking.setCredit(credit); */
  }
}
