import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  appType: 'mpa',
  base: './',
  server: {
    host: true,
    port: 5176,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    {
      name: 'serve-next-images',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.includes('/_next/image-')) {
            const cleanUrl = req.url.split('?')[0];
            const filePath = path.join(__dirname, cleanUrl);
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'image/jpeg');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }
          next();
        });
      },
    },
  ],
});
