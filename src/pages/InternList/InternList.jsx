import React from "react";
import SearchTable from "../../components/SearchTable/searchTable";
import InternListTable from "../../components/InternListTable/InternListTable";
import SendEmailModal from "../../components/SendEmail/SendEmailModal";

const InternList = () => {
  return (
    <div>
      <div className="searchContainer">
        <SearchTable />
      </div>

      <div className="tableContainer" style={{ marginTop: "10px" }}>
        <InternListTable />
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <SendEmailModal />
        </div>
      </div>
    </div>
  );
};

export default InternList;
