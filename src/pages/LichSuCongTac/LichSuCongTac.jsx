import useLichSuCongTacList from "../../hooks/useLichSuCongTacList/useLichSuCongTacList";
import TableLichSuCongTac from "./TableLichSuCongTac";
import ButtonLichSuCongTac from "./ButtonLichSuCongTac";
import FilterLichSuCongTac from "./FilterLichSuCongTac";
const LichSuCongTac = () => {
    const congTacList = useLichSuCongTacList();
    return (
        <div>

            <div className="searchContainer">
                <FilterLichSuCongTac />
            </div>

            <div className="tableContainer" style={{ marginTop: "10px" }}>
                <TableLichSuCongTac dataSource={congTacList} />
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
                <ButtonLichSuCongTac />
            </div>
        </div>
    )
}

export default LichSuCongTac;