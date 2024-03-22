import { Sequelize } from "sequelize";
import { SequelizeProvider } from ".";

export abstract class SequelizeORMService {
  modelName: string;
  sequelizeProvider: Sequelize;

  constructor(modelName: string, attributes?: string[]) {
    this.modelName = modelName;
    this.sequelizeProvider = SequelizeProvider.Provider();
  }

  async getByIds(ids?: any, viewAttributes?: any[]): Promise<any> {
    return [];
  }

  async getAll(params?: any, viewAttributes?: any[]): Promise<any> {
    return [];
  }

  async getById(id: any, options?: any): Promise<any> {
    return {};
  }

  async findOne(params: any): Promise<any> {
    return {};
  }

  async create(data: any, options?: any): Promise<any> {
    return {};
  }

  async update(id: number, data: any, options?: any): Promise<any> {
    return {};
  }

  async delete(options: any): Promise<any> {
    return {};
  }

  async findAll(params: any): Promise<any[]> {
    return [];
  }
}
