import NhanSuTable from "./NhanSuTable";
import ButtonQuanLyNhanSu from "./ButtonQuanLyNhanSu";
import useNhanSuList from "../../hooks/useNhanSuList/useNhanSuList";
import FilterNhanSu from "./FilterNhanSu";

const NhanSu = () => {
  const NhanSuList = useNhanSuList();
  return (
    <div>
      <div className="searchContainer">
        <FilterNhanSu />
      </div>

      <div className="tableContainer" style={{ marginTop: "10px" }}>
        <NhanSuTable dataSource={NhanSuList} />
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
          <ButtonQuanLyNhanSu />
        </div>
      </div>
    </div>
  );
};

export default NhanSu;
