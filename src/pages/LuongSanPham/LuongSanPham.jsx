import useLuongSanPhamList from "../../hooks/useLuongSanPhamList/useLuongSanPhamList";
import ButtonQuanLyLuongSanPham from "./ButtonQuanLyLuongSanPham";
import FilterLuongSanPham from "./FilterLuongSanPham";
import { LuongSanPhamTable } from "./LuongSanPhamTable";

const LuongSanPham = () => {
  const luongSanPhamList = useLuongSanPhamList();

  return (
    <div>
      <div className="searchContainer">
        <FilterLuongSanPham />
      </div>

      <div className="tableContainer" style={{ marginTop: "10px" }}>
        <LuongSanPhamTable dataSource={luongSanPhamList} />
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
          <ButtonQuanLyLuongSanPham />
        </div>
      </div>
    </div>
  );
};

export default LuongSanPham;
