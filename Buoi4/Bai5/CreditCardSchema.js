import * as Yup from 'yup';

export class CreditCardSchema {
  static getSchema() {
    return Yup.object().shape({
      fullName: Yup.string()
        .required('Vui lòng nhập họ và tên'),
      
      // Bẫy dữ liệu 1: CCCD bắt buộc đúng 12 chữ số qua Regex .matches()
      idCard: Yup.string()
        .required('Vui lòng nhập số CCCD')
        .matches(/^[0-9]{12}$/, 'CCCD phải bao gồm đúng 12 chữ số'),

      // Bẫy dữ liệu 2: Thu nhập phải là số thực và lớn hơn 5.000.000
      monthlyIncome: Yup.number()
        .typeError('Thu nhập phải là định dạng số')
        .required('Vui lòng nhập thu nhập hàng tháng')
        .gt(5000000, 'Thu nhập hàng tháng phải lớn hơn 5.000.000 VNĐ'),
    });
  }
}