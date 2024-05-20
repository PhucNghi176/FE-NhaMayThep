import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListLuongCongNhatSelector } from "../../redux/selector";
import { filterLuongCongNhat } from "../../redux/slices/luongCongNhatSlice/luongCongNhatSlice";

const useLuongCongNhatList = () => {
  const dispatch = useDispatch();

  const luongCongNhatList = useSelector(getListLuongCongNhatSelector);

  useEffect(() => {
    const fecthLuongCongNhat = async () => {
      try {
        const PageNo = 1;
        const PageSize = 10;
        const data = { PageNo, PageSize };
        dispatch(filterLuongCongNhat(data));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fecthLuongCongNhat();
    return () => {};
  }, [dispatch]);

  return luongCongNhatList;
};

export default useLuongCongNhatList;
