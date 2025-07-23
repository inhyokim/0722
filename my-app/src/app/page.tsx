export default function Home() {
  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '1000px', 
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '20px',
        marginBottom: '3rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          margin: '0 0 1rem 0',
          fontWeight: 'bold'
        }}>
          안녕하세요! 👋
        </h1>
        <h2 style={{ 
          fontSize: '1.5rem', 
          margin: '0 0 2rem 0',
          fontWeight: 'normal',
          opacity: 0.9
        }}>
          나의 Next.js 웹사이트에 오신 것을 환영합니다
        </h2>
        <p style={{ 
          fontSize: '1.1rem', 
          opacity: 0.8,
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          이 사이트는 Next.js와 React로 만든 개인 웹사이트입니다.<br/>
          위의 네비게이션을 통해 다양한 페이지를 둘러보세요!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          padding: '2rem',
          borderRadius: '12px',
          backgroundColor: '#f8f9ff',
          border: '1px solid #e0e7ff',
          transition: 'transform 0.2s'
        }}>
          <h3 style={{ color: '#4338ca', margin: '0 0 1rem 0' }}>
            👨‍💻 소개
          </h3>
          <p style={{ color: '#666', margin: 0 }}>
            저에 대한 정보와 기술 스택을 확인해보세요
          </p>
        </div>

        <div style={{
          padding: '2rem',
          borderRadius: '12px',
          backgroundColor: '#f0fdf4',
          border: '1px solid #dcfce7',
          transition: 'transform 0.2s'
        }}>
          <h3 style={{ color: '#166534', margin: '0 0 1rem 0' }}>
            ❤️ 좋아하는 것
          </h3>
          <p style={{ color: '#666', margin: 0 }}>
            제가 좋아하는 음악, 책, 음식 등을 소개합니다
          </p>
        </div>

        <div style={{
          padding: '2rem',
          borderRadius: '12px',
          backgroundColor: '#fefce8',
          border: '1px solid #fde047',
          transition: 'transform 0.2s'
        }}>
          <h3 style={{ color: '#a16207', margin: '0 0 1rem 0' }}>
            📞 연락처
          </h3>
          <p style={{ color: '#666', margin: 0 }}>
            협업이나 문의사항이 있으시면 연락해주세요
          </p>
        </div>
      </div>

      <div style={{
        backgroundColor: '#f8fafc',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ color: '#334155', margin: '0 0 1rem 0' }}>
          🚀 기술 스택
        </h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          {['Next.js', 'React', 'TypeScript', 'CSS'].map((tech) => (
            <span key={tech} style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}