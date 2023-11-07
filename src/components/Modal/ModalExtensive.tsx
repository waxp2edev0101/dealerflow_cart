import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'
import Modal from 'react-modal'
import './ModalExtensive.css'

interface ModalExProps {
  title?: string
  body: React.ReactNode
  onClose: () => void
}

export default function ModalExtensive({
  title,
  body,
  onClose,
}: PropsWithChildren<ModalExProps>) {
  const [isOpen, setIsOpen] = useState(true)

  const closeModal = () => {
    onClose()
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <div className="modal-header">
          <button className="close-btn" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <circle cx="24" cy="24" r="24" fill="white" fillOpacity="0.5" />
              <path
                d="M18 18L30 30"
                stroke="#3B2F66"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30 18L18 30"
                stroke="#3B2F66"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="text-[#3B2F66] font-circular-std font-[500] text-[32px] leading-[44px] tracking-[0.294px]">
            {title}
          </h2>
        </div>
        {body}
      </div>
    </Modal>
  )
}
