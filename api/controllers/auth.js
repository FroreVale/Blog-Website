import db from "../db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = (req,res) => {

    // Check existing user
    const saltRounds = 10;
    const q = "SELECT * FROM users WHERE email = $1 OR username = $2";
    
    db.query(q,[req.body.email, req.body.username], (err, data) => {
        if(err) return res.json(err);
        if(data.rows.length) return res.status(409).json("User already exists!");

        //Hash the password and create a user
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            if (err) {
                console.log(err);
            } else {
                const q = `
                INSERT INTO users (username, email, password)
                VALUES ($1, $2, $3);
                `;
                const values = [req.body.username, req.body.email, hash];

                db.query(q, values, (err, data) => {
                    if(err) return res.json(err);
                    return res.status(200).json("User has been created.");
                });
            }
        });
    });

    
}
export const login = (req,res) => {
    //Check user
    const q = "SELECT * FROM users WHERE username = $1";

    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.json(err);
        if(data.rows.length === 0) return res.status(404).json("User not found!");

        //Check Password
        bcrypt.compare(req.body.password, data.rows[0].password, (err, result) => {
            if (err) {
                console.log("Error comparing passwords:", err);
            } else {
                if(result) {
                    const token = jwt.sign({id: data.rows[0].id}, "jwtkey");
                    const {password, ...other} = data.rows[0];

                    res.cookie("access_token", token , {
                        httpOnly:true
                    }).status(200).json(other)
                } else {
                    res.status(400).json("Wrong username or password!");
                }
            }
        });
    });
}
export const logout = (req,res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("Use has been logged out.");
}