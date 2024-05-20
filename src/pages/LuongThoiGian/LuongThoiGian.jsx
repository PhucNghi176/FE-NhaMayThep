import useLuongThoiGianList from "../../hooks/useLuongThoiGianList/useLuongThoiGianList";
import ButtonQuanLyLuongThoiGian from "./ButtonQuanLyLuongThoiGian";
import FilterLuongThoiGian from "./FilterLuongThoiGian";
import LuongThoiGianTable from "./LuongThoiGianTable";

const LuongThoiGian = () => {
  const luongThoiGianList = useLuongThoiGianList();

  return (
    <div>
      <div className="searchContainer">
        <FilterLuongThoiGian />
      </div>

      <div className="tableContainer" style={{ marginTop: "10px" }}>
        <LuongThoiGianTable dataSource={luongThoiGianList} />
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
          <ButtonQuanLyLuongThoiGian />
        </div>
      </div>
    </div>
  );
};

export default LuongThoiGian;
