import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Table, Pagination, Spin } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import Vietnamese locale
dayjs.locale("vi"); // Set the locale
import { selectedTangLuong } from "../../redux/slices/khaiBaoTangLuongSlice/khaiBaoTangLuongSlice";

const TableTangLuong = ({ dataSource }) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedKey, setSelectedKey] = useState([]);

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
            title: "Mã số nhân viên",
            dataIndex: "maSoNhanVien",
            key: "maSoNhanVien",
        },
        {
            title: "Tên nhân viên",
            dataIndex: "tenNhanVien",
            key: "tenNhanVien",
        },
        {
            title: "Phần trăm tăng",
            dataIndex: "phanTramTang",
            key: "phanTramTang",
        },
        {
            title: "Ngày áp dụng",
            dataIndex: "ngayApDung",
            key: "ngayApDung",
            render: (text, record) => {
                const entryDate = dayjs(text);
                const creationDate = dayjs(record.ngayBatDau);
                const formattedDateTime = entryDate.format('DD/MM/YYYY');
                return (
                    <div>
                        {formattedDateTime}
                        {/* <span> - {creationDate.format('HH:mm:ss')}</span> */}
                    </div>
                );
            },
        },
        {
            title: "Lý do",
            dataIndex: "lyDo",
            key: "lyDo",
        },
    ].filter(item => !item.hidden);

    const onChangeClick = (selectedRowKeys, selectedRows) => {
        setSelectedKey(selectedRowKeys);
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
        );
        dispatch(selectedTangLuong(selectedRows));
    };

    const rowSelection = {
        selectedKey,
        onChange: onChangeClick,
    };

    // const handleUncheckRadio = () => {
    //     setSelectedKey([]);
    //     dispatch(selectedDangVien(null));
    // };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [dataSource]);

    //Phân trang
    // const handlePageChange = (page) => {
    //     setLoading(true);
    //     setCurrentPage(page);
    //     const PageNumber = page;
    //     const PageSize = 10;
    //     const data = { PageNumber, PageSize };
    //     dispatch(getListNghiPhep(data))
    //         .then(() => {
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //             setLoading(false);
    //         });
    // };

    console.log("dataSource: ", dataSource)

    return (
        <>
            <Spin spinning={loading} tip="Loading..." >
                <Table
                    tableLayout="auto"
                    bordered
                    size="small"
                    scroll={{
                        x: 300,
                        // y: 4000,
                    }}
                    rowSelection={{
                        type: "radio",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={dataSource?.map((tangLuong, index) => ({
                        id: tangLuong.id,
                        maSoNhanVien: tangLuong.maSoNhanVien,
                        phanTramTang:tangLuong.phanTramTang,
                        ngayApDung: tangLuong.ngayApDung,
                        lyDo: tangLuong.lyDo,
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
                    //onChange={handlePageChange}
                />
            </div>
        </>
    );
}
export default TableTangLuong;