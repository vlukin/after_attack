import { io, Socket } from 'socket.io-client';

const SERVER_URL = `${window.location.protocol}//${window.location.hostname}:3001`;

class GameService {
  private socket: Socket | null = null;

  connect(username: string): Socket {
    this.socket = io(SERVER_URL, {
      query: { username }
    });
    return this.socket;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinGame(): void {
    this.socket?.emit('joinGame');
  }

  makeBlame(targetPlayerId: string): void {
    this.socket?.emit('makeBlame', { targetPlayerId });
  }

  playAgain(): void {
    this.socket?.emit('playAgain');
  }
}

export const gameService = new GameService();
export default gameService;
