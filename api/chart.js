const { createZiWeiChart } = require('../src/star');
const { Gender } = require('../src/astro/types');

module.exports = (req, res) => {
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
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
