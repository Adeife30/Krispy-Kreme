import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customerID: mongoose.Schema.Types.ObjectId,
  products: [Object], // Array of products with title, quantity, etc.
  totalCost: Number,
  timePlaced: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
