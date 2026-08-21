import React, { useRef, useCallback } from 'react';

export const ConsultationPage: React.FC = () => {
  // 1. Khởi tạo ref để tham chiếu tới DOM element của ô Email
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  // 2. Khởi tạo ref khóa chống spam click (không gây re-render)
  const isScrollingLockRef = useRef<boolean>(false);

  // 3. Hàm xử lý cuộn và focus an toàn
  const handleConsultationClick = useCallback(() => {
    // BẪY DỮ LIỆU: Nếu đang trong tiến trình cuộn, từ chối mọi thao tác click dồn dập
    if (isScrollingLockRef.current) return;

    // Khóa thao tác
    isScrollingLockRef.current = true;

    if (emailInputRef.current) {
      // Cuộn mượt lên vị trí ô nhập liệu
      emailInputRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      // Tự động focus vào ô Email
      emailInputRef.current.focus({ preventScroll: true });
    }

    // Mở khóa sau 800ms (thời gian hiệu ứng cuộn hoàn tất)
    setTimeout(() => {
      isScrollingLockRef.current = false;
    }, 800);
  }, []);

  // Hàm xử lý Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn tải lại trang
    alert('Đăng ký tư vấn thành công!');
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
      {/* VÙNG 1: FORM ĐĂNG KÝ TƯ VẤN (ĐẦU TRANG) */}
      <section
        style={{
          padding: '32px',
          backgroundColor: '#f4f6f8',
          borderRadius: '12px',
          marginBottom: '600px', // Tạo khoảng cách giả định trang dài
        }}
      >
        <h2>📝 Form Đăng Ký Tư Vấn Chương Trình Đào Tạo</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Họ và tên:
            </label>
            <input
              type="text"
              placeholder="Nhập họ và tên"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Email nhận tư vấn (*):
            </label>
            {/* Gán ref trực tiếp vào thẻ input */}
            <input
              ref={emailInputRef}
              type="email"
              placeholder="nguyenvana@gmail.com"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #1890ff' }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '12px',
              backgroundColor: '#52c41a',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Gửi thông tin ngay
          </button>
        </form>
      </section>

      {/* VÙNG 2: NỘI DUNG CHƯƠNG TRÌNH & NÚT CTA (CUỐI TRANG) */}
      <section style={{ padding: '20px 0', borderTop: '2px dashed #ccc' }}>
        <h3>🎓 Tại sao nên chọn khóa học này?</h3>
        <p>
          Chương trình đào tạo chuẩn doanh nghiệp giúp bạn làm chủ React, TypeScript và các kỹ thuật tối ưu giao diện hàng đầu.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          {/* Nút CTA 1 */}
          <button
            onClick={handleConsultationClick}
            style={{
              padding: '14px 28px',
              backgroundColor: '#1890ff',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            👉 Đăng ký tư vấn ngay (CTA 1)
          </button>

          {/* Nút CTA 2 (Simulate spam click) */}
          <button
            onClick={handleConsultationClick}
            style={{
              padding: '14px 28px',
              backgroundColor: '#722ed1',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            ⚡ Đăng ký tư vấn ngay (CTA 2)
          </button>
        </div>
      </section>
    </div>
  );
};

export default ConsultationPage;