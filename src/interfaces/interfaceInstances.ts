import { IDatabaseConnection } from "./databaseInterface";
import { IBussinesRepository } from "./interfaceRepository";

export interface IInstances {
    createInstances(): {
      databaseConnection: IDatabaseConnection;
      bussinesRepository: IBussinesRepository;
      bussinesService: any;
    };
  }