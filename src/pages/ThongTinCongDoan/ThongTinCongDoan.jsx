import useThongTinCongDoanList from "../../hooks/useThongTinCongDoanList/useThongTinCongDoanList";
import ButtonQuanLyThongTinCongDoan from "./ButtonQuanLyThongTinCongDoan";
import FilterThongTinCongDoan from "./FilterThongTinCongDoan";
import ThongTinCongDoanTable from "./ThongTinCongDoanTable";

const ThongTinCongDoan = () => {
  const thongTinCongDoanList = useThongTinCongDoanList();
  return (
    <div>
      <div className="searchContainer">
        <FilterThongTinCongDoan />
      </div>

      <div className="tableContainer" style={{ marginTop: "10px" }}>
        <ThongTinCongDoanTable dataSource={thongTinCongDoanList} />
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
          <ButtonQuanLyThongTinCongDoan />
        </div>
      </div>
    </div>
  );
};

export default ThongTinCongDoan;
