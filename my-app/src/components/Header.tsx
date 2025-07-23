"use client";

import Link from 'next/link';

const linkStyle = {
  color: '#333',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  transition: 'background-color 0.2s'
};



export default function Header() {
  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e5e5',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#0070f3',
          textDecoration: 'none'
        }}>
          🏠 My Website
        </Link>
        
        <nav>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '2rem'
          }}>
            <li>
              <Link href="/" style={linkStyle} className="nav-link">
                홈
              </Link>
            </li>
            <li>
              <Link href="/about" style={linkStyle} className="nav-link">
                소개
              </Link>
            </li>
            <li>
              <Link href="/favorites" style={linkStyle} className="nav-link">
                좋아하는 것
              </Link>
            </li>
            <li>
              <Link href="/contact" style={linkStyle} className="nav-link">
                연락처
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      <style jsx>{`
        .nav-link:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </header>
  );
} 