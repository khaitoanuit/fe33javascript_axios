var nguoiDungService = new NguoiDungService();


getListUser();

getELE("btnThemNguoiDung").addEventListener("click", function () {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm người dùng";
    var footer = `
    <button class="btn btn-success" onclick="ThemNguoiDung()">Thêm</button>
    `;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
})
// -------- THÊM NGƯỜI DÙNG ----------
function ThemNguoiDung() {
    var taiKhoan = getELE("TaiKhoan").value;
    var hoTen = getELE("HoTen").value;
    var matKhau = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var soDT = getELE("SoDienThoai").value;
    var maLoaiNguoiDung = getELE("loaiNguoiDung").value;
    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);
    console.log(nguoiDung);
    nguoiDungService.themNguoiDung(nguoiDung)
        .then(function (result) {
            //reload page
            //location.reload();
            getListUser();
            alert("Thêm người dùng thành công rồi á nha á nha á nha!");
            console.log(result);
        })
        .catch(function (errors) {
            console.log(errors);
        })
}
/**
 * Xóa người dùng
 */
function xoaNguoiDung(id) {
    console.log(id);
    nguoiDungService.xoaNguoiDung(id)
        .then(function (result) {
            getListUser();
            alert("Đã xóa một người dùng");
        })
        .catch(function (errors) {
            console.log(errors);
        })
}
/**
 * Sửa người dùng
 */
function suaNguoiDung(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa người dùng";
    var footer = `<button class="btn btn-success" onclick="capNhatNguoiDung(${id})">Cập nhật</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    nguoiDungService.layThongTinNguoiDung(id)
        .then(function (result) {
            console.log(result);
            getELE("TaiKhoan").value = result.data.taiKhoan;
            getELE("HoTen").value = result.data.hoTen;
            getELE("MatKhau").value = result.data.matKhau;
            getELE("Email").value = result.data.email;
            getELE("SoDienThoai").value = result.data.soDT;
            getELE("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
        })
        .catch(function (errors) {
            console.log(errors);
        })
}
/**
 * Cập nhật người dùng
 */
function capNhatNguoiDung(id) {
    var taiKhoan = getELE("TaiKhoan").value;
    var hoTen = getELE("HoTen").value;
    var matKhau = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var soDT = getELE("SoDienThoai").value;
    var maLoaiNguoiDung = getELE("loaiNguoiDung").value;
    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);
    console.log(id);
    nguoiDungService.capNhatNguoiDung(id, nguoiDung)
        .then(function (result) {
            alert("Cập nhật thành công!");
            getListUser();
        })
        .catch(function (errors) {
            console.log(errors);
        })
}
/**
 * Tìm kiếm người dùng
 */
getELE("txtSearch").addEventListener("keyup", function () {
    var chuoiTimKiem = getELE("txtSearch").value;
    console.log(chuoiTimKiem);
    var danhSachNguoiDung = getLocalStorage();
    var danhSachTimKiem = nguoiDungService.timKiemNguoiDung(chuoiTimKiem, danhSachNguoiDung);
    renderTable(danhSachTimKiem);
})
/**
 * Lấy danh sách người dùng
 */
function getListUser() {
    nguoiDungService.layDanhSachNguoiDung()
        .then(function (result) {
            console.log(result);
            renderTable(result.data);
            setLocalStorage(result.data);
        })
        .catch(function (errors) {
            console.log(errors);
        });

}
function renderTable(mangNguoiDung) {
    var contentHTML = "";

    mangNguoiDung.map(function (item, index) {
        contentHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.matKhau}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.soDT}</td>
            <td>${item.maLoaiNguoiDung}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNguoiDung(${item.id})">Sửa</button>
                <button class="btn btn-danger" onclick="xoaNguoiDung(${item.id})">Xóa</button>
            </td>
        </tr>
        `;
    });
    getELE("tblDanhSachNguoiDung").innerHTML = contentHTML;
}
function getELE(id) {
    return document.getElementById(id);
}
function setLocalStorage(danhSachNguoiDung) {
    localStorage.setItem("DSND", JSON.stringify(danhSachNguoiDung));
}
function getLocalStorage() {
    return JSON.parse(localStorage.getItem("DSND"));
}
