import { Router } from 'express';
import quoteRoutes from './quote.routes';
// Import other route modules here as they are created
// import authRoutes from './auth.routes';
// import userRoutes from './user.routes';
// import appointmentRoutes from './appointment.routes';

const router = Router();

// Mount quote routes
router.use('/quotes', quoteRoutes);

// Mount other routes
// router.use('/auth', authRoutes);
// router.use('/users', userRoutes);
// router.use('/appointments', appointmentRoutes);

// Default API route (optional)
router.get('/', (_req, res) => {
    res.json({ message: 'API is working' });
});

export default router;