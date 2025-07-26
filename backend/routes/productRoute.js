import express from 'express'
import { getAllProducts } from '../controllers/productController.js';

const Router = express.Router();

Router.get('/products', getAllProducts);

export default Router;
