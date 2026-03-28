import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { Kafka } from 'kafkajs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3007;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://ollama:11434';
const KAFKA_BROKER = process.env.KAFKA_BROKER || 'kafka:9092';

app.use(cors());
app.use(express.json());

// --- Synchronous AI Chat Endpoint ---
app.post('/chat', async (req, res) => {
  const { prompt, model = 'llama3', system = '' } = req.body;

  try {
    const aiResponse = await axios.post(`${OLLAMA_URL}/api/generate`, {
      model,
      prompt,
      system,
      stream: false,
    });

    res.json({ success: true, response: aiResponse.data.response });
  } catch (error: any) {
    console.error('Ollama Error:', error.message);
    res.status(500).json({ success: false, error: 'Communication error with Ollama.' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'ai-service', ollamaUrl: OLLAMA_URL });
});

// --- Kafka Asynchronous Integration ---
const initKafka = async () => {
  try {
    const kafka = new Kafka({
      clientId: 'ai-service',
      brokers: [KAFKA_BROKER],
    });

    const consumer = kafka.consumer({ groupId: 'ai-service-group' });
    
    // Attempt connection
    await consumer.connect();
    console.log('🤖 Connected to Kafka Broker.');

    // Subscribe to topics like 'complaint.created'
    await consumer.subscribe({ topic: 'complaint.created', fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          if (!message.value) return;
          const payload = JSON.parse(message.value.toString());
          
          console.log(`🧠 AI processing event from ${topic}:`, payload);
          // TODO: Analyze the payload using Ollama and possibly send back to another topic 
          // like 'complaint.analyzed'.
        } catch (err) {
          console.error('Failed processing Kafka message:', err);
        }
      },
    });
  } catch (err) {
    console.error('Kafka initialization failed in AI Service. Continuing without Kafka...', err);
  }
};

app.listen(PORT, () => {
  console.log(`🤖 AI Service running on port ${PORT}`);
  initKafka();
});
