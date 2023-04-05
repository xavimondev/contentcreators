import toast from 'react-hot-toast'
import type { ToastMsgs } from 'types'
import { TOAST_ERROR_DEFAULT_OPTIONS, TOAST_PROMISE_DEFAULT_OPTIONS } from 'global/constants'

export const toastError = (message: string, options = TOAST_ERROR_DEFAULT_OPTIONS) => {
  return toast.error(message, options)
}

export const toastPromise = (
  promise: Promise<unknown>,
  msgs: ToastMsgs,
  options = TOAST_PROMISE_DEFAULT_OPTIONS
) => {
  return toast.promise(promise, msgs, options)
}
