'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useProfile } from '@/contexts/ProfileContext'
import ProfileCard from '@/components/profile/ProfileCard'

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading, refreshProfile, deleteProfile } = useProfile()
  const router = useRouter()

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  // 프로필 새로고침
  useEffect(() => {
    if (user && !profile) {
      refreshProfile()
    }
  }, [user, profile, refreshProfile])

  const handleEditProfile = () => {
    router.push('/profile/edit')
  }

  const handleDeleteProfile = async () => {
    if (!profile) return

    // 삭제 확인 대화상자
    const isConfirmed = window.confirm(
      '정말로 프로필을 삭제하시겠습니까?\n\n' +
      '⚠️ 주의사항:\n' +
      '• 프로필 정보가 모두 삭제됩니다\n' +
      '• 업로드된 아바타 이미지도 삭제됩니다\n' +
      '• 이 작업은 되돌릴 수 없습니다\n\n' +
      '삭제하려면 "확인"을 클릭하세요.'
    )

    if (!isConfirmed) return

    const result = await deleteProfile()
    
    if (result.success) {
      // 삭제 성공 시 대시보드로 이동
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    }
  }

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
                KT Signup
              </Link>
              <div className="animate-pulse h-8 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </header>

        {/* Loading Content */}
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="animate-pulse">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!user) {
    return null // 리다이렉트 중
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
              KT Signup
            </Link>
            
            <nav className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                대시보드
              </Link>
              <Link
                href="/profile/edit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                프로필 편집
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">내 프로필</h1>
                <p className="mt-2 text-sm text-gray-600">
                  프로필 정보를 확인하고 관리하세요.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={refreshProfile}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={profileLoading}
                >
                  <svg className={`w-4 h-4 mr-2 ${profileLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  새로고침
                </button>
              </div>
            </div>
          </div>

          {/* 프로필 카드 */}
          <div className="mb-8">
            <ProfileCard
              profile={profile}
              isOwner={true}
              onEdit={handleEditProfile}
              onDelete={handleDeleteProfile}
            />
          </div>

          {/* 프로필 완성도 */}
          {profile && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">프로필 완성도</h3>
              
              <div className="space-y-4">
                {/* 진행률 바 */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">전체 완성도</span>
                    <span className="text-gray-900 font-medium">
                      {Math.round(getProfileCompleteness(profile))}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProfileCompleteness(profile)}%` }}
                    ></div>
                  </div>
                </div>

                {/* 완성도 항목들 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <ProfileCompletionItem
                    label="기본 정보"
                    completed={!!(profile.username && profile.full_name)}
                    icon="user"
                  />
                  <ProfileCompletionItem
                    label="아바타"
                    completed={!!profile.avatar_url}
                    icon="camera"
                  />
                  <ProfileCompletionItem
                    label="자기소개"
                    completed={!!profile.bio}
                    icon="document"
                  />
                  <ProfileCompletionItem
                    label="연락처"
                    completed={!!(profile.website || profile.phone)}
                    icon="link"
                  />
                </div>
                
                {getProfileCompleteness(profile) < 100 && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">
                      프로필을 더 완성하여 다른 사용자들에게 더 잘 보이세요!
                    </p>
                    <Link
                      href="/profile/edit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      프로필 완성하기
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 추가 액션 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">프로필 관리</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/profile/edit"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">프로필 편집</h4>
                  <p className="text-sm text-gray-500">개인 정보와 설정을 변경합니다</p>
                </div>
              </Link>

              <Link
                href="/dashboard"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">대시보드</h4>
                  <p className="text-sm text-gray-500">계정 개요와 활동을 확인합니다</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// 프로필 완성도 계산 함수
function getProfileCompleteness(profile) {
  if (!profile) return 0
  
  const fields = {
    username: profile.username,
    full_name: profile.full_name,
    avatar_url: profile.avatar_url,
    bio: profile.bio,
    website: profile.website,
    location: profile.location,
    phone: profile.phone,
    date_of_birth: profile.date_of_birth
  }
  
  const completedFields = Object.values(fields).filter(field => field && field.trim !== '').length
  const totalFields = Object.keys(fields).length
  
  return (completedFields / totalFields) * 100
}

// 프로필 완성도 항목 컴포넌트
function ProfileCompletionItem({ label, completed, icon }) {
  const iconMap = {
    user: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    ),
    camera: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    ),
    document: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
    link: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
        completed ? 'bg-green-100' : 'bg-gray-100'
      }`}>
        {completed ? (
          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {iconMap[icon]}
          </svg>
        )}
      </div>
      <span className={`text-sm ${completed ? 'text-green-700' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  )
} 