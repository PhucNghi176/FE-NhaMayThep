import React from "react";
import SearchTable from "../../components/SearchTable/searchTable";
import BaoHiemTable from "../BaoHiem/BaoHiemTable";
import useBaoHiemList from "../../hooks/useBaoHiemList/useBaoHiemList";
import ButtonQuanLyBaoHiem from "./ButtonQuanLyBaoHiem";

const Insurance = () => {
  const baoHiemList = useBaoHiemList();
  return (
    <div>
      <div className="searchContainer">
        <SearchTable />
      </div>

      <div className="tableContainer" style={{ marginTop: "10px" }}>
        <BaoHiemTable dataSource={baoHiemList} />
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
          <ButtonQuanLyBaoHiem />
        </div>
      </div>
    </div>
  );
};

export default Insurance;
