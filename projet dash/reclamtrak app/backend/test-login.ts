import axios from 'axios';

const URL = 'http://localhost:5001';
const LOGIN_URL = `${URL}/api/auth/login`;

async function testLogin() {
    console.log('Testing login...');
    console.log(`URL: ${LOGIN_URL}`);

    try {
        const response = await axios.post(LOGIN_URL, {
            email: 'admin@reclamtrack.com',
            password: 'l'
        });

        console.log('✅ Login Successful!');
        console.log('Received Status:', response.status);
        if (response.data.token) {
            console.log('Token received: YES');
        } else {
            console.log('Token received: NO');
        }
    } catch (error: any) {
        if (error.response) {
            console.log('❌ Login Failed with Server Response:');
            console.log('Status:', error.response.status);
            console.log('Data:', JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
            console.log('❌ Login Failed - No Response from Server (Connection Refused?)');
            console.log(error.message);
        } else {
            console.log('❌ Error setting up request:', error.message);
        }
    }
}

testLogin();
