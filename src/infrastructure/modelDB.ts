import { DataTypes } from 'sequelize';
import { IDatabaseConnection } from '../interfaces/databaseInterface';


export class ModelDB {
    private connection: IDatabaseConnection;
    private instance;

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
                allowNull: false
            },
            buss_endCEP: {
                type: DataTypes.DATEONLY
            },
            buss_endUF: {
                type: DataTypes.STRING
            },
            buss_endrua: {
                type: DataTypes.STRING
            },
            buss_endnum: {
                type: DataTypes.STRING
            },
            buss_endcomplemento: {
                type: DataTypes.STRING
            },
            buss_endcidade: {
                type: DataTypes.STRING
            },
            buss_tipo: {
                type: DataTypes.STRING
            },
            buss_senha: {
                type: DataTypes.STRING
            },
            buss_status: {
                type: DataTypes.STRING
            },
            buss_endbairro: {
                type: DataTypes.STRING
            },
            buss_email: {
                type: DataTypes.STRING
            }
        }, {
            tableName: 'user',
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
        } finally {
            this.connection.Disconnect();
        }
    }
}
