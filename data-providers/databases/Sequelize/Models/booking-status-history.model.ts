import Sequelize, { DataTypes, literal } from "sequelize";
import { SequelizeProvider } from "..";
import { Booking } from "./bookings.model";

export const BookingStatusHistoryModel = {
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: literal("CURRENT_TIMESTAMP"),
  },
};

export const BookingStatusHistory = SequelizeProvider.Provider().define(
  "BookingStatusHistory",
  BookingStatusHistoryModel
);

BookingStatusHistory.belongsTo(Booking);
