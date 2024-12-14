// backend/controllers/userController.js
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        const user = await User.create({
            name,
            email,
            password,
            otp,
            otpExpiry,
            isEmailVerified: false
        });

        // Send OTP email
        // You'll need to set up nodemailer or any email service
        // sendOTPEmail(email, otp);

        res.status(201).json({
            message: "Registration successful. Please verify your email with OTP"
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ 
            email,
            otp,
            otpExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (!user.isEmailVerified) {
            return res.status(400).json({ message: "Please verify your email first" });
        }

        // ... rest of your login logic
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};