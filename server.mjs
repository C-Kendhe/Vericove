import { createServer } from 'vite';
const port = Number(process.env.PORT || 4173);
const server = await createServer({ server: { host: '127.0.0.1', port } });
await server.listen();
server.printUrls();
