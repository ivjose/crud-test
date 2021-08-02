import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'

type ActionButton = {
  label: string
  type: 'primary' | 'secondary'
  onClick: () => void
  cancel?: boolean
}

type ModalProps = {
  open: boolean
  setOpen(value: boolean): void
  message: string
  title: string
  actionButton?: ActionButton[]
}

function Modal({ open, setOpen, message, title, actionButton }: ModalProps) {
  const cancelButtonRef = useRef(null)

  if (!open) return <></>
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon className="w-6 h-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div>
                </div>
              </div>

              {actionButton && (
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  {actionButton.map((button) => {
                    const colorType = {
                      primary: 'bg-red-600 focus:ring-red-500 hover:bg-red-700 border-transparent',
                      secondary:
                        'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:ring-indigo-500',
                    }

                    return (
                      <button
                        key={button.label}
                        type="button"
                        className={`inline-flex justify-center w-full px-4 py-2 text-base font-medium border  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm text-white  ${
                          colorType[button.type]
                        }`}
                        onClick={button.onClick}
                        ref={button.cancel ? cancelButtonRef : null}
                      >
                        {button.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
