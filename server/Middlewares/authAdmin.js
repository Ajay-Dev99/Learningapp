const jwt = require("jsonwebtoken")

const authAdmin = (req, res, next) => {
    try {

        const { Admin_token } = req.cookies;
        if (!Admin_token) {
            return res.status(401).json({ error: 'jwt not found' })
        }

        const verifiedToken = jwt.verify(Admin_token, process.env.JWT_SECRETE)
        if (!verifiedToken) {
            return res.status(401).json({ error: "Admin not authorized" })
        }

        if (verifiedToken.role !== "admin") {
            return res.status(401).json({ error: "Access denied" })
        }

        req.admin = verifiedToken.id

        next()
    } catch (error) {

        res.status(error.status || 401).json({ error: error.message || "admin authorization failed" })
    }
}

module.exports = authAdmin

