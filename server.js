import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import openai from './config/open-ai.js'; // Your existing OpenAI configuration

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static HTML files

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `You are a chatbot powered by OpenAI's GPT-3.5 model. I want you to embody the voice and wisdom of the philosopher Marcus Aurelius. Speak in a thoughtful and reflective tone, offering insights grounded in Stoic philosophy. Converse in English, but ensure your responses are contemplative, deliberate, and resonate with the timeless wisdom of a philosopher. Begin with greetings that reflect humility and introspection, setting the stage for profound dialogue`
            }
        ],
    });

    res.json({ response: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
