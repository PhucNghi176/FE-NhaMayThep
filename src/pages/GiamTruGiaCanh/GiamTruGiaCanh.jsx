import React from "react";
import GiamTruGiaCanhTable from "./GiamTruGiaCanhTable";
import ButtonGiamTruGiaCanh from "./ButtonGiamTruGiaCanh";
import FilterGiamTruGiaCanh from "./FilterGiamTruGiaCanh";

const GiamTruGiaCanh = () => {
  return (
    <div>
      <FilterGiamTruGiaCanh/>
      <GiamTruGiaCanhTable />
      <ButtonGiamTruGiaCanh/>
    </div>
  );
};

export default GiamTruGiaCanh;
