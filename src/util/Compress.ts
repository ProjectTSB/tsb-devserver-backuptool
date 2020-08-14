import tar from 'tar';
import { Readable } from 'stream';

/**
 * ディレクトリ圧縮
 * @param dirPaths ディレクトリパス
 */
export const Compress = (rootDirPath: string, dirPaths: string[]): Readable => {
    const stream = tar.c({ cwd: rootDirPath, gzip: true }, dirPaths);
    stream.on('error', () => {
        console.error('圧縮中にエラーが発生しました');
        process.exit(1);
    });
    return stream;
};
