import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quanLySinhVienActions } from "../store/QuanLySinhVien/slice";

export const ThongTinSVForm = () => {
  const [formValue, setFormValue] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
  });

  const { studentEdit } = useSelector((state) => state.quanLySinhVien);

  const handleFormValue = (name) => (event) => {
    setFormValue({ ...formValue, [name]: event.target.value });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (studentEdit) {
        setFormValue(studentEdit)
    }
  }, [studentEdit])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (studentEdit) {
            //dispatch action update
            dispatch(quanLySinhVienActions.updateStudent(formValue));
          } else {
            dispatch(quanLySinhVienActions.addStudent(formValue));
          }

        setFormValue({
          id: "",
          name: "",
          phoneNumber: "",
          email: "",
        });
      }}
    >
      <h2 className="mt-5 p-3 bg-dark text-light">Thông tin sinh viên</h2>
      <div className="row">
        <div className="col-6">
          <div className="mt-3">
            <p>Mã SV</p>
            <input
              type="text"
              className="form-control"
              value={formValue.id}
              onChange={handleFormValue("id")}
            />
          </div>
          <div className="mt-3">
            <p>Số điện thoại</p>
            <input
              type="text"
              className="form-control"
              value={formValue.phoneNumber}
              onChange={handleFormValue("phoneNumber")}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mt-3">
            <p>Họ và tên</p>
            <input
              type="text"
              className="form-control"
              value={formValue.name}
              onChange={handleFormValue("name")}
            />
          </div>
          <div className="mt-3">
            <p>Email</p>
            <input
              type="text"
              className="form-control"
              value={formValue.email}
              onChange={handleFormValue("email")}
            />
          </div>
        </div>
        <div className="mt-4">

        {studentEdit ? (
            <button className="btn btn-info">Cập nhật</button>
          ) : (
            <button className="btn btn-success">Thêm sinh viên</button>
          )}
        </div>
      </div>
    </form>
  );
};
