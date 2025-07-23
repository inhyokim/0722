"use client";

const linkStyle = {
  color: '#666',
  textDecoration: 'none',
  padding: '0.5rem',
  borderRadius: '4px',
  transition: 'color 0.2s'
};

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#f8f9fa',
      borderTop: '1px solid #e5e5e5',
      padding: '2rem',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '1rem',
          flexWrap: 'wrap'
        }}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
             style={linkStyle} className="footer-link">
            🐙 GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
             style={linkStyle} className="footer-link">
            💼 LinkedIn
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
             style={linkStyle} className="footer-link">
            🐦 Twitter
          </a>
        </div>
        
        <div style={{
          borderTop: '1px solid #e5e5e5',
          paddingTop: '1rem',
          color: '#666',
          fontSize: '0.9rem'
        }}>
          <p style={{ margin: 0 }}>
            © 2024 My Website. Made with ❤️ using Next.js
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem' }}>
            학습 목적으로 만든 개인 웹사이트입니다.
          </p>
        </div>
      </div>
      
      <style jsx>{`
        .footer-link:hover {
          color: #0070f3;
        }
      `}</style>
    </footer>
  );
} 