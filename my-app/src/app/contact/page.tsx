import Link from 'next/link';
import ProfileCard from '../../components/ProfileCard';

export default function Contact() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>연락처</h1>
      <p>저에게 연락하고 싶으시다면 아래 정보를 이용해주세요!</p>
      
      <ProfileCard title="이메일" icon="📧" backgroundColor="#f8f9ff">
        <p style={{ margin: 0, fontSize: '1.1rem' }}>
          <strong>example@email.com</strong>
        </p>
        <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
          업무 관련 문의나 협업 제안은 이메일로 연락해주세요.
        </p>
      </ProfileCard>

      <ProfileCard title="소셜 미디어" icon="💬" backgroundColor="#f0fff4">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" style={{
            color: '#0070f3',
            textDecoration: 'none',
            padding: '0.5rem',
            borderRadius: '4px',
            backgroundColor: 'rgba(0,112,243,0.1)'
          }}>
            🐙 GitHub: github.com/username
          </a>
          <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" style={{
            color: '#0077b5',
            textDecoration: 'none',
            padding: '0.5rem',
            borderRadius: '4px',
            backgroundColor: 'rgba(0,119,181,0.1)'
          }}>
            💼 LinkedIn: linkedin.com/in/username
          </a>
          <a href="https://twitter.com/username" target="_blank" rel="noopener noreferrer" style={{
            color: '#1da1f2',
            textDecoration: 'none',
            padding: '0.5rem',
            borderRadius: '4px',
            backgroundColor: 'rgba(29,161,242,0.1)'
          }}>
            🐦 Twitter: @username
          </a>
        </div>
      </ProfileCard>

      <ProfileCard title="기타 연락처" icon="📱" backgroundColor="#fff8f0">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <strong>카카오톡</strong>
            <p style={{ margin: '0.2rem 0', color: '#666' }}>example_id</p>
          </div>
          <div>
            <strong>디스코드</strong>
            <p style={{ margin: '0.2rem 0', color: '#666' }}>username#1234</p>
          </div>
        </div>
      </ProfileCard>
      
      <ProfileCard title="연락 전 참고사항" icon="💡" backgroundColor="#e8f4f8">
        <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
          <li>협업 제안은 언제든 환영합니다!</li>
          <li>코드 리뷰나 기술 질문도 좋아요</li>
          <li>답변은 보통 1-2일 내에 드립니다</li>
          <li>스팸이나 광고성 메시지는 차단될 수 있습니다</li>
        </ul>
      </ProfileCard>
      
      <nav style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/" style={{ 
          color: '#0070f3', 
          textDecoration: 'none',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'rgba(0,112,243,0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(0,112,243,0.2)'
        }}>
          ← 홈으로 돌아가기
        </Link>
      </nav>
    </div>
  );
} 