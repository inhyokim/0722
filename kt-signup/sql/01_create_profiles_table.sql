-- ==================================================
-- PROFILES 테이블 생성 및 설정
-- Supabase SQL Editor에서 이 스크립트를 실행하세요
-- ==================================================

-- 1. Profiles 테이블 생성
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  website text,
  location text,
  phone text,
  date_of_birth date,
  is_public boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- 제약조건
  constraint username_length check (char_length(username) >= 3),
  constraint valid_website check (website ~ '^https?://.*' OR website is null)
);

-- 2. Updated_at 자동 업데이트를 위한 함수
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 3. 새 사용자 가입 시 프로필 자동 생성 함수
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- 4. 트리거 설정
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger handle_updated_at_profiles
  before update on profiles
  for each row execute procedure public.handle_updated_at();

-- 5. Row Level Security (RLS) 활성화
alter table profiles enable row level security;

-- 6. RLS 정책 설정
-- 사용자는 모든 공개 프로필을 볼 수 있음
create policy "Public profiles are viewable by everyone" on profiles
  for select using (is_public = true);

-- 사용자는 자신의 프로필을 항상 볼 수 있음
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

-- 사용자는 자신의 프로필만 업데이트 가능
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- 사용자는 자신의 프로필만 삽입 가능 (트리거에서 자동 생성됨)
create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- 사용자는 자신의 프로필만 삭제 가능
create policy "Users can delete own profile" on profiles
  for delete using (auth.uid() = id);

-- 7. 인덱스 생성 (성능 최적화)
create index profiles_username_idx on profiles(username);
create index profiles_created_at_idx on profiles(created_at);
create index profiles_is_public_idx on profiles(is_public);

-- 8. 기존 사용자들을 위한 프로필 생성 (선택사항)
-- 이미 가입된 사용자가 있다면 실행
insert into public.profiles (id, full_name)
select 
  auth.users.id,
  coalesce(
    auth.users.raw_user_meta_data->>'full_name', 
    split_part(auth.users.email, '@', 1)
  )
from auth.users 
left join public.profiles on auth.users.id = public.profiles.id 
where public.profiles.id is null; 

-- ==================================================
-- STORAGE RLS 완전 비활성화 (아바타 업로드 문제 해결)
-- ==================================================

-- 기존 Storage 정책들 삭제
DROP POLICY IF EXISTS "Users can upload own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects; 
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Avatar upload policy" ON storage.objects;
DROP POLICY IF EXISTS "Avatar public access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload avatars" ON storage.objects;

-- Storage 객체에 대한 RLS 완전 비활성화
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- 또는 avatars 버킷만 허용하는 간단한 정책 (선택사항)
-- CREATE POLICY "Anyone can upload to avatars bucket" ON storage.objects
--   FOR INSERT WITH CHECK (bucket_id = 'avatars');
-- CREATE POLICY "Anyone can read avatars bucket" ON storage.objects
--   FOR SELECT USING (bucket_id = 'avatars'); 