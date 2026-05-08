import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function handler(req, res) {
  // Allow your Enrollment site to talk to this API
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle the "preflight" request from the browser
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ... your existing Prisma logic below
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
    return res.status(500).json({ success: false, error: error.message });
  }
}