import yaml from 'js-yaml';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { Rcon } from 'rcon-client';

import { Config } from './types/Config';
import { DriveUpload } from './util/DriveUpload';
import { Compress } from './util/Compress';
import { Pipe } from './util/Pipe';
import { FileName } from './util/FileName';

const main = async () => {
    const conf = yaml.load(readFileSync('config.yaml', 'utf-8')) as Config;

    try {
        const rcon = await Rcon.connect({
            host: conf.rcon.host,
            port: conf.rcon.port,
            password: conf.rcon.password
        });

        if (!existsSync(conf.serverDirPath)) {
            console.error('サーバーディレクトリが見つかりません');
            process.exit(1);
        }

        for (const dirName of conf.worldDirNames) {
            if (!existsSync(path.join(conf.serverDirPath, dirName))) {
                console.error('ワールドディレクトリが見つかりません');
                process.exit(1);
            }
        }

        await rcon.send('save-all');
        await rcon.send('save-off');
        await rcon.send('tellraw @a {"text": "ワールドをバックアップ中...", "bold": true, "color": "blue"}');

        const stream = Compress(conf.serverDirPath, conf.worldDirNames);
        await DriveUpload(stream.pipe(new Pipe()), conf.driveDirId, FileName());

        await rcon.send('tellraw @a {"text": "バックアップが完了しました", "bold": true, "color": "blue"}');
        await rcon.send('save-on');

        await rcon.end();
    }
    catch {
        console.error('サーバーに接続できませんでした');
        process.exit(1);
    }
};
main();
