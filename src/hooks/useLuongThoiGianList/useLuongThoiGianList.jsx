import { useDispatch, useSelector } from "react-redux";
import { getListLuongThoiGianSelector } from "../../redux/selector";
import { useEffect } from "react";
import { filterLuongThoiGian } from "../../redux/slices/luongThoiGianSlice/luongThoiGianSlice";

const useLuongThoiGianList = () => {
  const dispatch = useDispatch();

  const luongThoiGianList = useSelector(getListLuongThoiGianSelector);

  useEffect(() => {
    const fecthLuongThoiGian = async () => {
      try {
        const PageNo = 1;
        const PageSize = 10;
        const data = { PageNo, PageSize };
        dispatch(filterLuongThoiGian(data));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fecthLuongThoiGian();
    return () => {};
  }, [dispatch]);

  return luongThoiGianList;
};

export default useLuongThoiGianList;
