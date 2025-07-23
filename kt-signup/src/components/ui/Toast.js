'use client'

import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // 기본 설정
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        
        // 성공 토스트
        success: {
          duration: 3000,
          style: {
            background: '#10B981',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10B981',
          },
        },
        
        // 에러 토스트
        error: {
          duration: 5000,
          style: {
            background: '#EF4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#EF4444',
          },
        },
        
        // 로딩 토스트
        loading: {
          style: {
            background: '#3B82F6',
            color: '#fff',
          },
        },
      }}
    />
  )
} 