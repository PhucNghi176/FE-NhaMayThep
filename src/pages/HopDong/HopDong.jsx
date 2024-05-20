import React from "react";

import HopDongTable from "./HopDongTable";
import ButtonHopDong from "./ButtonHopDong";
import FilterHopDong from "./FilterHopDong";

const HopDong = () => {

  return (
    <div>
      <FilterHopDong/>
      <HopDongTable/>
      <ButtonHopDong/>
    </div>
  );
};

export default HopDong;
