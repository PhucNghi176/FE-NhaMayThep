import DangVienTable from "./DangVienTable";
import useDangVienList from "../../hooks/useDangVienList/useDangVienList";
import FilterDangVien from "./FilterDangVien";
import ButtonQuanLyDangVien from "./ButtonQuanLyDangVien";

const QuanLyDangVien = () => {
    const dangVienList = useDangVienList();
    return (
        <div>

            <div className="searchContainer">
                <FilterDangVien/>
            </div>

            <div className="tableContainer" style={{ marginTop: "10px" }}>
                <DangVienTable dataSource={dangVienList}/>
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
                <ButtonQuanLyDangVien/>
            </div>
        </div>
    )
}

export default QuanLyDangVien;