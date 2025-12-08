import toast, { Toaster as HotToaster, ToastBar } from 'react-hot-toast'
import {
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
  Loader2,
} from 'lucide-react'

export const ToasterProvider = () => {
  return (
    <HotToaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #111120 0%, #1a1a2e 100%)',
          color: '#fff',
          padding: '16px 20px',
          borderRadius: '12px',
          border: '1px solid transparent',
          backgroundImage: `
            linear-gradient(#111120, #111120) padding-box,
            linear-gradient(135deg, #06ffa5, #06b6d4, #8b5cf6) border-box
          `,
          boxShadow:
            '0 0 20px rgba(6, 182, 212, 0.3), 0 8px 32px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          fontSize: '14px',
          fontWeight: '500',
          maxWidth: '420px',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#06ffa5',
            secondary: '#111120',
          },
        },
        error: {
          duration: 3000,
          iconTheme: {
            primary: '#ef4444',
            secondary: '#111120',
          },
        },
        loading: {
          iconTheme: {
            primary: '#06b6d4',
            secondary: '#111120',
          },
        },
      }}
    >
      {t => (
        <ToastBar
          toast={t}
          style={{
            ...t.style,
            animation: t.visible
              ? 'toast-enter 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards'
              : 'toast-exit 0.2s ease-out forwards',
          }}
        >
          {({ icon, message }) => (
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">{icon}</div>
              <div className="flex-1">{message}</div>
            </div>
          )}
        </ToastBar>
      )}
    </HotToaster>
  )
}

interface ToastOptions {
  duration?: number
  icon?: React.ReactElement
}

export const showSuccess = (message: string, options?: ToastOptions) => {
  return toast.success(message, {
    duration: options?.duration,
    icon: options?.icon || (
      <CheckCircle2 size={20} className="text-[#06ffa5]" />
    ),
  })
}

export const showError = (message: string, options?: ToastOptions) => {
  return toast.error(message, {
    duration: options?.duration,
    icon: options?.icon || <XCircle size={20} className="text-red-400" />,
  })
}

export const showInfo = (message: string, options?: ToastOptions) => {
  return toast(message, {
    duration: options?.duration || 3000,
    icon: options?.icon || <Info size={20} className="text-[#06b6d4]" />,
  })
}

export const showWarning = (message: string, options?: ToastOptions) => {
  return toast(message, {
    duration: options?.duration || 3000,
    icon: options?.icon || (
      <AlertTriangle size={20} className="text-yellow-400" />
    ),
  })
}

export const showLoading = (message: string) => {
  return toast.loading(message, {
    icon: <Loader2 size={20} className="animate-spin text-[#06b6d4]" />,
  })
}

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId)
}

export const dismissAllToasts = () => {
  toast.dismiss()
}

export const showPromise = <T,>(
  promise: Promise<T>,
  messages: {
    loading: string
    success: string | ((data: T) => string)
    error: string | ((error: Error) => string)
  }
) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    },
    {
      loading: {
        icon: <Loader2 size={20} className="animate-spin text-[#06b6d4]" />,
      },
      success: {
        icon: <CheckCircle2 size={20} className="text-[#06ffa5]" />,
        duration: 3000,
      },
      error: {
        icon: <XCircle size={20} className="text-red-400" />,
        duration: 5000,
      },
    }
  )
}

export const showCustom = (
  message: React.ReactNode,
  options?: {
    duration?: number
    icon?: React.ReactNode
    style?: React.CSSProperties
  }
) => {
  return toast.custom(
    <div
      className="flex items-center gap-3 rounded-xl border border-transparent px-5 py-4 text-white shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, #111120 0%, #1a1a2e 100%)',
        backgroundImage: `
          linear-gradient(#111120, #111120) padding-box,
          linear-gradient(135deg, #06ffa5, #06b6d4, #8b5cf6) border-box
        `,
        boxShadow:
          '0 0 20px rgba(6, 182, 212, 0.3), 0 8px 32px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        ...options?.style,
      }}
    >
      {options?.icon && <div className="flex-shrink-0">{options.icon}</div>}
      <div className="flex-1">{message}</div>
    </div>,
    {
      duration: options?.duration || 4000,
    }
  )
}
