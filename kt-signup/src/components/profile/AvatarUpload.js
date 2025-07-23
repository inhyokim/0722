'use client'

import { useState, useRef } from 'react'
import { useProfile } from '@/contexts/ProfileContext'

export default function AvatarUpload({ size = 'large' }) {
  const { profile, uploadAvatar, loading } = useProfile()
  const [dragActive, setDragActive] = useState(false)
  const [imageError, setImageError] = useState(false)
  const fileInputRef = useRef(null)

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24', 
    large: 'w-32 h-32'
  }

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      uploadAvatar(file)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative ${sizeClasses[size]} rounded-full cursor-pointer group ${
          dragActive ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* 현재 아바타 또는 플레이스홀더 */}
        {profile?.avatar_url && !imageError ? (
          <img
            src={profile.avatar_url}
            alt="프로필 아바타"
            className={`${sizeClasses[size]} rounded-full object-cover border-4 border-gray-200 group-hover:border-blue-300 transition-colors`}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-4 border-gray-200 group-hover:border-blue-300 flex items-center justify-center text-white font-bold transition-colors ${
            size === 'large' ? 'text-2xl' : size === 'medium' ? 'text-lg' : 'text-sm'
          }`}>
            {getInitials(profile?.full_name || profile?.username)}
          </div>
        )}

        {/* 로딩 오버레이 */}
        {loading && (
          <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-black bg-opacity-50 flex items-center justify-center`}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}

        {/* 호버 오버레이 */}
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-200`}>
          <div className="opacity-0 group-hover:opacity-100 text-white text-center">
            <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="text-xs">사진 변경</div>
          </div>
        </div>

        {/* 편집 아이콘 */}
        <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2 border-2 border-white shadow-lg group-hover:bg-blue-700 transition-colors">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
      </div>

      {/* 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 업로드 안내 */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          프로필 사진을 클릭하여 변경하세요
        </p>
        <p className="text-xs text-gray-400 mt-1">
          JPG, PNG, WebP, GIF 형식 지원 (최대 5MB)
        </p>
      </div>

      {/* 드래그 오버레이 */}
      {dragActive && (
        <div className="fixed inset-0 bg-blue-500 bg-opacity-10 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white rounded-lg p-6 border-2 border-dashed border-blue-400 max-w-sm">
            <div className="text-center text-blue-600">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-lg font-medium">여기에 사진을 놓아주세요</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 