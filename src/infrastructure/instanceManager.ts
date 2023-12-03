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
import { IAWSConfig } from "../interfaces/interfaceAWS";
import { AWSS3Config } from "./AWSManager";
import { IInstanceManager } from "../interfaces/interfaceInstanceManager";


export class InstanceManager implements IInstanceManager {
    private bussinesData: IBussines['bussinesData'];
    private databaseConnection: InstanceDB;
    private bussinesRepository: IBussinesRepository;
    private bussinesService: IBussinesService;
    private bussines: IBussines;
    private controller: IController;
    private modelDB: IModelDB;
    private mid: IMidBussines;
    private imagem: IBussines['imagem'];
    private AWS: IAWSConfig

    constructor(bussinesData: IBussines['bussinesData'], imagem: IBussines['imagem']) {
      this.bussinesData = bussinesData;
      this.imagem = imagem;
      this.AWS = new AWSS3Config()
      this.databaseConnection = new InstanceDB();
      this.modelDB = new ModelDB(this.databaseConnection.createConnection())
      this.bussinesRepository = new BussinesRepository(this.modelDB, this.AWS);
      this.bussinesService = new BussinesService(this.bussinesRepository);
      this.bussines = new Bussines(this.bussinesData, this.bussinesService, this.imagem);
      this.mid = new MidBussines(this.bussines['bussinesData'])
      this.controller = new BussinesController(this.bussines, this.mid);
    }
  
    getController(): IController {
      console.log(this.bussinesData);

      return this.controller;
    }
  }
  