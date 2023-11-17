// @ts-ignore
import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
// import multer from 'multer';
import util from 'util';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Assuming the request body is in JSON format
  const emailStorage: Record<string, { subject: string, body: string }> = {};

  const accountSid = 'AC4ace975430e21483e572e120cb6a0b96';
  const authToken = 'fb4eaed8dba66ded28169729fe90b215';
  const twilioPhone = '+13344630152';
  const payload = req.body;
  const emailId = payload.sg_message_id; // Replace with the actual identifier in your emails
  const emailContent = emailStorage[emailId];
  const { subject, body } = emailContent;
  const recipientPhone = subject.split('|')[0].trim();

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const authHeader = 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  const twilioResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authHeader,
    },
    body: new URLSearchParams({
      'To': recipientPhone,
      'From': twilioPhone,
      'Body': body,
    } as any), // 'as any' if TypeScript complains
  }).then(response => response.json());

  return res.json({
    data: {
      subject,
      body,
      twilioResponse,
    },
  });

}
