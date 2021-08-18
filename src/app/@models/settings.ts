export default class Settings {
    mysql: MySqlSettings = new MySqlSettings();
    redis: RedisSettings;
    firebase: FirebaseAdminSettings;
    googleMapsKey: string;
    purchaseCode: string;
    version?: number;
}

export class MySqlSettings {
    host: string = 'locahost';
    user: string = 'root';
    password: string = '';
    database: string = 'taxinew';
    port: number = 3306;
}

export class FirebaseAdminSettings {
    driver: FirebaseAdminCredential;
    rider: FirebaseAdminCredential;
}

export class FirebaseAdminCredential {
    keyFile: string;
    dbUrl: string;
}

export class RedisSettings {
    port: number;
    host: string;
    requestDistance: number;
}