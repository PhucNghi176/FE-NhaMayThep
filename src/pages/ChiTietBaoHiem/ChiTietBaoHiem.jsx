import SearchTable from "../../components/SearchTable/searchTable";
import useChiTietBaoHiemList from "../../hooks/useChiTietBaoHiemList/useChiTietBaoHiemList";
import ButtonQuanLyChiTietBaoHiem from "./ButtonQuanLyChiTietBaoHiem";
import ChiTietBaoHiemTable from "./ChiTietBaoHiemTable";
import FilterChiTietBaoHiem from "./FilterChiTietBaoHiem";

const ChiTietBaoHiem = () => {
  const chiTietBaoHiemList = useChiTietBaoHiemList();
  return (
    <div>
      <div className="searchContainer">
        <FilterChiTietBaoHiem />
      </div>

      <div className="tableContainer" style={{ marginTop: "10px" }}>
        <ChiTietBaoHiemTable dataSource={chiTietBaoHiemList} />
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
        <div
          style={{
            display: "flex",
          }}
        >
          <ButtonQuanLyChiTietBaoHiem />
        </div>
      </div>
    </div>
  );
};

export default ChiTietBaoHiem;
