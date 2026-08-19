import React from 'react';

function BookItem({ title, author }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.author}>Tác giả: <strong>{author}</strong></p>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  title: {
    margin: '0 0 8px 0',
    color: '#2d3748',
    fontSize: '18px'
  },
  author: {
    margin: 0,
    color: '#4a5568',
    fontSize: '14px'
  }
};

export default BookItem;