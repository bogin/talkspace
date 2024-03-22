import { SequelizeORMService } from "../../data-providers/databases/Sequelize/orm.service";

export class CreditService extends SequelizeORMService {
  constructor() {
    super("Credit");
  }

  async getCreditsForPatient(patientId: string) {
    const credits = await this.findAll({
      where: {
        patient: patientId,
      },
    });
    const stats = await this.getCreditsUsedStats(patientId);

    return { credits, stats };
  }

  // Function to get monthly statistics on credits used by a specific patient, including the percentage
  private async getCreditsUsedStats(patientId) {
    /* try {
    // Retrieve total credits available for the specified patient
    const totalCreditsQuery = await Credit.sum('type', {
      where: {
        BookingId: null, // Credits not associated with any booking
      },
    });

    // Retrieve monthly credits used by the specified patient
    const stats = await Booking.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN "Booking"."status" = "confirmed" THEN "Credit"."type" END')), 'totalCreditsUsed'],
        [sequelize.fn('MONTH', sequelize.col('"Booking"."time"')), 'month'],
        [sequelize.fn('YEAR', sequelize.col('"Booking"."time"')), 'year'],
      ],
      include: [
        {
          model: Credit,
          attributes: [],
          where: {
            BookingId: sequelize.literal('"Booking"."id"'), // Match Credit to Booking
          },
        },
      ],
      where: {
        patient: patientId,
        status: 'confirmed',
      },
      group: ['month', 'year'],
    });

    // Extract the results from the stats
    const result = stats.map((row) => ({
      totalCreditsUsed: row.getDataValue('totalCreditsUsed') || 0,
      month: row.getDataValue('month'),
      year: row.getDataValue('year'),
    }));

    // Calculate the percentage for each month
    const totalCreditsAvailable = totalCreditsQuery || 1; // To avoid division by zero
    const monthlyStatsWithPercentage = result.map((row) => ({
      ...row,
      percentageCreditsUsed: (row.totalCreditsUsed / totalCreditsAvailable) * 100,
    }));

    return monthlyStatsWithPercentage;
  } catch (error) {
    console.error('Error getting monthly credits used statistics:', error);
    throw error;
  } */
  }
}
