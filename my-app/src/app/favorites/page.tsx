import Link from 'next/link';

export default function Favorites() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>좋아하는 것들</h1>
      
      <h2>🎵 음악</h2>
      <ul>
        <li>K-Pop</li>
        <li>Jazz</li>
        
        <li>Lo-fi Hip Hop</li>
        <li>클래식</li>
      </ul>
      
      <h2>📚 책</h2>
      <ul>
        <li>프로그래밍 서적</li>
        <li>SF 소설</li>
        <li>자기계발서</li>
        <li>에세이</li>
      </ul>
      
      <h2>🍕 음식</h2>
      <ul>
        <li>피자</li>
        <li>파스타</li>
        <li>한식</li>
        <li>일식</li>
      </ul>
      
      <h2>💻 프로그래밍 언어</h2>
      <ul>
        <li>JavaScript</li>
        <li>TypeScript</li>
        <li>Python</li>
        <li>React</li>
      </ul>
      
      <nav style={{ marginTop: '20px' }}>
        <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>← 홈으로 돌아가기</Link>
      </nav>
    </div>
  );
} 