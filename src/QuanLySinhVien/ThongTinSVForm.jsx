import React from 'react'
import { quanLySinhVienActions } from '../store/QuanLySinhVien/slice'

export const ThongTinSVForm = () => {
    const [formValue, setFormValue] = useState({
        id: "",
        name: "",
        phoneNumber: "",
        email: "",
    });

  return (
    <form>
         <h2 className="mt-5 p-3 bg-dark text-light">Thông tin sinh viên</h2>
        <div className='row'>
            <div className="col-6">
                <div className="mt-3">
                    <p>Mã SV</p>
                    <input type="text" className='form-control' />
                </div>
                <div className="mt-3">
                    <p>Số điện thoại</p>
                    <input type="text" className='form-control' />
                </div>
            </div>
            <div className="col-6">
                <div className="mt-3">
                    <p>Họ và tên</p>
                    <input type="text" className='form-control' />
                </div>
                <div className="mt-3">
                    <p>Email</p>
                    <input type="text" className='form-control' />
                </div>
            </div>
            <div className="mt-4">
            <button className="btn btn-success">Thêm sinh viên</button>
            <button className="btn btn-info">Cập nhật</button>
            </div>
        </div>
    </form>
  )
}
