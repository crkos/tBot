import { Sequelize } from "sequelize-typescript"

export const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
    database: 'testdbBot',
    models: [__dirname + '/models/*.model.ts']
});