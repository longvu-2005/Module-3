import React, { useState } from 'react';
import BookItem from './BookItem';

function BookStore() {
  // Kho dữ liệu ban đầu
  const [books, setBooks] = useState([
    { id: 1, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie' },
    { id: 2, title: 'Nhà Giả Kim', author: 'Paulo Coelho' },
    { id: 3, title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', author: 'Rosie Nguyễn' }
  ]);

  // Hàm hỗ trợ test bẫy dữ liệu mảng rỗng []
  const handleClearBooks = () => {
    setBooks([]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Danh Sách Sách Trong Kho</h2>
        {books.length > 0 && (
          <button onClick={handleClearBooks} style={styles.clearBtn}>
            Giả lập Kho Rỗng
          </button>
        )}
      </div>

      {/* Xử lý Bẫy dữ liệu: Mảng rỗng [] */}
      {books.length === 0 ? (
        <div style={styles.emptyBox}>
          <p style={styles.emptyText}>Hiện chưa có cuốn sách nào trong kho</p>
        </div>
      ) : (
        <div style={styles.list}>
          {books.map((book) => (
            <BookItem
              key={book.id}
              title={book.title}
              author={book.author}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '30px auto',
    padding: '20px',
    fontFamily: 'sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  clearBtn: {
    padding: '6px 12px',
    backgroundColor: '#e53e3e',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  emptyBox: {
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#edf2f7',
    borderRadius: '8px',
    border: '1px dashed #cbd5e0'
  },
  emptyText: {
    margin: 0,
    color: '#718096',
    fontSize: '16px',
    fontWeight: '500'
  }
};

export default BookStore;