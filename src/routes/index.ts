import express from 'express';
import product_routes from './api/product';
const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response) => {
  res.send('main api route');
});

routes.use('/product', product_routes);

export default routes;
