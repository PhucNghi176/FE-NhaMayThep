import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Table, Pagination, Spin } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import Vietnamese locale
dayjs.locale("vi"); // Set the locale
import { getListDangVien, selectedDangVien } from "../../redux/slices/dangVienSlice/dangVienSlice";

const DangVienTable = ({ dataSource }) => {
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
            title: "Họ và Tên",
            dataIndex: "hoVaTen",
            key: "hoVaTen",
        },
        {
            title: "Đơn vị công tác",
            dataIndex: "donViCongTac",
            key: "donViCongTac",
        },
        {
            title: "Chức vụ Đảng",
            dataIndex: "chucVuDang",
            key: "chucVuDang",
        },
        {
            title: "Trình độ chính trị",
            dataIndex: "trinhDoChinhTri",
            key: "trinhDoChinhTri",
        },
        {
            title: "Ngày vào Đảng",
            dataIndex: "ngayVaoDang",
            key: "ngayVaoDang",
            render: (text, record) => {
                const entryDate = dayjs(text);
                const creationDate = dayjs(record.ngayVaoDang);
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
            title: "Cấp đảng viên",
            dataIndex: "capDangVien",
            key: "capDangVien",
        },
    ].filter(item => !item.hidden);

    const onChangeClick = (selectedRowKeys, selectedRows) => {
        setSelectedKey(selectedRowKeys);
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
        );
        dispatch(selectedDangVien(selectedRows));
    };

    const rowSelection = {
        selectedKey,
        onChange: onChangeClick,
    };

    const handleUncheckRadio = () => {
        setSelectedKey([]);
        dispatch(selectedDangVien(null));
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
        dispatch(getListDangVien(data))
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
                        x: 2200,
                        // y: 4000,
                    }}
                    rowSelection={{
                        type: "radio",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={dataSource.data?.map((dangVien, index) => ({
                        id: dangVien.id,
                        hoVaTen: dangVien.hoVaTen,
                        donViCongTac: dangVien.donViCongTac,
                        chucVuDang: dangVien.chucVuDang,
                        chucVuDangID: dangVien.chucVuDangID,
                        trinhDoChinhTri: dangVien.trinhDoChinhTri,
                        trinhDoChinhTriID: dangVien.trinhDoChinhTriID,
                        ngayVaoDang: dangVien.ngayVaoDang,
                        capDangVien: dangVien.capDangVien,
                        capDangVienID: dangVien.capDangVienID,
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
export default DangVienTable;