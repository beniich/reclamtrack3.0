import express from 'express';
import {
  getSchemas,
  getSchema,
  createSchema,
  updateSchema,
  deleteSchema,
} from '../controllers/technicalSchema.controller.js';
import { authenticate } from '../middleware/security.js';

const router = express.Router();

router.use(authenticate); // Protected routes

router.route('/')
  .get(getSchemas)
  .post(createSchema);

router.route('/:id')
  .get(getSchema)
  .put(updateSchema)
  .delete(deleteSchema);

export default router;
