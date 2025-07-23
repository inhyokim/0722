import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase 환경변수가 설정되지 않았습니다!')
  console.log('📝 .env.local 파일에 다음 환경변수들을 설정해주세요:')
  console.log('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url')
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
  console.log('🌐 Supabase 대시보드에서 값을 확인하세요: https://app.supabase.com')
}

// 환경변수가 없어도 일단 빈 문자열로 클라이언트 생성 (에러 방지)
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

// Auth helper functions
export const auth = {
  // 회원가입
  signUp: async (email, password) => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return { 
        data: null, 
        error: { 
          message: 'Supabase 환경변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요.' 
        } 
      }
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  // 로그인
  signIn: async (email, password) => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return { 
        data: null, 
        error: { 
          message: 'Supabase 환경변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요.' 
        } 
      }
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // 로그아웃
  signOut: async () => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return { 
        error: { 
          message: 'Supabase 환경변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요.' 
        } 
      }
    }
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // 현재 사용자 정보 가져오기
  getCurrentUser: async () => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return { 
        user: null,
        error: { 
          message: 'Supabase 환경변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요.' 
        } 
      }
    }
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Auth 상태 변경 감지
  onAuthStateChange: (callback) => {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase 환경변수가 설정되지 않았습니다.')
      return { data: { subscription: null } }
    }
    return supabase.auth.onAuthStateChange(callback)
  }
} 