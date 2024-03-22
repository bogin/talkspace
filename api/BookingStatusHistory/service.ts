import { SequelizeORMService } from "../../data-providers/databases/Sequelize/orm.service";

export class BookingStatusHistoryService extends SequelizeORMService {
  constructor() {
    super("BookingStatusHistory");
  }

  async getBookingsHistory(bookingId: string) {
    // Retrieve the booking status history from the database for the specified booking
    const history = await this.findAll({
      where: { BookingId: bookingId },
      order: [["timestamp", "ASC"]], // Order by timestamp in ascending order
    });

    return history;
  }
}
