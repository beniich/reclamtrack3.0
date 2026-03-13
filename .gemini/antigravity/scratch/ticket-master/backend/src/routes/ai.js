import express from 'express';
import aiService from '../services/aiService.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
// Analyser une plainte avec l'IA
router.post('/analyze', protect, async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Le titre et la description sont requis' });
        }
        const analysis = await aiService.analyzeComplaint(title, description);
        res.json(analysis);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;
//# sourceMappingURL=ai.js.map