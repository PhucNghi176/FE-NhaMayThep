import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListBaoHiemSelector } from "../../redux/selector";
/* import { getListBaoHiem } from "../../redux/slices/BaoHiemSlice/BaoHiemSlice"; */

const useBaoHiemList = () => {
  const dispatch = useDispatch();

  const baoHiemList = useSelector(getListBaoHiemSelector);

  useEffect(() => {
    const fecthBaoHiem = async () => {
      try {
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };
        dispatch(getListBaoHiem(data));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fecthBaoHiem();
    return () => {};
  }, [dispatch]);

  return baoHiemList;
};

export default useBaoHiemList;
