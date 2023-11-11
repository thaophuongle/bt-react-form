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

  const [formError, setFormError] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
  });

  const { studentEdit } = useSelector((state) => state.quanLySinhVien);
  const {studentList} = useSelector((state) => state.quanLySinhVien)

  const checkId = (id) => {
    var studentIndex = studentList.findIndex((student) => {
        return student.id == id
    })

    if (studentIndex != -1) {
        return true
    }
    else {
        return false
    }


}


  const handleFormValue = (name) => (event) => {
    setFormError({ ...formError, [name]: validateInput(name, event.target.value) });
    setFormValue({ ...formValue, [name]: event.target.value });
  };

  const validateInput = (name, value) => {
    switch (name) {
        case "id":
          if (value.trim() === "") {
            return "vui lòng nhập thông tin";
          }
          else if (checkId(value)) {
            return "Mã sinh viên bị trùng";
          }
          else {
            return "";
          }
      
        case "name":
          if (value.trim() === "") {
            return "vui lòng nhập thông tin";
          } else if (!value.match(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸ\s\W|_]+$/)) {
            return "Vui lòng nhập chữ";
          } else {
            return "";
          }
      
        case "phoneNumber":
          if (value.trim() === "") {
            return "vui lòng nhập thông tin";
          } else if (!value.match(/^[0-9]*$/)) {
            return "Vui lòng nhập số";
          } else {
            return "";
          }
      
        case "email":
          if (value.trim() === "") {
            return "vui lòng nhập thông tin";
          } else if (!value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            return "Vui lòng nhập đúng định dạng email";
          } else {
            return "";
          }
      
        default:
          return "";
      }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (studentEdit) {
        setFormValue(studentEdit)
    }
  }, [studentEdit])

  return (
    <div className="row justify-content-end">
        <div className="col-4">
        <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
        </div>
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const errorValidation = {};

        Object.keys(formValue).forEach((name) => {
            const error = validateInput(name, formValue[name])
            if (error && error.length > 0) {
                errorValidation[name] = error;
            }

        });

        if (Object.keys(errorValidation).length > 0) {
            setFormError({...errorValidation})
            return
        }

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
            {formError.id && (
              <p>
                <small className="text-danger">{formError.id}</small>
              </p>
            )}
          </div>
          <div className="mt-3">
            <p>Số điện thoại</p>
            <input
              type="text"
              className="form-control"
              value={formValue.phoneNumber}
              onChange={handleFormValue("phoneNumber")}
            />
            {formError.phoneNumber && (
              <p>
                <small className="text-danger">{formError.phoneNumber}</small>
              </p>
            )}
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
            {formError.name && (
              <p>
                <small className="text-danger">{formError.name}</small>
              </p>
            )}
          </div>
          <div className="mt-3">
            <p>Email</p>
            <input
              type="text"
              className="form-control"
              value={formValue.email}
              onChange={handleFormValue("email")}
            />
            {formError.email && (
              <p>
                <small className="text-danger">{formError.email}</small>
              </p>
            )}
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
    </div>
  );
};
