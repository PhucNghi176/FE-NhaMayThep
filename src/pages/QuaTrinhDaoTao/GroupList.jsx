import React from "react";
import SearchTable from "../../components/SearchTable/searchTable";
import GroupListTable from "../../components/GroupListTable/GroupListTable";
import CreateGroupModal from "../../components/CreateGroup/CreateGroupModal";
import AddNewInternModal from "../../components/AddNewIntern/AddNewInternModal";

const GroupList = () => {
  return (
    <div>
      <div className="searchContainer">
        <SearchTable />
      </div>

      <div className="tableContainer" style={{ marginTop: "10px" }}>
        <GroupListTable />
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
          <CreateGroupModal />
          <AddNewInternModal />
        </div>
      </div>
    </div>
  );
};

export default GroupList;
