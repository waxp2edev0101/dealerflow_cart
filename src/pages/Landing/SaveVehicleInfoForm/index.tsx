import type { PropsWithChildren } from 'react'
import { useState, useEffect, useRef } from 'react'

import { sendEmail } from '@/common/services/apiService'
import type { IProduct } from '@/common/state/product/productState'
import ButtonGroup from '@/components/ButtonGroup'
import ModalExtensive from '@/components/Modal/ModalExtensive'

interface SaveVehicleInfoFormProps {
  onClose: () => void
  product: IProduct
}

export default function SaveVehicleInfoForm({
  onClose,
  product,
}: PropsWithChildren<SaveVehicleInfoFormProps>) {
  const [activeModal, setActiveModal] = useState('saveModal')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidPhone, setIsValidPhone] = useState(false)

  const emailInputRef = useRef<HTMLInputElement | null>(null)
  const phoneInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
    if (phoneInputRef.current) {
      phoneInputRef.current.focus()
    }
  }, [email, phone])

  interface ButtonClassNames {
    container: string
  }

  const buttonStyles: ButtonClassNames = {
    container:
      'flex py-1 px-2 justify-center items-center space-x-2 rounded-s cursor-pointer font-circular-std text-xs font-medium',
  }

  const onEmailInputChange = (value: string) => {
    const trimmedValue = value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setEmail(trimmedValue)
    if (!emailRegex.test(trimmedValue)) setIsValidEmail(false)
    else setIsValidEmail(true)
  }

  const onPhoneInputChange = (value: string) => {
    const phoneNumber = value
    const digitsOnly = phoneNumber.replace(/\D/g, '')
    if (digitsOnly.length === 10) setIsValidPhone(true)
    else setIsValidPhone(false)
    const formattedValue = digitsOnly.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '($1) $2-$3',
    )
    setPhone(formattedValue)
  }

  const onSendEmail = async () => {
    const owner = {
      email: import.meta.env.VITE_SENDGRID_OWNER_EMAIL,
      name: import.meta.env.VITE_SENDGRID_OWNER_NAME,
    }

    if (!owner.email || !owner.name) {
      console.log('missing owner name or email')
      return
    }
    const data = {
      content: [
        {
          type: 'text/plain',
          value: `${window.location.href}/vehicles/${product.id}`,
        },
      ],
      from: { email: owner.email, name: owner.name },
      personalizations: [
        {
          subject: 'Vehicle Information',
          to: [{ email: email, name: 'Client' }],
        },
      ],
      reply_to: { email: owner.email, name: owner.name },
    }

    await sendEmail(data)
    setActiveModal('emailSentModal')
  }

  const SaveForm = () => (
    <div className="flex flex-col items-center gap-10 mt-10 self-stretch">
      <div className="flex flex-col px-14 items-start gap-4 self-stretch text-center">
        <p className="m-auto text-center font-circular-std font-medium text-accents-violet text-[24px] text-[#3B2F66]">
          Want to save this vehicle for later?
        </p>
        <p className="w-4/5 m-auto text-accents-violet font-circular-std font-[450] text-xl text-[#3B2F66]">
          Choose to either text or email yourself below. We won’t save or share
          your details digitally or otherwise{' '}
          <span className="text-[#5E78FF]">*</span>.
        </p>
      </div>
      <ButtonGroup className="gap-6">
        {/* <button
          onClick={() => {
            setActiveModal('phoneModal')
          }}
          className="flex py-[18px] px-[30px] justify-center items-center gap-4 rounded-md text-white border border-[#4B76C2] bg-[#5E78FF] shadow-md text-xl"
        >
          Send a Text
        </button> */}
        <button
          onClick={() => {
            setActiveModal('emailModal')
          }}
          className="flex py-[18px] px-[30px] justify-center items-center space-x-4 rounded-lg text-[#826441] border border-[#F2CB4F] bg-[#FFD750] shadow-md text-xl"
        >
          Send an Email
        </button>
      </ButtonGroup>
      <p className="text-center font-circular-std text-black text-xs font-[450]">
        <b className="font-[500]">* Pinkie Swear.</b> If you don’t believe us,
        our terms of service{' '}
        <a href="" className="text-[#5E78FF]">
          here
        </a>
        , and our privacy policy is{' '}
        <a href="" className="text-[#5E78FF]">
          here
        </a>
        .<br /> If after all of that <i>you still</i> have questions about how
        we don’t use your information{' '}
        <a href="" className="text-[#5E78FF]">
          contact us
        </a>
        .
      </p>
    </div>
  )

  const EmailForm = () => (
    <form className="flex flex-col items-center gap-10 mt-5 self-stretch">
      <div className="w-4/5 m-auto">
        <p className="mb-1 font-circular-std text-[#0F172A] text-xs font-medium leading-4 tracking-wider">
          Email Address
        </p>
        <div className="relative">
          <input
            ref={emailInputRef}
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => onEmailInputChange(e.target.value)}
            className="flex w-full h-[44px] p-4 justify-end items-center gap-4 rounded-md border border-[#5E78FF] bg-white font-[450]"
          />
          <div className="absolute flex h-3/5 top-[22%] right-[10px]">
            <hr className="w-[1px] h-full mr-2 bg-[#EFEBE9]" />
            <button
              id="sendDetails"
              className={`${buttonStyles.container} ${
                isValidEmail
                  ? 'border border-[#4B76C2] text-[#FFF] bg-[#5E78FF]'
                  : 'border border-[#E2DEDD] text-[#BAABA7] bg-[#EFEBE9]'
              }`}
              // onClick={() => setActiveModal('emailSentModal')}
              onClick={onSendEmail}
              disabled={!isValidEmail}
            >
              Send Details
            </button>
          </div>
        </div>
      </div>
      <p className="text-center font-circular-std text-black text-[10px] font-[450]">
        <b className="font-[500]">* Pinkie Swear.</b> If you don’t believe us,
        our terms of service{' '}
        <a href="" className="text-[#5E78FF]">
          here
        </a>
        , and our privacy policy is{' '}
        <a href="" className="text-[#5E78FF]">
          here
        </a>
        .<br /> If after all of that <i>you still</i> have questions about how
        we don’t use your information{' '}
        <a href="" className="text-[#5E78FF]">
          contact us
        </a>
        .
      </p>
    </form>
  )

  const EmailSentMsg = () => (
    <div className="flex flex-col w-2/3 mx-auto gap-5 mt-8">
      <p className="text-center font-circular-std text-accents-violet text-[#3B2F66] text-base font-[450]">
        Check your inbox - though you might need to give it a minute or two
        and/or check your junk folder. Or, if you prefer,{' '}
        <a href="" className="text-[#5E78FF]">
          text yourself the details
        </a>
        .
      </p>
      <p className="font-circular-std text-accents-violet text-base font-[600] text-[#3B2F66] text-center">
        Finally, thank you for using Carbeeza!
      </p>
    </div>
  )

  const PhoneForm = () => (
    <form className="flex flex-col items-center gap-10 mt-5 self-stretch">
      <div className="w-4/5 m-auto">
        <p className="mb-1 font-circular-std text-[#0F172A] text-xs font-medium leading-4 tracking-wider">
          Phone Number
        </p>
        <div className="relative">
          <input
            ref={phoneInputRef}
            type="tel"
            placeholder="(416) 432-4567"
            pattern="\(\d{3}\) \d{3}-\d{4}"
            value={phone}
            onChange={(e) => onPhoneInputChange(e.target.value)}
            onKeyPress={(e) => {
              const keyCode = e.which || e.keyCode
              const isValidKey = keyCode >= 48 && keyCode <= 57

              if (!isValidKey) {
                e.preventDefault()
              }
            }}
            className="flex w-full h-[44px] p-4 pl-9 justify-end items-center gap-4 rounded-md border border-[#5E78FF] bg-white font-[450]"
          />
          <span className="absolute top-[20%] left-4 text-[#EFEBE9] font-circular-std text-base font-medium">
            +1
          </span>
          <div className="absolute flex h-3/5 top-[22%] right-[10px]">
            <hr className="w-[1px] h-full mr-2 bg-[#EFEBE9]" />
            <button
              id="sendDetails"
              className={`${buttonStyles.container} ${
                isValidPhone
                  ? 'border border-[#4B76C2] text-[#FFF] bg-[#5E78FF]'
                  : 'border border-[#E2DEDD] text-[#BAABA7] bg-[#EFEBE9]'
              }`}
              onClick={() => setActiveModal('phoneSentModal')}
              disabled={!isValidPhone}
            >
              Text Details
            </button>
          </div>
        </div>
      </div>
      <p className="text-center font-circular-std text-black text-xs font-[450]">
        <b className="font-[500]">* Pinkie Swear.</b> If you don’t believe us,
        our terms of service{' '}
        <a href="" className="text-[#5E78FF]">
          here
        </a>
        , and our privacy policy is{' '}
        <a href="" className="text-[#5E78FF]">
          here
        </a>
        .<br /> If after all of that <i>you still</i> have questions about how
        we don’t use your information{' '}
        <a href="" className="text-[#5E78FF]">
          contact us
        </a>
        .
      </p>
    </form>
  )

  const PhoneSentMsg = () => (
    <div className="flex flex-col w-2/3 mx-auto gap-5 mt-8">
      <p className="text-center font-circular-std text-accents-violet text-[#3B2F66] text-base font-[450]">
        Check your unread messages - though you might want to check your unknown
        callers. Or, if you prefer,{' '}
        <span className="text-[#5E78FF]">email yourself the details</span>.
      </p>
      <p className="font-circular-std text-accents-violet text-base font-[600] text-[#3B2F66] text-center">
        Finally, thank you for using Carbeeza!
      </p>
    </div>
  )

  switch (activeModal) {
    case 'saveModal':
      return (
        <ModalExtensive
          title="Send & Save Vehicle"
          body={<SaveForm />}
          onClose={onClose}
        />
      )
    case 'emailModal':
      return (
        <ModalExtensive
          title="Email Details to: "
          body={<EmailForm />}
          onClose={onClose}
        />
      )
    case 'emailSentModal':
      return (
        <ModalExtensive
          title="Details Sent!"
          body={<EmailSentMsg />}
          onClose={onClose}
        />
      )
    case 'phoneModal':
      return (
        <ModalExtensive
          title="Text Details to: "
          body={<PhoneForm />}
          onClose={onClose}
        />
      )
    case 'phoneSentModal':
      return (
        <ModalExtensive
          title="Text Details to: "
          body={<PhoneSentMsg />}
          onClose={onClose}
        />
      )
  }
}
