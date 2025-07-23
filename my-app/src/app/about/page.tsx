import Link from 'next/link';

export default function About() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>소개 페이지</h1>
      <p>안녕하세요! 저는 웹 개발을 공부하고 있는 개발자입니다.</p>
      <p>이 사이트는 Next.js로 만든 개인 웹사이트입니다.</p>
      
      <h2>기술 스택</h2>
      <ul>
        <li>Next.js</li>
        <li>React</li>
        <li>TypeScript</li>
      </ul>
      
      <h2>취미</h2>
      <p>코딩, 독서, 음악 감상을 좋아합니다.</p>
      
      <nav style={{ marginTop: '20px' }}>
        <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>← 홈으로 돌아가기</Link>
      </nav>
    </div>
  );
} 