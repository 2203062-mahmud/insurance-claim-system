import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import policyRoutes from './routes/policyRoutes.js';
import claimRoutes from './routes/claimRoutes.js';
import governanceRoutes from './routes/governanceRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/system/health', (req, res) => {
  res.json({ status: 'ok', message: 'Insurance Claim System backend is running' });
});

app.use('/api/policies', policyRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api', governanceRoutes);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
