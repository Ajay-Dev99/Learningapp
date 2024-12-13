const adminDb = require("../Models/adminModel");
const { createToken } = require("../Utilities/generateToken");
const { hashPassword, comparePassword } = require("../Utilities/passwordUtilities")


const register = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body, 'body');

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are reqiured" })
        }
        const alreadyExist = await adminDb.findOne({ email })
        if (alreadyExist) {
            return res.status(400).json({ error: "Email already Exist" })
        }
        const hashedPassword = await hashPassword(password)
        const newAdmin = new adminDb({
            email, password: hashedPassword
        })
        const saved = await newAdmin.save()
        if (saved) {
            return res.status(200).json({ message: "Admin created", saved })
        }
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const adminExist = await adminDb.findOne({ email })
        if (!adminExist) {
            return res.status(400).json({ error: "Admin Not found" })
        }

        const passwordMatch = await comparePassword(password, adminExist.password)
        if (!passwordMatch) {
            return res.status(400).json({ error: "Passwords does not match" })
        }
        const token = createToken(adminExist._id, "admin")
        res.cookie("Admin_token", token)
        return res.status(200).json({ message: "Admin login successfull", adminExist })

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("Admin_token")
        res.status(200).json({ message: "logout succesfull" })
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

module.exports = {
    register,
    login,
    logout
}