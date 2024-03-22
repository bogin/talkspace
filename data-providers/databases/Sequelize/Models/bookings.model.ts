import { BookingStatusHistory } from "./booking-status-history.model";
import { Credit } from "./credit.model";

import { DataTypes } from "sequelize";
import { SequelizeProvider } from "..";

export const BookingModel = {
  time: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString(),
    },
  },
  patient: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
};

export const Booking = SequelizeProvider.Provider().define(
  "Booking",
  BookingModel
);

Booking.belongsTo(Credit);
Booking.hasMany(BookingStatusHistory);
