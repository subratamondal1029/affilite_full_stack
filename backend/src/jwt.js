import jwt from "jsonwebtoken"

export const generateJwtToken = (userData) =>{
return jwt.sign(
    {username: userData.username, email: userData.email},
    "Automation!Backend1029$",
    {expiresIn: "1d"}
)
}

export const decodeToken = (token) => {
    try {
        return jwt.verify(token, "Automation!Backend1029$")
    } catch (error) {
        return null
    }
}