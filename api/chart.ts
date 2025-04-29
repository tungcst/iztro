import { VercelRequest, VercelResponse } from '@vercel/node';
import { createZiWeiChart } from '../src/astro/core';
import { Gender } from '../src/astro/types';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { birthday, birthtime, gender } = req.body;

  if (!birthday || !birthtime || !gender) {
    return res.status(400).json({ error: 'Missing birthday, birthtime, or gender' });
  }

  try {
    const chart = createZiWeiChart({
      birthday,
      birthtime,
      gender: gender === 'male' ? Gender.Male : Gender.Female,
    });

    return res.status(200).json(chart);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
