import bodyParser from 'body-parser';
import 'dotenv/config';
import connectDB from './src/config/db.js';
import express from 'express';
import todoRoutes from './src/routes/todoRoutes.js';
import helmet from 'helmet';
import { paths } from './src/config/paths.js';

const app = express();

// Secuirty
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true,
    frameguard: {
      action: 'deny',
    },
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', paths.views);
app.use(express.static(paths.public));

// Routes
app.use('/', todoRoutes);

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default app;
