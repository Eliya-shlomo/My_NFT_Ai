import axios from 'axios';

export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/images/generate', {
      prompt,
      n: 1,
      size: '512x512'
    }, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ imageUrl: response.data.data[0].url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}
