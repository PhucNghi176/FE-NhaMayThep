import useLuongCongNhatList from "../../hooks/useLuongCongNhatList/useLuongCongNhatList";
import ButtonQuanLyLuongCongNhat from "./ButtonQuanLyLuongCongNhat";
import FilterLuongCongNhat from "./FilterLuongCongNhat";
import LuongCongNhatTable from "./LuongCongNhatTable";
const LuongCongNhat = () => {
  const luongCongNhatList = useLuongCongNhatList();

  return (
    <div>
      <div className="searchContainer">
        <FilterLuongCongNhat />
      </div>

      <div className="tableContainer" style={{ marginTop: "10px" }}>
        <LuongCongNhatTable dataSource={luongCongNhatList} />
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
          <ButtonQuanLyLuongCongNhat />
        </div>
      </div>
    </div>
  );
};

export default LuongCongNhat;
