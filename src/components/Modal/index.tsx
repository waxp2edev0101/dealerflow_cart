import type { PropsWithChildren, ReactElement, ChangeEventHandler } from 'react'
import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  useCallback,
} from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  title?: string
  subTitle?: string
  body:
    | ReactElement
    | (({ toggleModal }: { toggleModal: () => void }) => ReactElement)
}

export default function Modal({
  children,
  body,
  title,
}: PropsWithChildren<ModalProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = useCallback(() => {
    setIsModalOpen((value) => !value)
  }, [])
  return (
    <>
      {children &&
        Children.map(
          children,
          (child) =>
            child &&
            typeof child !== 'string' &&
            typeof child !== 'number' &&
            isValidElement(child) &&
            cloneElement(child as unknown as ReactElement, {
              onClick: (event: ChangeEventHandler) => {
                toggleModal()
                child.props?.onClick?.(event)
              },
            }),
        )}
      {isModalOpen &&
        document.querySelector('body') &&
        createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-[#5E78FF]/[.73] backdrop-blur-sm backdrop-opacity-5"
            onClick={toggleModal}
          >
            <div
              className="bg-white p-5 md:rounded-[24px] drop-shadow-lg text-black w-full h-full md:w-[740px] md:h-auto flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between gap-4 cursor-pointer">
                <p className="text-3xl font-semibold text-[#3B2F66]">{title}</p>
                <span className="flex justify-end" onClick={toggleModal}>
                  {/* toggle modal */}
                  <svg
                    width={48}
                    height={48}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx={24}
                      cy={24}
                      r={24}
                      fill="white"
                      fillOpacity="0.5"
                    />
                    <path
                      d="M18 18L30 30"
                      stroke="#3B2F66"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M30 18L18 30"
                      stroke="#3B2F66"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              {typeof body === 'function'
                ? body({ toggleModal })
                : isValidElement(body) && typeof body.type !== 'string'
                ? cloneElement(body as ReactElement, { toggleModal })
                : body}
            </div>
          </div>,
          document.querySelector('body')!,
        )}
    </>
  )
}
