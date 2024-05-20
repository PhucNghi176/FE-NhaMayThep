import TableLichSuNghiPhep from "./TableLichSuNghiPhep";
import useLichSuNghiPhepList from "../../hooks/useLichSuNghiPhepList/useLichSuNghiPhepList";
import FilterLichSuNghiPhep from "./FilterLichSuNghiPhep";
import ButtonLichSuNghiPhep from "./ButtonLichSuNghiPhep";

const LichSuNghiPhep = () => {
    const nghiPhepList = useLichSuNghiPhepList();
    return (
        <div>

            <div className="searchContainer">
                <FilterLichSuNghiPhep />
            </div>

            <div className="tableContainer" style={{ marginTop: "10px" }}>
                <TableLichSuNghiPhep dataSource={nghiPhepList} />
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
                <ButtonLichSuNghiPhep/>
            </div>
        </div>
    )
}

export default LichSuNghiPhep;