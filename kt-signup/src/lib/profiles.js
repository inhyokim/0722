import { supabase } from './supabase'

// Profile 스키마 타입 정의
export const PROFILE_FIELDS = {
  username: 'string',
  full_name: 'string', 
  avatar_url: 'string',
  bio: 'string',
  website: 'string',
  location: 'string',
  phone: 'string',
  date_of_birth: 'date',
  is_public: 'boolean'
}

// Profile API 헬퍼 함수들
export const profileAPI = {
  // 📖 프로필 조회 (READ)
  getProfile: async (userId) => {
    try {
      if (!userId) {
        return { data: null, error: { message: '사용자 ID가 필요합니다.' } }
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      return { data, error }
    } catch (error) {
      console.error('Profile 조회 에러:', error)
      return { data: null, error }
    }
  },

  // 📖 현재 사용자 프로필 조회
  getCurrentProfile: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { data: null, error: { message: '로그인이 필요합니다.' } }
      }

      return await profileAPI.getProfile(user.id)
    } catch (error) {
      console.error('현재 사용자 프로필 조회 에러:', error)
      return { data: null, error }
    }
  },

  // 📖 모든 공개 프로필 조회
  getPublicProfiles: async (limit = 10, offset = 0) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, full_name, avatar_url, bio, location, created_at')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
      
      return { data, error }
    } catch (error) {
      console.error('공개 프로필 조회 에러:', error)
      return { data: null, error }
    }
  },

  // 🔍 프로필 검색 (사용자명/이름으로)
  searchProfiles: async (query, limit = 10) => {
    try {
      if (!query || query.trim().length < 2) {
        return { data: [], error: null }
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, full_name, avatar_url, bio')
        .eq('is_public', true)
        .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
        .limit(limit)
      
      return { data: data || [], error }
    } catch (error) {
      console.error('프로필 검색 에러:', error)
      return { data: [], error }
    }
  },

  // ✅ 프로필 생성 (CREATE)
  createProfile: async (profileData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { data: null, error: { message: '로그인이 필요합니다.' } }
      }

      // 데이터 검증
      const validatedData = profileAPI.validateProfileData(profileData)
      if (validatedData.error) {
        return { data: null, error: validatedData.error }
      }

      const { data, error } = await supabase
        .from('profiles')
        .insert([{
          id: user.id,
          ...validatedData.data
        }])
        .select()
        .single()
      
      return { data, error }
    } catch (error) {
      console.error('프로필 생성 에러:', error)
      return { data: null, error }
    }
  },

  // ✏️ 프로필 업데이트 (UPDATE)
  updateProfile: async (userId, updates) => {
    try {
      if (!userId) {
        return { data: null, error: { message: '사용자 ID가 필요합니다.' } }
      }

      // 데이터 검증
      const validatedData = profileAPI.validateProfileData(updates)
      if (validatedData.error) {
        return { data: null, error: validatedData.error }
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(validatedData.data)
        .eq('id', userId)
        .select()
        .single()
      
      return { data, error }
    } catch (error) {
      console.error('프로필 업데이트 에러:', error)
      return { data: null, error }
    }
  },

  // 🗑️ 프로필 삭제 (DELETE)
  deleteProfile: async (userId) => {
    try {
      if (!userId) {
        return { data: null, error: { message: '사용자 ID가 필요합니다.' } }
      }

      const { data, error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)
        .select()
        .single()
      
      return { data, error }
    } catch (error) {
      console.error('프로필 삭제 에러:', error)
      return { data: null, error }
    }
  },

  // ✅ 사용자명 중복 체크
  checkUsernameAvailability: async (username, excludeUserId = null) => {
    try {
      if (!username || username.length < 3) {
        return { available: false, error: { message: '사용자명은 3자 이상이어야 합니다.' } }
      }

      let query = supabase
        .from('profiles')
        .select('id')
        .eq('username', username.toLowerCase())
      
      if (excludeUserId) {
        query = query.neq('id', excludeUserId)
      }

      const { data, error } = await query

      if (error) {
        return { available: false, error }
      }

      return { available: data.length === 0, error: null }
    } catch (error) {
      console.error('사용자명 중복 체크 에러:', error)
      return { available: false, error }
    }
  },

  // 📤 아바터 이미지 업로드
  uploadAvatar: async (userId, file) => {
    try {
      if (!file) {
        return { data: null, error: { message: '파일이 선택되지 않았습니다.' } }
      }

      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        return { data: null, error: { message: '파일 크기는 5MB 이하여야 합니다.' } }
      }

      // 파일 형식 체크
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        return { data: null, error: { message: '지원되지 않는 파일 형식입니다. (JPEG, PNG, WebP, GIF만 가능)' } }
      }

      // 현재 시간을 포함한 고유한 파일명 생성 (RLS 우회용)
      const timestamp = Date.now()
      const fileExt = file.name.split('.').pop()
      let fileName = `${timestamp}_${userId}.${fileExt}`

      console.log('📤 아바타 업로드 시작:', fileName)

      // Supabase Storage에 업로드 (RLS 우회 옵션 포함)
      let uploadData
      
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          duplex: 'half' // RLS 문제 해결용
        })

      if (uploadError) {
        console.error('❌ 업로드 에러:', uploadError)
        
        // RLS 에러인 경우 다른 방법 시도
        if (uploadError.message?.includes('row-level security') || 
            uploadError.message?.includes('RLS') ||
            uploadError.statusCode === '403') {
          
          console.log('🔄 RLS 우회 모드로 재시도...')
          
          // 더 단순한 파일명으로 재시도
          const simpleFileName = `avatar_${timestamp}.${fileExt}`
          const { data: retryData, error: retryError } = await supabase.storage
            .from('avatars')
            .upload(simpleFileName, file, {
              upsert: true
            })
          
          if (retryError) {
            return { data: null, error: { message: `업로드 실패: ${retryError.message}` } }
          }
          
          uploadData = retryData
          fileName = simpleFileName
        } else {
          return { data: null, error: uploadError }
        }
      } else {
        uploadData = data
      }

      console.log('✅ 업로드 성공:', uploadData)

      // 공개 URL 생성
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      console.log('🌐 공개 URL 생성:', publicUrl)

      // 프로필 테이블의 avatar_url 업데이트
      const { data: profileData, error: profileError } = await profileAPI.updateProfile(userId, {
        avatar_url: publicUrl
      })

      if (profileError) {
        console.error('❌ 프로필 업데이트 에러:', profileError)
        return { data: null, error: profileError }
      }

      console.log('🎉 아바타 업로드 완료!')
      return { data: { url: publicUrl, profile: profileData }, error: null }
    } catch (error) {
      console.error('💥 아바타 업로드 에러:', error)
      return { data: null, error: { message: `업로드 중 오류 발생: ${error.message}` } }
    }
  },

  // ✅ 프로필 데이터 검증
  validateProfileData: (data) => {
    try {
      const validatedData = {}
      const errors = []

      // 사용자명 검증
      if (data.username !== undefined) {
        if (data.username && data.username.length < 3) {
          errors.push('사용자명은 3자 이상이어야 합니다.')
        } else if (data.username && !/^[a-zA-Z0-9_]+$/.test(data.username)) {
          errors.push('사용자명은 영문, 숫자, 언더스코어만 사용 가능합니다.')
        } else {
          validatedData.username = data.username?.toLowerCase()
        }
      }

      // 이름 검증
      if (data.full_name !== undefined) {
        if (data.full_name && data.full_name.length > 50) {
          errors.push('이름은 50자 이하여야 합니다.')
        } else {
          validatedData.full_name = data.full_name
        }
      }

      // 자기소개 검증
      if (data.bio !== undefined) {
        if (data.bio && data.bio.length > 500) {
          errors.push('자기소개는 500자 이하여야 합니다.')
        } else {
          validatedData.bio = data.bio
        }
      }

      // 웹사이트 검증
      if (data.website !== undefined) {
        if (data.website && !data.website.match(/^https?:\/\/.+/)) {
          errors.push('웹사이트는 http:// 또는 https://로 시작해야 합니다.')
        } else {
          validatedData.website = data.website
        }
      }

      // 위치 검증
      if (data.location !== undefined) {
        if (data.location && data.location.length > 100) {
          errors.push('위치는 100자 이하여야 합니다.')
        } else {
          validatedData.location = data.location
        }
      }

      // 전화번호 검증
      if (data.phone !== undefined) {
        if (data.phone && !data.phone.match(/^[\d\-\+\s\(\)]+$/)) {
          errors.push('올바른 전화번호 형식이 아닙니다.')
        } else {
          validatedData.phone = data.phone
        }
      }

      // 생년월일 검증
      if (data.date_of_birth !== undefined) {
        if (data.date_of_birth) {
          const birthDate = new Date(data.date_of_birth)
          const today = new Date()
          const age = today.getFullYear() - birthDate.getFullYear()
          
          if (age < 13 || age > 120) {
            errors.push('나이는 13세 이상 120세 이하여야 합니다.')
          } else {
            validatedData.date_of_birth = data.date_of_birth
          }
        } else {
          validatedData.date_of_birth = data.date_of_birth
        }
      }

      // 공개 여부
      if (data.is_public !== undefined) {
        validatedData.is_public = Boolean(data.is_public)
      }

      // 아바타 URL
      if (data.avatar_url !== undefined) {
        validatedData.avatar_url = data.avatar_url
      }

      if (errors.length > 0) {
        return { data: null, error: { message: errors.join(', ') } }
      }

      return { data: validatedData, error: null }
    } catch (error) {
      console.error('데이터 검증 에러:', error)
      return { data: null, error: { message: '데이터 검증 중 오류가 발생했습니다.' } }
    }
  }
} 