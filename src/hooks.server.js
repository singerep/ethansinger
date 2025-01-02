import { redirect } from '@sveltejs/kit';
import { google } from 'googleapis';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { dev } from '$app/environment';

const SCOPES = ['https://www.googleapis.com/auth/documents.readonly'];

// gotta get this outta here
const oauth2Client = new google.auth.OAuth2(
    '161714874123-0ak65hus6v6mf6ilfpa50138dpbogha4.apps.googleusercontent.com',
    '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',
    'http://localhost:5173/auth'
);

export async function handle({ event, resolve }) {
    if (!dev){
        return
    }
    const session = event.cookies.get('google_session');
    
    if (event.url.pathname.startsWith('/auth')) {
        return resolve(event);
    }
    
    if (!session) {
        throw redirect(303, '/auth');
    }
    
    try {
        const tokens = JSON.parse(session);
        oauth2Client.setCredentials(tokens);
        
        if (oauth2Client.isTokenExpiring()) {
            const { credentials } = await oauth2Client.refreshAccessToken();
            event.cookies.set('google_session', JSON.stringify(credentials), {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });
        }
        
        // event.locals.docsClient = google.docs({ version: 'v1', auth: oauth2Client });
        event.locals.docsClient = google.docs({ version: 'v1', auth: oauth2Client });
        
    } catch (error) {
        event.cookies.delete('google_session');
        throw redirect(303, '/auth');
    }
    
    return resolve(event);
}