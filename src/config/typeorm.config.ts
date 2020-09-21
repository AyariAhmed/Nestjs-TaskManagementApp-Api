import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';
import * as PostgressConnectionStringParser from 'pg-connection-string';



const connectionOptions = PostgressConnectionStringParser.parse(process.env.DATABASE_URL);


const dbConfig = config.get('db'); 

export const typeOrmConfig: TypeOrmModuleOptions = {
         type: dbConfig.type,
         host: connectionOptions.host || dbConfig.host,
         port: connectionOptions.port || dbConfig.port,
         username: connectionOptions.user || dbConfig.username,
         password: connectionOptions.password || dbConfig.password,
         database: connectionOptions.database || dbConfig.database,
         entities: [__dirname + '/../**/*.entity.{ts,js}'],
         synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
       };