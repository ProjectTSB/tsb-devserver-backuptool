import { Transform, TransformCallback } from 'stream';

export class Pipe extends Transform {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public _transform(chunk: unknown, _encoding: BufferEncoding, callback: TransformCallback) {
        this.push(chunk);
        callback();
    }
}
