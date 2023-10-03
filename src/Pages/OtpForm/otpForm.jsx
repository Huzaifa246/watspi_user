import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

function otpForm() {
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const [timer, setTimer] = useState(60);
    const [wrongEmailCode, setWrongEmailCode] = useState(false);
    const [passwordResetPage, setPasswordResetPage] = useState(false);

    return (
        <>
            {isSignedUp && (
                <>
                    <form
                        style={{ maxWidth: "450px", margin: "0 auto", width: "100%" }}
                        onSubmit={(e) => e.preventDefault()} // Prevent form submission for now
                    >
                        <h4 className="mb-3 h1-wdraw">Enter OTP</h4>
                        <div
                            className="otp-parent-div"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <p className="txt-center-white">
                                Please enter OTP sent on
                            </p>
                            <OtpInput
                                value={otpValue}
                                onChange={setOtpValue}
                                numInputs={4}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                            />
                            {wrongEmailCode && (
                                <p
                                    className="text-center"
                                    style={{ color: "red", marginTop: "1rem" }}
                                >
                                    Entered wrong code, please enter the code sent on {email}
                                </p>
                            )}
                        </div>
                    </form>
                </>
            )
            }
        </>
    )
}

export default otpForm
