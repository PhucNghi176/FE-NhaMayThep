import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Pagination, Spin, Tooltip, } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import Vietnamese locale
dayjs.locale("vi"); // Set the locale
import { selectedNhanVien, filterNhanVien } from "../../redux/slices/nhanVienSlice/nhanVienSlice";
import { selectedCCCD, getListCanCuocCongDan } from "../../redux/slices/canCuocCongDanSlice/canCuocCongDanSlice";
import { RedoOutlined } from "@ant-design/icons";

const QuanLyNVTable = ({ dataSource }) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [selectedKey, setSelectedKey] = useState([]);
    console.log("selectNew: ", selectedKey);

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            hidden: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Họ và Tên",
            dataIndex: "hoVaTen",
            key: "hoVaTen",
        },
        {
            title: "Căn cước công dân",
            dataIndex: "canCuocCongDan",
            key: "canCuocCongDan",
        },
        {
            title: "Chức vụ",
            dataIndex: "chucVu",
            key: "chucVu",
        },
        {
            title: "Tình trạng làm việc",
            dataIndex: "tinhTrangLamViec",
            key: "tinhTrangLamViec",
        },
        {
            title: "Ngày vào công ty",
            dataIndex: "ngayVaoCongTy",
            key: "ngayVaoCongTy",
            render: (text, record) => {
                const entryDate = dayjs(text);
                const creationDate = dayjs(record.ngayVaoCongTy);
                const formattedDateTime = entryDate.format('DD/MM/YYYY');
                return (
                    <div>
                        {formattedDateTime}
                        <span> - {creationDate.format('HH:mm:ss')}</span>
                    </div>
                );
            },
        },
        {
            title: "Địa chỉ liên lạc",
            dataIndex: "diaChiLienLac",
            key: "diaChiLienLac",
        },
        {
            title: "Số điện thoại liên lạc",
            dataIndex: "soDienThoaiLienLac",
            key: "soDienThoaiLienLac",
        },
        {
            title: "Mã số thuế",
            dataIndex: "maSoThue",
            key: "maSoThue",
        },
        {
            title: "Số tài khoản",
            dataIndex: "soTaiKhoan",
            key: "soTaiKhoan",
        },
        {
            title: "Tên ngân hàng",
            dataIndex: "tenNganHang",
            key: "tenNganHang",
        },
        {
            title: "Số người phụ thuộc",
            dataIndex: "soNguoiPhuThuoc",
            key: "soNguoiPhuThuoc",
        },
    ].filter(item => !item.hidden);

    const onChangeNew = (selectedRowKeys, selectedRows) => {
        setSelectedKey(selectedRowKeys);
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
        );
        dispatch(selectedNhanVien(selectedRows));
        dispatch(getListCanCuocCongDan(selectedRows[0].id));
    };

    const rowSelection = {
        selectedKey,
        onChange: onChangeNew,
    };

    const handleUncheckRadio = () => {
        setSelectedKey([]);
        dispatch(selectedNhanVien(null));
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [dataSource]);

    //Phân trang
    const handlePageChange = (page) => {
        setLoading(true);
        setCurrentPage(page);
        const PageNumber = page;
        const PageSize = 10;
        const data = { PageNumber, PageSize };
        dispatch(filterNhanVien(data))
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
        // console.log('pageChange: ', page);
    };

    return (
        <>
            <Spin spinning={loading} tip="Loading..." >
                <Table
                    tableLayout="auto"
                    bordered
                    size="small"
                    scroll={{
                        x: 2000,
                        // y: 4000,
                    }}
                    rowSelection={{
                        type: "radio",
                        ...rowSelection,
                        columnTitle: () => (
                            <Tooltip title="Bỏ chọn hàng hiện tại.">
                                <RedoOutlined onClick={handleUncheckRadio} />
                            </Tooltip>
                        ),
                    }}

                    columns={columns}
                    dataSource={dataSource.data?.map((nhanVien, index) => ({
                        index: index + 1,
                        id: nhanVien.id,
                        email: nhanVien.email,
                        hoVaTen: nhanVien.hoVaTen,
                        canCuocCongDan: nhanVien.canCuocCongDan,
                        chucVu: nhanVien.chucVu,
                        chucVuID: nhanVien.chucVuID,
                        tinhTrangLamViec: nhanVien.tinhTrangLamViec,
                        tinhTrangLamViecID: nhanVien.tinhTrangLamViecID,
                        ngayVaoCongTy: nhanVien.ngayVaoCongTy,
                        diaChiLienLac: nhanVien.diaChiLienLac,
                        soDienThoaiLienLac: nhanVien.soDienThoaiLienLac,
                        maSoThue: nhanVien.maSoThue,
                        soTaiKhoan: nhanVien.soTaiKhoan,
                        tenNganHang: nhanVien.tenNganHang,
                        soNguoiPhuThuoc: nhanVien.soNguoiPhuThuoc,
                        stt: index + 1,
                    }))}
                    rowKey="id"
                    pagination={false}
                />
            </Spin>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Pagination
                    current={currentPage}
                    total={dataSource?.pageCount * 10}
                    onChange={handlePageChange}
                />
            </div>
        </>
    );
}
export default QuanLyNVTable;