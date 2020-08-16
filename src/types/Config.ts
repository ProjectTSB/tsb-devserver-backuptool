export type Config = {
    serverDirPath: string;
    worldDirNames: string[];
    driveDirId: string;
    rcon: {
        host: string;
        port: number;
        password: string;
    };
};
