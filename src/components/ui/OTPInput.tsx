import { KeyboardEvent, useState, useRef, Fragment } from "react";

type OTPInputProps = {
  onChange: (otpValue: string) => void; // Expect the OTP value as a string to be passed to onChange
  didError: boolean;
};

const OTPInput = ({
  onChange,
  didError,
}: OTPInputProps) => {
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Create a ref array for inputs

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;

    // Check if the entered value is a number
    if (!/^[0-9]$/.test(newValue) && newValue !== "") {
      return; // If it's not a number, do not update the OTP value
    }

    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);
    
    // Update the parent component with the OTP value
    onChange(newOtp.join("")); // Pass the joined OTP string to the parent

    // Automatically focus next input if current input is filled
    if (newValue && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e: KeyboardEvent, index: number) => {
    // If Backspace is pressed and the current OTP field is empty
    if (e.key === "Backspace" && !otp[index]) {
      // Check if the next input has a value
      const nextInput = inputRefs.current[index + 1];
      if (nextInput && nextInput.value) {
        // Stay in the current input if next input has a value
        return;
      }

      // If we're not on the first input (index 0), move the focus to the previous input
      if (index > 0) {
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedInput(index);
  };

  return (
    <section className="w-fit h-11 flex items-center justify-center gap-4">
      <div className="w-fit flex items-center justify-center transition-all">
        {otp.map((_, index) => (
          <Fragment key={index}>
            <input
              className={`w-11 h-10 text-center transition-all ease-in-out duration-150 font-normal outline-none  
                ${focusedInput === index
                  ? "ring-1 ring-lime-200 border border-lime-500 outline-none z-20 text-gray-700 "
                  : didError ? " ring-1  ring-rose-200 border border-rose-500 text-rose-500 " 
                  : " ring-1 ring-gray-200 outline-none" }
                ${index === 0 || index === 3 ? "rounded-l-md" : ""}  
                ${index === 2 || index === 5 ? "rounded-r-md" : ""}  
              `}
              type="text"
              ref={(el) => (inputRefs.current[index] = el)} // Attach ref to each input
              value={otp[index]} // Bind input value to state
              onFocus={() => handleFocus(index)}
              onBlur={() => setFocusedInput(null)}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
            />
            {index === 2 && <span className={`mx-6 w-1 h-1 rounded-full 
                ${didError ? "bg-rose-500" : "bg-gray-700"}
              `}
            />} {/* Render dot only after the third input */}
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default OTPInput;
