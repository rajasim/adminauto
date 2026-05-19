import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // 1. Set CORS headers so your Hostinger site can communicate with this API
  res.setHeader('Access-Control-Allow-Origin', 'https://autointellects.com'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 2. Handle the browser's automatic preflight "OPTIONS" safety check
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. Only allow POST requests for data submission
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 4. Run your database insertion logic
  try {
    const { name, email, phone, education, program, amount, status } = req.body;
    
    const enrollment = await prisma.enrollment.create({
      data: {
        name,
        email,
        phone,
        education,
        program,
        amount: parseFloat(amount),
        status: status || "Paid",
      },
    });

    return res.status(200).json({ success: true, data: enrollment });
  } catch (error) {
    console.error("Prisma Database Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}