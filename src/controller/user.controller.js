import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    // Fetch all users except the current user (ne == not equal)
    const users = await User.find({ clerkId: { $ne: currentUserId } });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
