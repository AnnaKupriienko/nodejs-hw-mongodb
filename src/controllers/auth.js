import { registerUser } from "../services/contacts.js";

export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);
    res.status(201).json({
        status: 201,
        message: "Successfully created a user!",
        data: user,
    })
}
