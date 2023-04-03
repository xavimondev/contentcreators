import toast, { type Toast } from 'react-hot-toast'

type ConfirmToastProps = {
  customToast: Toast
  acceptFunction: VoidFunction
}

export const ConfirmToast = ({ customToast, acceptFunction }: ConfirmToastProps) => {
  return (
    <div className='flex flex-col gap-1 bg-white p-4 shadow-md rounded-md'>
      <span>🤔 ¿Seguro que deseas eliminar tu comentario?</span>
      <div className='flex gap-2 justify-center'>
        <button
          className='p-2 rounded-md font-medium text-sm text-white bg-indigo-700'
          onClick={acceptFunction}
        >
          Aceptar
        </button>
        <button
          className='p-2 rounded-md border font-medium text-sm'
          onClick={() => toast.remove(customToast.id)}
        >
          Declinar
        </button>
      </div>
    </div>
  )
}
