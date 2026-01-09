import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router as categoryRouter } from './routes/category.routes';
import { router as dishRouter } from './routes/dish.routes';
import { router as orderRouter } from './routes/order.routes';
import { setupSSE, getSSEStatus } from './sse';
import { initializeAbly, publishMessage } from './ably';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Initialize Ably on app startup
try {
  initializeAbly();
} catch (error) {
  console.warn('Ably initialization warning:', error);
}

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
// Endpoint opcional para debugar SSE
app.get('/api/sse/status', (_req, res) => res.json(getSSEStatus()));

// Endpoint SSE de pedidos
app.get('/api/orders/stream', (req, res) => {
  setupSSE(req, res);
});

app.use('/api/categories', categoryRouter);
app.use('/api/dishes', dishRouter);
app.use('/api/orders', orderRouter);

export default app;
export { publishMessage };
