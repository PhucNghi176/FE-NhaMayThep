import ButtonGroup from "./ButtonQuanLyNhanVien";
import FilterNhanVien from "./FilterNhanVien";
import QuanLyNVTable from "./QuanLyNVTable";
import useNhanVienList from "../../hooks/useNhanVienList/useNhanVienList";

const QuanLyNhanVien = () => {
    const nhanVienList = useNhanVienList();
    return (
        <div>

            <div className="searchContainer">
                <FilterNhanVien/>
            </div>

            <div className="tableContainer" style={{ marginTop: "10px" }}>
                <QuanLyNVTable dataSource={nhanVienList} />
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
                <ButtonGroup/>
            </div>
        </div>
    )
}

export default QuanLyNhanVien;
