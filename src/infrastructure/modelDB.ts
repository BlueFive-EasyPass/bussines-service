import { DataTypes } from 'sequelize';
import { IDatabaseConnection } from '../interfaces/databaseInterface';
import { IModelDB } from '../interfaces/interfaceModel';


export class ModelDB implements IModelDB {
    private connection: IDatabaseConnection;
    private instance: IDatabaseConnection['getInstance'];

    constructor(connection: IDatabaseConnection) {
        this.connection = connection;
        this.instance = this.connection.getInstance();
    }

    private defineModel() {
        return this.instance.define('bussines', {
            buss_CNPJ: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            buss_nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buss_contato: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            buss_FotoPerfil: {
                type: DataTypes.STRING,
            },
            buss_endCEP: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buss_endUF: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buss_endrua: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buss_endnum: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buss_endcomplemento: {
                type: DataTypes.STRING,
            },
            buss_endcidade: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buss_tipo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buss_senha: {
                type: DataTypes.STRING
            },
            buss_status: {
                type: DataTypes.STRING
            },
            buss_endbairro: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buss_email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            tableName: 'bussines',
            timestamps: false
        });
    }

    async syncModel() {
        try {
            const bussines = this.defineModel();
            this.connection.Connect();
            await this.instance.sync();
            console.log('Modelo sincronizado com o banco de dados');
            return bussines;
        } catch (err) {
            console.error('Erro ao sincronizar o modelo:', err);
            throw err;
        }
    }

    desconnectModel() {
        console.log('Modelo desconectado');
        this.connection.Disconnect();
    }
}
