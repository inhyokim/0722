'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useProfile } from '@/contexts/ProfileContext'
import AvatarUpload from './AvatarUpload'

// 폼 검증 스키마
const profileSchema = yup.object({
  username: yup
    .string()
    .min(3, '사용자명은 3자 이상이어야 합니다')
    .matches(/^[a-zA-Z0-9_]+$/, '영문, 숫자, 언더스코어만 사용 가능합니다')
    .required('사용자명은 필수입니다'),
  full_name: yup
    .string()
    .max(50, '이름은 50자 이하여야 합니다')
    .required('이름은 필수입니다'),
  bio: yup
    .string()
    .max(500, '자기소개는 500자 이하여야 합니다'),
  website: yup
    .string()
    .url('올바른 URL 형식이 아닙니다')
    .nullable(),
  location: yup
    .string()
    .max(100, '위치는 100자 이하여야 합니다'),
  phone: yup
    .string()
    .matches(/^[\d\-\+\s\(\)]*$/, '올바른 전화번호 형식이 아닙니다')
    .nullable(),
  date_of_birth: yup
    .date()
    .max(new Date(), '미래 날짜는 입력할 수 없습니다')
    .nullable(),
  is_public: yup
    .boolean()
})

export default function ProfileForm({ onSuccess, onCancel, onDelete }) {
  const { profile, updateProfile, checkUsername, loading } = useProfile()
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [usernameValid, setUsernameValid] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    setValue,
    watch,
    reset
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      username: '',
      full_name: '',
      bio: '',
      website: '',
      location: '',
      phone: '',
      date_of_birth: '',
      is_public: true
    }
  })

  const watchedUsername = watch('username')

  // 프로필 데이터로 폼 초기화
  useEffect(() => {
    if (profile) {
      reset({
        username: profile.username || '',
        full_name: profile.full_name || '',
        bio: profile.bio || '',
        website: profile.website || '',
        location: profile.location || '',
        phone: profile.phone || '',
        date_of_birth: profile.date_of_birth ? new Date(profile.date_of_birth).toISOString().split('T')[0] : '',
        is_public: profile.is_public !== false
      })
      setUsernameValid(!!profile.username)
    }
  }, [profile, reset])

  // 사용자명 실시간 중복 체크
  useEffect(() => {
    const checkUsernameDebounced = setTimeout(async () => {
      if (watchedUsername && watchedUsername !== profile?.username && watchedUsername.length >= 3) {
        setIsCheckingUsername(true)
        const result = await checkUsername(watchedUsername)
        setUsernameError(result.error?.message || '')
        setUsernameValid(result.available)
        setIsCheckingUsername(false)
      } else if (watchedUsername === profile?.username) {
        setUsernameError('')
        setUsernameValid(true)
      }
    }, 500)

    return () => clearTimeout(checkUsernameDebounced)
  }, [watchedUsername, profile?.username, checkUsername])

  const onSubmit = async (data) => {
    // 사용자명 중복 체크
    if (data.username !== profile?.username && !usernameValid) {
      setUsernameError('사용자명을 확인해주세요')
      return
    }

    // 웹사이트 URL 형식 자동 수정
    if (data.website && !data.website.startsWith('http')) {
      data.website = `https://${data.website}`
    }

    // 빈 문자열을 null로 변환
    Object.keys(data).forEach(key => {
      if (data[key] === '') {
        data[key] = null
      }
    })

    const result = await updateProfile(data)
    
    if (result.success) {
      onSuccess?.(result.data)
    }
  }

  const handleCancel = () => {
    reset()
    onCancel?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 아바타 업로드 */}
      <div className="flex justify-center">
        <AvatarUpload />
      </div>

      {/* 기본 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 사용자명 */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            사용자명 *
          </label>
          <div className="mt-1 relative">
            <input
              {...register('username')}
              type="text"
              className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.username || usernameError ? 'border-red-300' : usernameValid ? 'border-green-300' : ''
              }`}
              placeholder="사용자명 (3자 이상, 영문/숫자/밑줄)"
            />
            {isCheckingUsername && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              </div>
            )}
            {!isCheckingUsername && watchedUsername && usernameValid && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
          )}
          {usernameError && !errors.username && (
            <p className="mt-1 text-sm text-red-600">{usernameError}</p>
          )}
          {!errors.username && !usernameError && usernameValid && watchedUsername !== profile?.username && (
            <p className="mt-1 text-sm text-green-600">사용 가능한 사용자명입니다!</p>
          )}
        </div>

        {/* 이름 */}
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
            이름 *
          </label>
          <input
            {...register('full_name')}
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="실제 이름"
          />
          {errors.full_name && (
            <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
          )}
        </div>
      </div>

      {/* 자기소개 */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          자기소개
        </label>
        <textarea
          {...register('bio')}
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="자신에 대해 간단히 소개해주세요..."
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {watch('bio')?.length || 0}/500자
        </p>
      </div>

      {/* 추가 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 웹사이트 */}
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            웹사이트
          </label>
          <input
            {...register('website')}
            type="url"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="https://example.com"
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
          )}
        </div>

        {/* 위치 */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            위치
          </label>
          <input
            {...register('location')}
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="서울, 대한민국"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        {/* 전화번호 */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            전화번호
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="010-1234-5678"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* 생년월일 */}
        <div>
          <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
            생년월일
          </label>
          <input
            {...register('date_of_birth')}
            type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.date_of_birth && (
            <p className="mt-1 text-sm text-red-600">{errors.date_of_birth.message}</p>
          )}
        </div>
      </div>

      {/* 프로필 공개 설정 */}
      <div className="flex items-center">
        <input
          {...register('is_public')}
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="is_public" className="ml-2 block text-sm text-gray-900">
          프로필을 공개합니다
        </label>
      </div>
      <p className="text-xs text-gray-500 ml-6">
        공개 프로필은 다른 사용자들이 검색하고 볼 수 있습니다.
      </p>

      {/* 버튼 */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        {/* 삭제 버튼 (왼쪽) */}
        <button
          type="button"
          onClick={onDelete}
          className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center"
          disabled={isSubmitting || loading}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          프로필 삭제
        </button>

        {/* 취소/저장 버튼 (오른쪽) */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isSubmitting || loading}
          >
            취소하기
          </button>
          <button
            type="submit"
            disabled={isSubmitting || loading || (!isDirty && !profile)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting || loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                저장하는 중...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                변경사항 저장
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
} 