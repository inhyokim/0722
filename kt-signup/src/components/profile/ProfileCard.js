'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ProfileCard({ profile, isOwner = false, onEdit, onDelete }) {
  const [imageError, setImageError] = useState(false)

  if (!profile) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
        <div className="flex items-center space-x-4">
          {/* 아바타 */}
          <div className="relative">
            {profile.avatar_url && !imageError ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name || 'Profile'}
                className="w-20 h-20 rounded-full border-4 border-white object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-4 border-white bg-white flex items-center justify-center text-blue-600 font-bold text-xl">
                {getInitials(profile.full_name || profile.username)}
              </div>
            )}
            
            {/* 공개/비공개 상태 */}
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
              profile.is_public ? 'bg-green-500' : 'bg-yellow-500'
            }`}>
              {profile.is_public ? (
                <svg className="w-3 h-3 text-white mt-0.5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-white mt-0.5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          
          {/* 기본 정보 */}
          <div className="flex-1 text-white">
            <h2 className="text-2xl font-bold">
              {profile.full_name || '이름 없음'}
            </h2>
            <p className="text-blue-100">
              {profile.username ? `@${profile.username}` : '사용자명 없음'}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-blue-100">
              {profile.location && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {profile.location}
                </div>
              )}
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {formatDate(profile.created_at)}에 가입
              </div>
            </div>
          </div>
          
          {/* 편집 버튼 */}
          {isOwner && (
            <div className="flex space-x-2">
              <button
                onClick={onEdit}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                프로필 수정
              </button>
              
              <button
                onClick={onDelete}
                className="bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                프로필 삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 세부 정보 섹션 */}
      <div className="p-6 space-y-6">
        {/* 자기소개 */}
        {profile.bio && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">자기소개</h3>
            <p className="text-gray-900 leading-relaxed">{profile.bio}</p>
          </div>
        )}

        {/* 추가 정보 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 연락처 정보 */}
          <div className="space-y-4">
            {profile.website && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">웹사이트</h4>
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                >
                  {profile.website}
                </a>
              </div>
            )}
            
            {profile.phone && isOwner && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">전화번호</h4>
                <p className="text-gray-900 text-sm">{profile.phone}</p>
              </div>
            )}
          </div>

          {/* 개인 정보 */}
          <div className="space-y-4">
            {profile.date_of_birth && (isOwner || profile.is_public) && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">생년월일</h4>
                <p className="text-gray-900 text-sm">{formatDate(profile.date_of_birth)}</p>
              </div>
            )}
          </div>
        </div>

        {/* 계정 상태 */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  profile.is_public ? 'bg-green-500' : 'bg-yellow-500'
                }`}></span>
                <span className="text-gray-500">
                  {profile.is_public ? '공개 프로필' : '비공개 프로필'}
                </span>
              </div>
            </div>
            
            <div className="text-gray-400">
              최종 수정: {formatDate(profile.updated_at)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 