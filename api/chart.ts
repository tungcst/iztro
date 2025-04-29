import { NowRequest, NowResponse } from '@vercel/node'
import { generateChart } from '../src/astro/chart'

export default async function handler(req: NowRequest, res: NowResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST is allowed' })
  }

  const { birthday, birthtime, gender } = req.body

  if (!birthday || !birthtime || !gender) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const result = generateChart({
      birthday,
      birthtime,
      gender
    })

    return res.status(200).json(result)
  } catch (e: any) {
    return res.status(500).json({ error: e.message })
  }
}
