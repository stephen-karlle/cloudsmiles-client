import { useNavigate } from "react-router-dom";
import { useRecoveryStore } from "../../stores/recovery.store"
import { asterizeEmail } from "../../utils/recovery.utils"

import Button from "@components/ui/Button"

const SuccessForm = () => {
  
  const navigate = useNavigate()
  const email = useRecoveryStore((state) => state.email)
  const asterizedEmail = asterizeEmail(email)

  return (
    <section
      className=" w-[20rem] flex-col flex items-start justify-center "
    >
      <h1 className="text-2xl font-medium tracking-tight text-gray-700">
        Check your email
      </h1>
      <p className="text-sm text-gray-500 mt-2">
        We have sent an email to <span className="font-medium text-gray-700">{" " + asterizedEmail + " "}</span> with instructions to reset your password.
      </p>
      <Button
        variant="primary"
        className="w-full mt-6"
        onClick={() => navigate("/login")}
      >
        Back to Login
      </Button>
    </section>
  )
}

export default SuccessForm