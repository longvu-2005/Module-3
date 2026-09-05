import * as Yup from 'yup';

export class JobSchema {
  static getSchema() {
    return Yup.object().shape({
      fullName: Yup.string()
        .required('Vui lòng nhập họ và tên'),
      
      jobStatus: Yup.string()
        .required('Vui lòng chọn trạng thái việc làm'),

      // Logic Schema phụ thuộc bằng Yup.when()
      currentCompany: Yup.string().when('jobStatus', {
        is: 'EMPLOYED',
        then: (schema) => schema.required('Vui lòng nhập tên công ty hiện tại'),
        otherwise: (schema) => schema.notRequired().nullable(),
      }),
    });
  }
}