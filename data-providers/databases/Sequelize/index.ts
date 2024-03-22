import { Sequelize } from "sequelize";

export class SequelizeProvider {
  private static instance: SequelizeProvider;
  private sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize(
      "your_db_name",
      "your_db_user",
      "your_db_password",
      {
        host: "localhost",
        dialect: "mysql", // Use the appropriate database dialect
        logging: false, // Disable logging SQL queries (you can enable it for debugging)
      }
    );
  }
  
  static Provider(): Sequelize {
    if (!SequelizeProvider.instance) {
      SequelizeProvider.instance = new SequelizeProvider();
    }
    return SequelizeProvider.instance.sequelize;
  }
}
