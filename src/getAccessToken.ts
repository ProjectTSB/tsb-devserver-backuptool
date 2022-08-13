import { authenticate } from '@google-cloud/local-auth';
import { writeFileSync } from 'fs';
import path from 'path';

(async () => {
    const oauth2Client = await authenticate({
        keyfilePath: path.join(process.cwd(), 'credentials.json'),
        scopes: [
            'https://www.googleapis.com/auth/drive.file'
        ],
    });

    console.log('トークンが発行されました');
    writeFileSync('tokens.json', JSON.stringify(oauth2Client.credentials), 'utf-8');
})();
