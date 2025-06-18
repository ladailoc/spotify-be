import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // check if the user already exists
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      // sign up the user
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
      return res
        .status(201)
        .json({ success: true, message: "User signed up successfully!" });
    }
  } catch (error) {
    console.log("Error in auth callback:", error);
    next(error);
  }
};
