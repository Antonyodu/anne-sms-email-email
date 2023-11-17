// @ts-ignore
import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch';
export default function handler(req: VercelRequest, res: VercelResponse) {
  const { subject, body } = req.query


  const accountSid = 'AC4ace975430e21483e572e120cb6a0b96';
  const authToken = 'fb4eaed8dba66ded28169729fe90b215';
  const twilioPhone = '+13344630152';
  const recipientPhone = subject;
  const messageBody = body;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const authHeader = 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authHeader,
    },
    body: new URLSearchParams({
      'To': recipientPhone,
      'From': twilioPhone,
      'Body': messageBody,
    } as string),
  })
    .then(response => response.json())
    .then(data => console.log('Message sent:', data))
    .catch(error => console.error('Error sending message:', error));


  return res.json({
    data: req.query
  })
}
