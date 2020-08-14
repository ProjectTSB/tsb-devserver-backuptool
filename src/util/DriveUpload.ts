import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { Transform } from 'stream';

import { Credentials } from '../types/Credentials';
import { Tokens } from '../types/Tokens';

export const DriveUpload = async (stream: Transform, dirId: string, fileName: string): Promise<void> => {
    const credentials: Credentials = JSON.parse(readFileSync('credentials.json', 'utf-8'));
    const tokens: Tokens = JSON.parse(readFileSync('tokens.json', 'utf-8'));

    const { client_id, client_secret, redirect_uris } = credentials.installed;
    const { refresh_token } = tokens;

    const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    auth.setCredentials({ refresh_token });

    console.log('アップロード中...');
    const drive = google.drive({ version: 'v3', auth });
    await drive.files.create({
        supportsTeamDrives: true,
        requestBody: {
            name: fileName,
            parents: [dirId]
        },
        media: {
            mimeType: 'application/gzip',
            body: stream
        }
    }).catch(() => {
        console.error('アップロード中にエラーが発生しました');
        process.exit(1);
    });

    console.log('アップロードしました');
};
