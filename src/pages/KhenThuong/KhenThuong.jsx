import React from "react";
import useKhenThuongList from "../../hooks/useKhenThuongList/useKhenThuongList";
import KhenThuongTable from "./KhenThuongTable";
import ButtonQuanLyKhenThuong from "./ButtonQuanLyKhenThuong";
import FilterKhenThuong from "./FilterKhenThuong";

const KhenThuong = () => {
  const khenThuongList = useKhenThuongList();
  return (
    <div>
      <div className="searchContainer">
        <FilterKhenThuong />
      </div>

      <div className="tableContainer" style={{ marginTop: "10px" }}>
        <KhenThuongTable dataSource={khenThuongList} />
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
          <ButtonQuanLyKhenThuong />
        </div>
      </div>
    </div>
  );
};

export default KhenThuong;
