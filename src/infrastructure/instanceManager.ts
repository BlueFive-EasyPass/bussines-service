import { BussinesRepository } from "../adapters/bussinesRepository";
import { BussinesController } from "../adapters/controllerBussines";
import { BussinesService } from "../application/bussinesServices";
import { InstanceDB } from "./conectionInstance";
import { Bussines } from "../domain/bussines";
import { IModelDB } from "../interfaces/interfaceModel";
import { ModelDB } from "./modelDB";
import { IMidBussines } from "../interfaces/interfaceMidBussines";
import { MidBussines } from "../application/midBussines";
import { IBussines } from "../interfaces/bussinesInterface";
import { IBussinesRepository } from "../interfaces/interfaceRepository";
import { IBussinesService } from "../interfaces/interfaceService";
import { IController } from "../interfaces/interfaceController";


export class InstanceManager {
    private bussinesData: IBussines['bussinesData'];
    private databaseConnection: InstanceDB;
    private bussinesRepository: IBussinesRepository;
    private bussinesService: IBussinesService;
    private bussines: IBussines;
    private controller: IController;
    private modelDB: IModelDB;
    private mid: IMidBussines;

    constructor(bussinesData: IBussines['bussinesData']) {
      this.bussinesData = bussinesData;
      this.databaseConnection = new InstanceDB();
      this.modelDB = new ModelDB(this.databaseConnection.createConnection())
      this.bussinesRepository = new BussinesRepository(this.modelDB);
      this.bussinesService = new BussinesService(this.bussinesRepository);
      this.bussines = new Bussines(this.bussinesData, this.bussinesService);
      this.mid = new MidBussines(this.bussines)
      this.controller = new BussinesController(this.bussines, this.mid);
    }
  
    getController(): IController {
      console.log(this.bussinesData);

      return this.controller;
    }
  }
  