'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useProfile } from '@/contexts/ProfileContext'
import ProfileForm from '@/components/profile/ProfileForm'

export default function ProfileEditPage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading, refreshProfile, deleteProfile } = useProfile()
  const router = useRouter()
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

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

  // 페이지 이탈 시 확인
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  const handleFormSuccess = (updatedProfile) => {
    setHasUnsavedChanges(false)
    router.push('/profile')
  }

  const handleFormCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('저장되지 않은 변경사항이 있습니다. 정말 취소하시겠습니까?')) {
        setHasUnsavedChanges(false)
        router.back()
      }
    } else {
      router.back()
    }
  }

  const handleProfileDelete = async () => {
    if (!profile) return

    // 삭제 확인 대화상자
    const isConfirmed = window.confirm(
      '⚠️ 프로필을 완전히 삭제하시겠습니까?\n\n' +
      '삭제되는 내용:\n' +
      '• 모든 프로필 정보\n' +
      '• 업로드된 아바타 이미지\n' +
      '• 사용자명 및 개인정보\n\n' +
      '❌ 이 작업은 되돌릴 수 없습니다!\n\n' +
      '정말로 삭제하려면 "확인"을 클릭하세요.'
    )

    if (!isConfirmed) return

    // 한 번 더 확인
    const doubleConfirm = window.confirm(
      '🚨 마지막 확인 🚨\n\n' +
      '프로필을 삭제하면 복구할 수 없습니다.\n' +
      '정말 삭제하시겠습니까?'
    )

    if (!doubleConfirm) return

    const result = await deleteProfile()
    
    if (result.success) {
      setHasUnsavedChanges(false)
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
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto"></div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
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
                href="/profile"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                프로필 보기
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                대시보드
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
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                돌아가기
              </button>
            </div>
            
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-gray-900">프로필 편집</h1>
              <p className="mt-2 text-sm text-gray-600">
                개인 정보를 수정하고 프로필을 개선하세요.
              </p>
            </div>
          </div>

          {/* 프로필 편집 안내 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">프로필 편집 팁</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>완성도가 높은 프로필은 다른 사용자들에게 더 잘 보입니다</li>
                    <li>사용자명은 중복될 수 없으며, 영문과 숫자만 사용 가능합니다</li>
                    <li>공개 프로필로 설정하면 다른 사용자들이 검색할 수 있습니다</li>
                    <li>아바타 이미지는 JPG, PNG, WebP, GIF 형식을 지원합니다 (최대 5MB)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 프로필 편집 폼 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-8">
              <ProfileForm
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
                onDelete={handleProfileDelete}
              />
            </div>
          </div>

          {/* 도움말 섹션 */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">도움말</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">프로필 공개 설정</h4>
                <p className="text-sm text-gray-600">
                  공개 프로필로 설정하면 다른 사용자들이 회원님의 프로필을 검색하고 볼 수 있습니다. 
                  비공개로 설정하면 본인만 프로필을 볼 수 있습니다.
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">개인정보 보호</h4>
                <p className="text-sm text-gray-600">
                  전화번호와 생년월일 같은 민감한 정보는 본인만 볼 수 있습니다. 
                  공개 프로필 설정과 관계없이 보호됩니다.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">사용자명 변경</h4>
                <p className="text-sm text-gray-600">
                  사용자명은 고유해야 하며 언제든지 변경할 수 있습니다. 
                  영문 소문자, 숫자, 언더스코어(_)만 사용 가능합니다.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">아바타 이미지</h4>
                <p className="text-sm text-gray-600">
                  프로필 사진은 클릭하거나 드래그 앤 드롭으로 업로드할 수 있습니다. 
                  최대 5MB까지 지원합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 계정 설정 링크 */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">계정 관리</h3>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/profile"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                프로필 보기
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9z" />
                </svg>
                대시보드
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 