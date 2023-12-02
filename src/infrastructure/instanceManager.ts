import { BussinesRepository } from "../adapters/bussinesRepository";
import { BussinesController } from "../adapters/controllerBussines";
import { BussinesService } from "../application/bussinesServices";
import { InstanceDB } from "../application/conectionInstance";
import { Bussines } from "../domain/bussines";
import { IBussines } from "../interfaces/bussinesInterface";
import { IModelDB } from "../interfaces/interfaceModel";
import { ModelDB } from "./modelDB";


export class InstanceManager {
    private bussinesData: IBussines;
    private databaseConnection: InstanceDB;
    private bussinesRepository:BussinesRepository;
    private bussinesService: BussinesService;
    private bussines: Bussines;
    private controller: BussinesController;
    private modelDB: IModelDB;

    constructor(bussinesData: IBussines) {
      this.bussinesData = bussinesData;
      this.databaseConnection = new InstanceDB();
      this.modelDB = new ModelDB(this.databaseConnection.createConnection())
      this.bussinesRepository = new BussinesRepository(this.modelDB);
      this.bussinesService = new BussinesService(this.bussinesRepository);
      this.bussines = new Bussines(this.bussinesData['bussinesData'], this.bussinesService);
      this.controller = new BussinesController(this.bussines);
    }
  
    getController(): BussinesController {
      return this.controller;
    }
  }
  