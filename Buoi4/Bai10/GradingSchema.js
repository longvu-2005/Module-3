import * as Yup from 'yup';

export class GradingSchema {
  static getSchema() {
    return Yup.object().shape({
      // Mã môn học bắt buộc nhập và tự động transform hoa
      subjectCode: Yup.string()
        .required('Vui lòng nhập mã môn học')
        .matches(/^[A-Z0-9]+$/, 'Mã môn học chỉ bao gồm chữ cái in hoa và số'),

      // Bẫy 1: Sĩ số sinh viên > 0
      studentCount: Yup.number()
        .typeError('Sĩ số phải là định dạng số')
        .required('Vui lòng nhập sĩ số')
        .positive('Sĩ số không hợp lệ')
        .integer('Sĩ số phải là số nguyên'),

      // Bẫy 2: Mảng điểm thi (từ 0.0 đến 10.0)
      grades: Yup.array()
        .of(
          Yup.object().shape({
            studentId: Yup.string().required('Thiếu mã sinh viên'),
            score: Yup.number()
              .typeError('Điểm phải là định dạng số')
              .required('Vui lòng nhập điểm')
              .min(0.0, 'Điểm tối thiểu là 0.0')
              .max(10.0, 'Điểm tối đa là 10.0'),
          })
        )
        .min(1, 'Danh sách điểm không được để trống'),
    });
  }
}