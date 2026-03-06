import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { GameManager } from './game/GameManager';
import { adjectivesEN, animalNounsEN, adjectives, animalNouns, departments } from './data/dictionaries';
import { securityEvents, excuses } from './data/events';
import lastWords from './data/last_words.json';
import logger from './logger';

const app = express();
app.use(cors());

app.get('/api/dictionaries', (req, res) => {
  res.json({
    adjectivesEN,
    animalNounsEN,
    adjectives,
    animalNouns,
    departments,
    securityEvents,
    excuses,
    lastWords
  });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

function sanitizeUsername(username: string | undefined | null): string {
  if (!username || typeof username !== 'string') {
    return 'Anonymous';
  }
  
  const trimmed = username.trim();
  
  if (trimmed.length < 1 || trimmed.length > 100) {
    return 'Anonymous';
  }
  
  const validPattern = /^[а-яА-ЯёЁa-zA-Z0-9\s\-_]+$/;
  if (!validPattern.test(trimmed)) {
    return 'Anonymous';
  }
  
  return trimmed;
}

const gameManager = new GameManager(io);

io.on('connection', (socket) => {
  logger.info(`Client connected:`, socket.id);

  socket.on('joinGame', (username: string) => {
    const sanitized = sanitizeUsername(username);
    logger.info(`Player joining: ${sanitized} (${socket.id})`);
    gameManager.addPlayer(socket.id, sanitized);
  });

  socket.on('makeBlame', ({ targetPlayerId }: { targetPlayerId: string }) => {
    logger.info(`Blame made:`, socket.id, '->', targetPlayerId);
    gameManager.makeBlame(socket.id, targetPlayerId);
  });

  socket.on('playAgain', () => {
    logger.info(`Play again:`, socket.id);
    gameManager.reset(socket.id);
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected:`, socket.id);
    gameManager.removePlayer(socket.id);
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
