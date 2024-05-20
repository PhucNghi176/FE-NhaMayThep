import useKhaiBaoTangLuongList from "../../hooks/useKhaiBaoTangLuongList/useKhaiBaoTangLuongList";
import TableTangLuong from "./TableTangLuong";

const KhaiBaoTangLuong = () => {
    const tangLuongList = useKhaiBaoTangLuongList();
    return (
        <div>

            <div className="searchContainer">
                {/* <FilterLichSuNghiPhep /> */}
            </div>

            <div className="tableContainer" style={{ marginTop: "10px" }}>
                <TableTangLuong dataSource={tangLuongList} />
            </div>

            <div
                className="buttonContainer"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingRight: "5px",
                    paddingBottom: "10px",
                }}
            >
                {/* <ButtonLichSuNghiPhep/> */}
            </div>
        </div>
    )
}

export default KhaiBaoTangLuong;