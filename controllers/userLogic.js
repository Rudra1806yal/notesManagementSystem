import User from '../model/user.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

const signUp = async (req, res) => {
     try {
        let { name, email, password, role } = req.body

        if (!name || !email || !password || !role) {
            return res.status(404).json({
                message: "data not found for user creation...",
                success: false
            })
        }

        let existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({
                message: 'user already exist with this email id ...',
                status: false
            })
        }

        let hashPassword;

        try {
            hashPassword = await bcrypt.hash(password, 10)
            
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'did not hashed password...'
            })
        }

        let user = await User.create({ name, email, role, password: hashPassword })

            res.status(200).json({
                success: true,
                message: 'user created successfully....', user
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'internal server error...', error
            })
        }
}

const login = async(req,res) => {
        try {
            const {email, password} = req.body

            if(!email || !password){
                return res.status(404).json({
                    success: false,
                    message: 'data not found for login...'
                })
            }

            let user = await User.findOne({email})

            if(!user){
                return res.status(401).json({
                    success: false,
                    message: 'user not found by this email id ...'
                })
            }

            if(await bcrypt.compare(password, user.password)){
                let token = jsonwebtoken.sign({ userid: user._id}, 'stuent key', {expiresIn: '3d'})

                res.cookie('tokenCookie', token, {maxAge: 3*24*60*60*1000})
                .status(200).json({
                    sucess: true,
                    token,
                    message: 'user created successfully....'
                })
            }else{
                return res.status(401).json({
                    message: 'invalid password...',
                    status: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'failed to login', error
            })
        }
    }

export { signUp, login }