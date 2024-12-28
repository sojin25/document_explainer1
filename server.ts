import express from 'express';
import cors from 'cors';
import { simplifyDocument, generateAnswer } from './src/services/openai';
import { validateDocument, validateQuestion } from './src/utils/validation';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/api/simplify', async (req, res) => {
  try {
    const { text } = req.body;
    if (!validateDocument(text)) {
      return res.status(400).json({ error: '無効な入力です' });
    }

    const result = await simplifyDocument(text);
    res.json(result);
  } catch (error) {
    console.error('Document simplification error:', error);
    res.status(500).json({ error: '処理中にエラーが発生しました' });
  }
});

app.post('/api/question', async (req, res) => {
  try {
    const { question, context } = req.body;
    if (!validateQuestion(question) || !validateDocument(context)) {
      return res.status(400).json({ error: '無効な入力です' });
    }

    const answer = await generateAnswer(question, context);
    res.json({ answer });
  } catch (error) {
    console.error('Question answering error:', error);
    res.status(500).json({ error: '処理中にエラーが発生しました' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});