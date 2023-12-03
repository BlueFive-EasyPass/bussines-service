import { SequelizeConnection } from './database';
import { IDatabaseConnection, IInstanceDB } from '../interfaces/databaseInterface';


export class InstanceDB implements IInstanceDB  {
    createConnection(): IDatabaseConnection {
        const sequelizeConnection = new SequelizeConnection();

        const databaseConnection: IDatabaseConnection = {
            Connect: () => sequelizeConnection.Connect(),
            Disconnect: () => sequelizeConnection.Disconnect(),
            getInstance: () => sequelizeConnection.getInstance(),
        };

        return databaseConnection;
    }
}