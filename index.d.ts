declare module 'adventure-acl' {
    import { Connection as MongoConnection, ConnectOptions as MongoConnectOptions } from "mongoose";
    import { Connection as MQConnection } from "amqplib";

    // MQ Client
    export interface MQClientConfigInterface {
        url: string;
        reconnect?: boolean;
        retryConnectionTime?: number;
    }

    export class MQClient {
        constructor(config: MQClientConfigInterface);
        public connect(): Promise<void>;
        public get connection(): MQConnection;
    }

    // Mongo Client
    export interface MongoClientConfigInterface {
        url: string;
        reconnect?: boolean;
        retryConnectionTime?: number;
    }
    
    export class MongoClient {
        constructor(config: MongoClientConfigInterface, mongoOptions: MongoConnectOptions);
        constructor(config: MongoClientConfigInterface);
        public connect(): Promise<void>;
        public get connection(): MongoConnection;
    }
}

