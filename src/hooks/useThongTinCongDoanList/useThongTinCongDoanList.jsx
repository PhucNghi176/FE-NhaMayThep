import { useDispatch, useSelector } from "react-redux";
import { getListThongTinCongDoanSelector } from "../../redux/selector";
import { useEffect } from "react";
import {
  filterThongTinCongDoan,
  getListThongTinCongDoan,
} from "../../redux/slices/thongTinCongDoanSlice/thongTinCongDoanSlice";

const useThongTinCongDoanList = () => {
  const dispatch = useDispatch();

  const thongTinCongDoanList = useSelector(getListThongTinCongDoanSelector);

  useEffect(() => {
    const fecthThongTinCongDoan = async () => {
      try {
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };
        dispatch(filterThongTinCongDoan(data));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fecthThongTinCongDoan();
    return () => {};
  }, [dispatch]);

  return thongTinCongDoanList;
};

export default useThongTinCongDoanList;
