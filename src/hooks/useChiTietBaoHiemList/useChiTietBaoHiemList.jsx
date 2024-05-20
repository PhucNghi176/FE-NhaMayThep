import { useDispatch, useSelector } from "react-redux";
import { getListChiTietBaoHiemSelector } from "../../redux/selector";
import { useEffect } from "react";
import {
  filterChiTietBaoHiem,
  getListChiTietBaoHiem,
} from "../../redux/slices/chiTietBaoHiemSlice/chiTietBaoHiemSlice";

const useChiTietBaoHiemList = () => {
  const dispatch = useDispatch();

  const chiTietBaoHiemList = useSelector(getListChiTietBaoHiemSelector);

  useEffect(() => {
    const fecthChiTietBaoHiem = async () => {
      try {
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };
        dispatch(filterChiTietBaoHiem(data));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fecthChiTietBaoHiem();
    return () => {};
  }, [dispatch]);

  return chiTietBaoHiemList;
};

export default useChiTietBaoHiemList;
