import { google } from 'googleapis';
import { redirect } from '@sveltejs/kit';

const oauth2Client = new google.auth.OAuth2(
    '161714874123-0ak65hus6v6mf6ilfpa50138dpbogha4.apps.googleusercontent.com',
    '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',
    'http://localhost:5173/auth'
);

const SCOPES = ['https://www.googleapis.com/auth/documents.readonly'];

// this should only run in dev
export async function GET({ cookies, url }) {
    const code = url.searchParams.get('code');
    
    if (code) {
        // Handle callback
        const { tokens } = await oauth2Client.getToken(code);
        cookies.set('google_session', JSON.stringify(tokens), {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        
        throw redirect(303, '/');
    }
    
    // Initial auth request
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'  // Always get refresh token
    });
    
    throw redirect(303, authUrl);
}