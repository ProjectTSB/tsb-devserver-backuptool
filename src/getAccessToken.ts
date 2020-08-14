import { google } from 'googleapis';
import { createInterface } from 'readline';
import { readFileSync, writeFileSync } from 'fs';

import { Credentials } from './types/Credentials';


const getAccessToken = () => {
    const credentials: Credentials = JSON.parse(readFileSync('credentials.json', 'utf8'));
    const { client_id, client_secret, redirect_uris } = credentials.installed;

    const scope = ['https://www.googleapis.com/auth/drive.file'];

    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // OAuth2認証のためのURLを生成する
    // refresh_tokenが必要なので、offlineを指定
    const url = oauth2Client.generateAuthUrl({ access_type: 'offline', scope });

    console.log('右記のURLをブラウザで開いてください: ', url);

    const rl = createInterface({ input: process.stdin, output: process.stdout });
    rl.question('表示されたコードを貼り付けてください:', code => {
        oauth2Client.getToken(code, (_err, tokens) => {
            console.log('トークンが発行されました');
            writeFileSync('tokens.json', JSON.stringify(tokens), 'utf-8');
            process.exit(0);
        });
    });
};

getAccessToken();
