import { createContext, ReactNode, useState } from "react";

interface Props {
  children: ReactNode
}

type PaymentContextType = {
  step: PaymentSteps,
  setStep: React.Dispatch<React.SetStateAction<PaymentSteps>>,
  paymentInfo: {},
  setPaymentInfo: React.Dispatch<React.SetStateAction<{}>>,
  customerInfo: {},
  setCustomerInfo: React.Dispatch<React.SetStateAction<{}>>
}

export enum PaymentSteps {
  CustomerInfo = "Customer Info",
  PaymentInfo = "Payment Info"
}

export const PaymentContext = createContext<PaymentContextType>({
  step: PaymentSteps.CustomerInfo,
  setStep: () => PaymentSteps.CustomerInfo,
  paymentInfo: {
    cardholderName: "",
    cardNumber: undefined,
    expirationDateMonth: undefined,
    expirationDateYear: undefined,
    cardSecurityCode: undefined,
  },
  setPaymentInfo: () => {},
  customerInfo: {
    fullName: "",
    email: "",
    document: "",
    phone: "",
  },
  setCustomerInfo: () => {}
})
PaymentContext.displayName = "Payment"


export default function PaymentProvider({ children }: Props) {
  const [step, setStep] = useState<PaymentSteps>(PaymentSteps.CustomerInfo);
  const [paymentInfo, setPaymentInfo] = useState({})
  const [customerInfo, setCustomerInfo] = useState({})

  return (
    <PaymentContext.Provider
    value={{
      step,
      setStep,
      paymentInfo,
      setPaymentInfo,
      customerInfo,
      setCustomerInfo
    }}
    >
      {children}
    </PaymentContext.Provider>
  )
}