import express from 'express';

const router = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';

import { admin, protect } from '../middlewares/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderByID);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
export default router;
