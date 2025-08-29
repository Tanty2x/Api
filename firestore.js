import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let db;
let adminInstance;

// Khởi tạo Firebase Admin SDK
try {
    // Kiểm tra các biến môi trường bắt buộc
    const requiredEnvVars = [
        'project_id',
        'private_key',
        'client_email'
    ];

    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }

    const serviceAccount = {
        type: "service_account",
        project_id: process.env.project_id,
        private_key_id: process.env.private_key_id || '',
        private_key: process.env.private_key.replace(/\\n/g, '\n'),
        client_email: process.env.client_email,
        client_id: process.env.client_id || '',
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.client_x509_cert_url || `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.client_email.replace('@', '%40')}`
    };

    adminInstance = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${process.env.project_id}.firebaseio.com`
    });

    db = adminInstance.firestore();

} catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw error;
}

export { db, adminInstance as admin };