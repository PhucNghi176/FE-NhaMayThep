import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Table, Pagination, Spin } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import Vietnamese locale
dayjs.locale("vi"); // Set the locale
import { getListCongTac, selectedCongTac } from "../../redux/slices/lichSuCongTacSlice/lichSuCongTacSlice";
const TableLichSuCongTac = ({ dataSource }) => {
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
            dataIndex: "hoVaTen",
            key: "hoVaTen",
        },
        {
            title: "Tên loại công tác",
            dataIndex: "loaiCongTac",
            key: "loaiCongTac",
        },
        {
            title: "Ngày bắt đầu công tác",
            dataIndex: "ngayBatDau",
            key: "ngayBatDau",
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
            title: "Ngày kết thúc công tác",
            dataIndex: "ngayKetThuc",
            key: "ngayKetThuc",
            render: (text, record) => {
                const entryDate = dayjs(text);
                const creationDate = dayjs(record.ngayKetThuc);
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
            title: "Nơi công tác",
            dataIndex: "noiCongTac",
            key: "noiCongTac",
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
        dispatch(selectedCongTac(selectedRows));
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
    const handlePageChange = (page) => {
        setLoading(true);
        setCurrentPage(page);
        const PageNumber = page;
        const PageSize = 10;
        const data = { PageNumber, PageSize };
        dispatch(getListCongTac(data))
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    // console.log("data: ", dataSource.data[0].loaiCongTac.id);

    return (
        <>
            <Spin spinning={loading} tip="Loading..." >
                <Table
                    tableLayout="auto"
                    bordered
                    size="small"
                    scroll={{
                        x: 1000,
                        // y: 4000,
                    }}
                    rowSelection={{
                        type: "radio",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={dataSource.data?.map((congTac, index) => ({
                        id: congTac.id,
                        maSoNhanVien: congTac.maSoNhanVien,
                        hoVaTen: congTac.hoVaTen,
                        loaiCongTacID: congTac.loaiCongTacID,
                        loaiCongTac: congTac.loaiCongTac,
                        ngayBatDau: congTac.ngayBatDau,
                        ngayKetThuc: congTac.ngayKetThuc,
                        noiCongTac: congTac.noiCongTac,
                        lyDo: congTac.lyDo,
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
export default TableLichSuCongTac;