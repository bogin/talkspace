import { DataTypes } from "sequelize";
import { SequelizeProvider } from "..";
import { Booking } from "./bookings.model";

export const CreditModel = {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString(),
    },
  },
};

export const Credit = SequelizeProvider.Provider().define("Credit", CreditModel);
Credit.hasOne(Booking);
