require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const accountSid = ''; // Your Account SID
const authToken = ''; // Your Auth Token
const verifyServiceSid = ''; // Your Verify Service SID

const client = twilio(accountSid, authToken);

let verificationSid = '';

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
    const phoneNumber = req.body.phoneNumber;

    client.verify.v2.services(verifyServiceSid)
        .verifications
        .create({ to: phoneNumber, channel: 'sms' })
        .then(verification => {
            verificationSid = verification.sid;
            res.send({ success: true });
        })
        .catch(error => {
            console.error('Error sending OTP:', error);
            res.status(500).send({ success: false, error: error.message });
        });
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
    const otp = req.body.otp;
    const phoneNumber = req.body.phoneNumber;

    client.verify.v2.services(verifyServiceSid)
        .verificationChecks
        .create({ to: phoneNumber, code: otp })
        .then(verification_check => {
            if (verification_check.status === 'approved') {
                res.send({ success: true });
            } else {
                res.send({ success: false, message: 'Invalid OTP' });
            }
        })
        .catch(error => {
            console.error('Error verifying OTP:', error);
            res.status(500).send({ success: false, error: error.message });
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
