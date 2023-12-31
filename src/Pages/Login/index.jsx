import React, { useEffect, useState } from "react";
import { Form, Button, Card, Modal } from 'react-bootstrap'; // Import Modal component
import OtpInput from "react-otp-input";
import "./otpForm.css";
import styles from "./index.module.css"
import axios from "axios";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Loader from './../Loader/index';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { decryption, encryption } from "../../helpers/encryptionDecryption";

const Login = () => {
    const navigate = useNavigate()
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    console.log(showOtpModal, "showOtpModal")

    const [loginError, setLoginError] = useState("")
    const [signUpError, setSignUpError] = useState("")

    const [otpError, setOtpError] = useState(false);

    const [otpValue, setOtpValue] = useState("");
    const [signupEmail, setSignupEmail] = useState('');

    const [timer, setTimer] = useState(60);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const isOtpComplete = otpValue?.length === 6;

    useEffect(() => {
        let interval;

        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isTimerRunning]);

    useEffect(() => {
        if (timer <= 0) {
            setIsTimerRunning(false);
        }
    }, [timer]);

    const handleResendClick = () => {
        console.log("Resend button clicked");
        setTimer(60);
        setIsTimerRunning(true);
    };
    //OTP API
    const verifyOtp = () => {
        const requestBody = {
            otp: otpValue,
            email: signupEmail,
        };
        console.log(requestBody, "requestBody")
        const encrypted = encryption(requestBody)
        console.log(encrypted, "encrypted data Req Otp")

        axios.post(`${import.meta.env.VITE_APP_API}/api/users/verification`,
            { data: encrypted })
            .then(async (response) => {
                console.log(response, "asd");
                console.log(response?.data?.data, "asd");
                console.log(decryption(response?.data?.data), "asd");
                console.log('OTP verification successful:', response.data);
                const dcrytedresponse = await decryption(response?.data?.data)
                console.log(dcrytedresponse, "dcrytedresponse")
                if (dcrytedresponse?.message === "OTP verified successfully") {
                    toast.success(dcrytedresponse?.message);
                    setShowOtpModal(false);
                    setTimeout(function () {
                        window.location.href = "/";
                    }, 5000);
                }
            })
            .catch((error) => {
                // console.log(error, "error")
                console.error('OTP verification failed:', decryption(error?.response?.data?.data));
                console.log('Setting showOtpModal to true in catch block');
                // setShowOtpModal(true);
                const response = error?.response?.data?.data;
                console.log(response);

                if (response?.message === "OTP Expired") {
                    setOtpError("OTP Expired!!!");
                    toast.error(setOtpError("OTP Expired!!!"));
                } else if (response?.message === "Please enter correct OTP") {
                    setOtpError("Invalid OTP, Please enter the correct OTP.");
                    toast.error(setOtpError("Invalid OTP, Please enter the correct OTP."));
                } else if (response?.message !== "undefined") {
                    setOtpError("OTP is incorrect. Please check your email.");
                    toast.error(setOtpError("OTP is incorrect. Please check your email."));
                }
            });
    };


    //OTP API ENDS
    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token")
            if (!token) {
                navigate("/")
            }
        }
    }, [])

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setLoginError("Invalid Email or Password")
            return
        }
        setShowLoader(true)
        const credentials = {
            email: email,
            password: password
        }
        const encrypted = encryption(credentials)
        console.log(encrypted, "encrypted data")

        axios.post(`${import.meta.env.VITE_APP_API}/api/users/login`,
            { data: encrypted }
        ).then(async (res) => {
            console.log(res, "asd")
            // let response = await decryption(res?.data)
            // console.log(response, "response")
            localStorage.setItem("token", res?.data?.token)
            setShowLoader(false)
            window.location.href = "/dashboard2";
        })
            .catch((err) => {
                // console.log(err?.response?.data?.data)
                const response = decryption(err?.response?.data?.data)
                console.log(response)

                if (response?.message == "User not registered") {
                    setLoginError("Invalid Credentials, Please Check email.")
                } else if (response?.message == "Incorrect password") {
                    setLoginError("Invalid Password, Please Check Your Password.")
                }
                else if (response?.message == "Email not verified") {
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
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };


    const handleSignUpSubmit = (e) => {
        e.preventDefault();

        // setIsSignedUp(true);
        if (!fullName || !email || !password || password !== confirmPassword) {
            setLoginError("Invalid Email or Password");
            return;
        }
        setShowLoader(true);

        const userData = {
            name: fullName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        };
        console.log(userData, "user")
        if (!validateEmail(email)) {
            setSignUpError("Invalid Email")
            return;
        }
        else if (confirmPassword !== password) {
            setSignUpError("Password doesn't match")
            return;
        }
        const encrypted = encryption(userData)
        console.log(encrypted, "encrypted data")

        axios.post(`${import.meta.env.VITE_APP_API}/api/users/signUp`,
            { data: encrypted })
            .then((res) => {
                // let response = res?.data;
                // console.log(response, "response");
                // localStorage.setItem("token", response?.token);
                const main = decryption(res?.data?.data);
                localStorage.setItem("token", decryption(res?.data?.data))
                setSignupEmail(main?.result?.email);
                // setSignupEmail(response?.result?.email);
                setShowLoader(false);
                // window.location.href = "/otpForm";
                // navigate("otpForm");
                setShowOtpModal(true);
            })
            .catch((err) => {
                console.log(err);
                const response = decryption(err?.response?.data?.data)
                console.log(response, "response Signup")

                if (response?.message === "Email already exists") {
                    setSignUpError("Email already exists.")
                } else if (response?.message === "Please enter all fields") {
                    setSignUpError("Please enter all fields")
                }
                else if (response?.message !== "unverified") {
                    setSignUpError("Please verify Using Otp sent to your email!!!")
                }
                else {
                    setSignUpError("Error occurred Occured at signUp");
                }
                setShowLoader(false);
            });

    }

    return (
        <>
            <ToastContainer />
            <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered style={{ backdropFilter: "blur(10px)" }}>
                <Modal.Header closeButton>
                    <Modal.Title>OTP Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="otp-head">Enter OTP</h4>
                    <div
                        className="otp-parent-div"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            gap: "16px"
                        }}
                    >
                        <p className="txt-center-white">Please enter OTP sent on Your Email</p>
                        <OtpInput
                            value={otpValue}
                            onChange={setOtpValue}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{
                                width: "40px",
                                height: "40px",
                                fontSize: "24px",
                                textAlign: "center",
                                border: "2px solid #ccc",
                                borderRadius: "4px",
                                margin: "0 4px",
                                padding: "8px",
                                outline: "none",
                                borderColor: "#53585e",
                                justifyContent: "center"
                            }}
                            className="mob-style"
                        />
                        <div className="md:text-sm text-[0.7rem] text-center">
                            Didn't recieve code?{" "}
                            <span
                                className={`font-bold ${isTimerRunning
                                    ? "timer-color"
                                    : "timer-sendNow-color"
                                    }`}
                                onClick={isTimerRunning ? undefined : handleResendClick}
                            >
                                {isTimerRunning ? `Resend in ${timer}s` : "Resend now"}
                            </span>

                        </div>
                        <div className="  w-full flex justify-center">
                            <button
                                disabled={!isOtpComplete}
                                onClick={() => verifyOtp()}
                                className={`${isOtpComplete
                                    ? "btn-Verify"
                                    : "opacity-50 bg-slate-600 text-white cursor-not-allowed inactive-verify"
                                    } p-2 md:text-xl text-base flex items-center justify-center font-semibold rounded-md 2xl:w-[426px] md:w-[360px] w-full`}
                            >
                                VERIFY
                            </button>
                        </div>
                    </div >
                    {
                        otpError && (
                            <div>
                                <p className="text-center" style={{ color: "red", marginTop: "1rem" }}>
                                    Entered wrong code, please enter the code sent on email
                                </p>
                                {/* <button>Show OTP Modal</button> */}
                            </div>
                        )
                    }

                </Modal.Body>
            </Modal >

            <div className={styles.body}>
                <div className={styles.container}>

                    {/* <div className={styles.content_wrapper} style={{
                    right: isLoginForm ? 0 : "calc(100% - 450px)"
                }} /> */}

                    <div className={`${styles.content} ${!isLoginForm ? "bottom-style-trans" : "top-style-trans"}`} style={{
                        right: !isLoginForm ? 0 : "-220px",
                        scale: !isLoginForm ? 1 : .5,
                        transformOrigin: "right center",
                        opacity: !isLoginForm ? 1 : 0,
                        pointerEvents: !isLoginForm ? "initial" : "none",
                    }}>
                        <button className="mob-btn-signin" onClick={() => setIsLoginForm(true)}>Sign In</button>
                        <h2 className="mob-none">Logo</h2>
                        <h2 className="mob-none">Hello There!</h2>
                        <h3>Signup to Watspi And Random Text.</h3>
                        <div className={styles.content_bottom}>
                            <p>Already have an account?</p>
                            <button className={styles.btn} onClick={() => setIsLoginForm(true)}>Sign In</button>
                        </div>
                    </div>

                    <form className={`${styles.login_form} ${styles.form} ${isLoginForm ? "bottom-style-trans" : "top-style-trans"}`} style={{
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
                            <input type="email" id="email_login" placeholder="Enter your email" className="placeholder_class"
                                required
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" id="password_login" placeholder="Enter your password" className="placeholder_class"
                                required
                                value={password} onChange={e => setPassword(e.target.value)} />
                            <div className={styles.form_links}>
                                <a href="/">Forgot password?</a>
                                <div className={styles.check_field}>
                                    <input type="checkbox" id="remember_login" />
                                    <label htmlFor="remember_login">Remember Me</label>
                                </div>
                            </div>
                            <button className={styles.btn}>Sign In</button>
                        </div>
                        {loginError && (
                            <p style={{ color: "red", textAlign: "center" }}>
                                {loginError}
                            </p>
                        )}
                    </form>

                    {/* SIGNUP FORM */}
                    <form className={`${styles.signup_form} ${styles.form} ${isLoginForm ? "top-style-trans" : "bottom-style-trans"}`} style={{
                        left: !isLoginForm ? 40 : "-220px",
                        scale: !isLoginForm ? 1 : .5,
                        transformOrigin: "right center",
                        opacity: !isLoginForm ? 1 : 0,
                        pointerEvents: !isLoginForm ? "initial" : "none",
                    }}
                        onSubmit={handleSignUpSubmit}
                    >
                        <div>
                            <h2>Create A Watspi Account!</h2>
                            <div className={styles.input_container}>
                                <input type="text" id="name_signup" placeholder="Enter your full name" className="placeholder_class"
                                    value={fullName} onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className={styles.input_container}>
                                <input type="email" id="email_signup" placeholder="Enter your email" className="placeholder_class"
                                    required
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={styles.input_container}>
                                <input
                                    type={showPassword ? 'text' : 'password'} // Toggle the input type between 'text' and 'password'
                                    id="password_signup"
                                    placeholder="Enter your password"
                                    required
                                    value={password} onChange={e => setPassword(e.target.value)}
                                    className="placeholder_class"
                                />
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FiEyeOff className="password-eye-icon" /> : <FiEye className="password-eye-icon" />}
                                </span>
                            </div>
                            <div className={styles.input_container}>
                                <input type="password" id="confirm_password_signup" placeholder="Re-enter your password"
                                    required
                                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                                    className="placeholder_class"
                                />
                            </div>
                            {/* <a href="/otpForm"> */}
                            <button className={styles.btn}>Sign Up</button>
                            {/* </a> */}
                            {signUpError && (
                                <p style={{ color: "red", textAlign: "center" }}>
                                    {signUpError}
                                </p>
                            )}
                        </div>
                    </form>

                    <div className={`${styles.content}  ${isLoginForm ? "top-style-trans" : "bottom-style-trans"}`} style={{
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
        </>
    )
}

export default Login