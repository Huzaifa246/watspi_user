import { useState } from "react"
import styles from "./index.module.css"
import axios from "axios";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Navigate } from "react-router-dom";

const Login = () => {
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [loginError, setLoginError] = useState("")

    const [isSignedUp, setIsSignedUp] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const [timer, setTimer] = useState(60);
    const [wrongEmailCode, setWrongEmailCode] = useState(false);
    const [passwordResetPage, setPasswordResetPage] = useState(false);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // window.location.href = "/dashboard";

        if (!email || !password) {
            setLoginError("Invalid Email or Password")
            return
        }
        setShowLoader(true)
        const credentials = {
            email: email,
            password: password
        }

        axios.post("http://192.168.100.1:3000/api/users/login", credentials,
        ).then(async (res) => {
            let response = res?.data?.data
            console.log(response, "response")
            localStorage.setItem("token", response?.data)

            setShowLoader(false)
            window.location.href = "/dashboard";
        })
            .catch((err) => {
                console.log(err)
                const response = err?.response?.data?.data

                if (response?.message.includes("Email not found")) {
                    setLoginError("Invalid Credentials, Please Check email.")
                } else if (response?.message.includes("Invalid credentials")) {
                    setLoginError("Invalid Password, Please Check Your Password.")
                }
                else if (response?.status !== "verified") {
                    setLoginError("Email not verified")
                }
                else {
                    setLoginError("An error occurred, Check Credentials");
                }
                setShowLoader(false)
            })
    }

    //Sign up
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();

        // setIsSignedUp(true);
        window.location.href = "/otpForm"
        // Start the OTP timer (countdown from 60 seconds)
        // const otpTimer = setInterval(() => {
        //     if (timer > 0) {
        //         setTimer(timer - 1);
        //     } else {
        //         clearInterval(otpTimer); // Stop the timer when it reaches 0
        //         // Optionally, you can handle what happens when the timer reaches 0 here
        //     }
        // }, 1000);
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>

                {/* <div className={styles.content_wrapper} style={{
                    right: isLoginForm ? 0 : "calc(100% - 450px)"
                }} /> */}

                <div className={styles.content} style={{
                    right: !isLoginForm ? 0 : "-220px",
                    scale: !isLoginForm ? 1 : .5,
                    transformOrigin: "right center",
                    opacity: !isLoginForm ? 1 : 0,
                    pointerEvents: !isLoginForm ? "initial" : "none",
                }}>
                    <h2>Logo</h2>
                    <h2>Hello There!</h2>
                    <h3>Signup to Watspi And Random Text.</h3>
                    <div className={styles.content_bottom}>
                        <p>Already have an account?</p>
                        <button className={styles.btn} onClick={() => setIsLoginForm(true)}>Sign In</button>
                    </div>
                </div>

                <form className={`${styles.login_form} ${styles.form}`} style={{
                    right: isLoginForm ? 40 : "-220px",
                    scale: isLoginForm ? 1 : .5,
                    transformOrigin: "right center",
                    opacity: isLoginForm ? 1 : 0,
                    pointerEvents: isLoginForm ? "all" : "none",
                    display: "flex",
                    flexDirection: "column"
                }}
                    onSubmit={handleLoginSubmit}>
                    <div>
                        <h2>Sign in to your Watspi Account!</h2>
                        <input type="email" id="email_login" placeholder="Enter your email"
                            required
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" id="password_login" placeholder="Enter your password"
                            required
                            value={password} onChange={e => setPassword(e.target.value)} />
                        <div className={styles.form_links}>
                            <a href="/">Forgot password?</a>
                            <div className={styles.check_field}>
                                <input type="checkbox" id="remember_login" />
                                <label htmlFor="remember_login">Remember Me</label>
                            </div>
                        </div>
                        {/* {loginError && (
                            <p style={{ color: "red", textAlign: "center" }}>
                                {loginError}
                            </p>
                        )} */}
                        <button className={styles.btn}>Sign In</button>
                        <div>
                            <p>Don't have an account? <span onClick={() => setIsLoginForm(false)}> Sign Up</span></p>
                        </div>
                    </div>
                </form>

                {/* SIGNUP FORM */}
                <form className={`${styles.signup_form} ${styles.form}`} style={{
                    left: !isLoginForm ? 40 : "-220px",
                    scale: !isLoginForm ? 1 : .5,
                    transformOrigin: "right center",
                    opacity: !isLoginForm ? 1 : 0,
                    pointerEvents: !isLoginForm ? "initial" : "none",
                }}>
                    <div>
                        <h2>Create A Watspi Account!</h2>
                        <div className={styles.input_container}>
                            <input type="text" id="name_signup" placeholder="Enter your full name" />
                        </div>
                        <div className={styles.input_container}>
                            <input type="email" id="email_signup" placeholder="Enter your email"
                                required
                            // value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.input_container}>
                            <input
                                type={showPassword ? 'text' : 'password'} // Toggle the input type between 'text' and 'password'
                                id="password_signup"
                                placeholder="Enter your password"
                                required
                            // value={password} onChange={e => setPassword(e.target.value)}
                            />
                            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </span>
                        </div>
                        <div className={styles.input_container}>
                            <input type="password" id="confirm_password_signup" placeholder="Re-enter your password" />
                        </div>
                        {/* {loginError && (
                            <p style={{ color: "red", textAlign: "center" }}>
                                {loginError}
                            </p>
                        )} */}
                        <a href="/otpForm">
                            <button className={styles.btn}>Sign Up</button>
                        </a>
                        <div>
                            <p>Already have an account? <span onClick={() => setIsLoginForm(true)}> Sign In</span></p>
                        </div>
                    </div>
                </form>

                <div className={styles.content} style={{
                    left: isLoginForm ? 0 : "-220px",
                    scale: isLoginForm ? 1 : .5,
                    transformOrigin: "right center",
                    opacity: isLoginForm ? 1 : 0,
                    pointerEvents: isLoginForm ? "all" : "none",
                }}>
                    <h2>Logo</h2>
                    <h2>WELCOME!</h2>
                    <h3>Enter your details to continue.</h3>
                    <div className={styles.content_bottom}>
                        <p>Don't have an account?</p>
                        <button className={styles.btn} onClick={() => setIsLoginForm(false)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login