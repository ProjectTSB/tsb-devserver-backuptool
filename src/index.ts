import yaml from 'js-yaml';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

import { Config } from './types/Config';
import { DriveUpload } from './util/DriveUpload';
import { Compress } from './util/Compress';
import { Pipe } from './util/Pipe';
import { FileName } from './util/FileName';

const conf: Config = yaml.load(readFileSync('config.yaml', 'utf-8'));

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

const stream = Compress(conf.serverDirPath, conf.worldDirNames);
DriveUpload(stream.pipe(new Pipe()), conf.driveDirId, FileName());
