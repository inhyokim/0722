'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { profileAPI } from '@/lib/profiles'
import toast from 'react-hot-toast'

const ProfileContext = createContext({})

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider')
  }
  return context
}

export const ProfileProvider = ({ children }) => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 현재 사용자 프로필 로드
  useEffect(() => {
    if (user) {
      loadCurrentProfile()
    } else {
      setProfile(null)
    }
  }, [user])

  const loadCurrentProfile = async () => {
    if (!user) return

    setLoading(true)
    setError(null)
    
    try {
      const { data, error } = await profileAPI.getCurrentProfile()
      if (error) {
        setError(error.message)
        toast.error('프로필을 불러오는데 실패했습니다.')
      } else {
        setProfile(data)
      }
    } catch (error) {
      setError('프로필 로딩 중 오류가 발생했습니다.')
      toast.error('프로필 로딩 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates) => {
    if (!user || !profile) {
      toast.error('로그인이 필요합니다.')
      return { success: false, error: '로그인이 필요합니다.' }
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error } = await profileAPI.updateProfile(user.id, updates)
      
      if (error) {
        setError(error.message)
        toast.error(error.message)
        return { success: false, error: error.message }
      } else {
        setProfile(data)
        toast.success('프로필이 성공적으로 업데이트되었습니다!')
        return { success: true, data }
      }
    } catch (error) {
      const errorMessage = '프로필 업데이트 중 오류가 발생했습니다.'
      setError(errorMessage)
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // 아바타 업로드 함수
  const uploadAvatar = async (file) => {
    if (!user) {
      toast.error('로그인이 필요합니다.')
      return { success: false, error: '로그인이 필요합니다.' }
    }

    if (!file) {
      toast.error('업로드할 파일을 선택해주세요.')
      return { success: false, error: '파일이 선택되지 않았습니다.' }
    }

    try {
      // 업로드 시작 토스트
      const uploadingToast = toast.loading('아바타 업로드 중...')
      
      const result = await profileAPI.uploadAvatar(user.id, file)
      
      // 로딩 토스트 제거
      toast.dismiss(uploadingToast)
      
      if (result.error) {
        console.error('❌ 아바타 업로드 실패:', result.error)
        toast.error(`업로드 실패: ${result.error.message}`)
        return { success: false, error: result.error.message }
      }

      // 성공 시 프로필 새로고침
      await refreshProfile()
      
      toast.success('🎉 프로필 사진이 성공적으로 업로드되었습니다!')
      console.log('✅ 아바타 업로드 성공:', result.data.url)
      
      return { success: true, data: result.data }
    } catch (error) {
      console.error('💥 아바타 업로드 예외:', error)
      toast.error(`업로드 중 오류가 발생했습니다: ${error.message}`)
      return { success: false, error: error.message }
    }
  }

  // 프로필 삭제 함수
  const deleteProfile = async () => {
    if (!user) {
      toast.error('로그인이 필요합니다.')
      return { success: false, error: '로그인이 필요합니다.' }
    }

    try {
      const deleteToast = toast.loading('프로필을 삭제하는 중...')
      
      const result = await profileAPI.deleteProfile(user.id)
      
      toast.dismiss(deleteToast)
      
      if (result.error) {
        console.error('❌ 프로필 삭제 실패:', result.error)
        toast.error(`삭제 실패: ${result.error.message}`)
        return { success: false, error: result.error.message }
      }

      // 성공 시 프로필 상태 초기화
      setProfile(null)
      
      toast.success('🗑️ 프로필이 성공적으로 삭제되었습니다!')
      console.log('✅ 프로필 삭제 성공')
      
      return { success: true, data: result.data }
    } catch (error) {
      console.error('💥 프로필 삭제 예외:', error)
      toast.error(`삭제 중 오류가 발생했습니다: ${error.message}`)
      return { success: false, error: error.message }
    }
  }

  const checkUsername = async (username) => {
    if (!username) return { available: false, error: '사용자명을 입력해주세요.' }

    try {
      const result = await profileAPI.checkUsernameAvailability(username, user?.id)
      return result
    } catch (error) {
      return { available: false, error: '사용자명 확인 중 오류가 발생했습니다.' }
    }
  }

  const searchProfiles = async (query, limit = 10) => {
    try {
      const { data, error } = await profileAPI.searchProfiles(query, limit)
      if (error) {
        toast.error('검색 중 오류가 발생했습니다.')
        return { data: [], error }
      }
      return { data, error: null }
    } catch (error) {
      toast.error('검색 중 오류가 발생했습니다.')
      return { data: [], error }
    }
  }

  const getPublicProfiles = async (limit = 10, offset = 0) => {
    try {
      const { data, error } = await profileAPI.getPublicProfiles(limit, offset)
      if (error) {
        toast.error('프로필 목록을 불러오는데 실패했습니다.')
        return { data: [], error }
      }
      return { data, error: null }
    } catch (error) {
      toast.error('프로필 목록을 불러오는데 실패했습니다.')
      return { data: [], error }
    }
  }

  const refreshProfile = async () => {
    await loadCurrentProfile()
  }

  const clearProfile = () => {
    setProfile(null)
    setError(null)
    setLoading(false)
  }

  const value = {
    // 상태
    profile,
    loading,
    error,
    
    // 함수들
    updateProfile,
    uploadAvatar,
    deleteProfile,
    checkUsername,
    searchProfiles,
    getPublicProfiles,
    refreshProfile,
    clearProfile,
    
    // 계산된 값들
    isProfileComplete: profile && profile.username && profile.full_name,
    hasAvatar: profile && profile.avatar_url,
    isPublic: profile && profile.is_public
  }

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
} 