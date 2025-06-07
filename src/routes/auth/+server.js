import { google } from 'googleapis';
import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'http://localhost:5173/auth'
);

const SCOPES = ['https://www.googleapis.com/auth/documents.readonly'];

export async function GET({ cookies, url }) {
    if (!dev){
        throw redirect(303, '/')
    }
    const code = url.searchParams.get('code');
    
    if (code) {
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