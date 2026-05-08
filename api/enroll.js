import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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