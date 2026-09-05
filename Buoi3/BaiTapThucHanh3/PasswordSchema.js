import * as Yup from 'yup';

export class PasswordSchema {
  static getSchema() {
    return Yup.object().shape({
      newPassword: Yup.string()
        .required('Vui lòng nhập mật khẩu cấp 2')
        .min(6, 'Mật khẩu cấp 2 phải có ít nhất 6 ký tự'),
      confirmPassword: Yup.string()
        .required('Vui lòng xác nhận mật khẩu cấp 2')
        // Bẫy dữ liệu: Dùng Yup.ref để so sánh chính xác 100% với newPassword
        .oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận không trùng khớp'),
    });
  }
}