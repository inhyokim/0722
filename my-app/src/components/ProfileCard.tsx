"use client";

interface ProfileCardProps {
  title: string;
  children: React.ReactNode;
  backgroundColor?: string;
  icon?: string;
}

export default function ProfileCard({ 
  title, 
  children, 
  backgroundColor = '#f5f5f5',
  icon 
}: ProfileCardProps) {
  return (
    <div style={{
      backgroundColor,
      padding: '1.5rem',
      borderRadius: '12px',
      marginBottom: '1rem',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }}
    >
      <h2 style={{
        margin: '0 0 1rem 0',
        color: '#333',
        fontSize: '1.3rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        {icon && <span>{icon}</span>}
        {title}
      </h2>
      <div style={{
        color: '#555',
        lineHeight: '1.6'
      }}>
        {children}
      </div>
    </div>
  );
} 