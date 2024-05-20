import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListKhenThuongSelector } from "../../redux/selector";
import {
  filterKhenThuong,
  getListKhenThuong,
} from "../../redux/slices/khenThuongSlice/khenThuongSlice";

const useKhenThuongList = () => {
  const dispatch = useDispatch();

  const khenThuongList = useSelector(getListKhenThuongSelector);

  useEffect(() => {
    const fetchKhenThuong = async () => {
      try {
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };
        dispatch(filterKhenThuong(data));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchKhenThuong();
    return () => {};
  }, [dispatch]);

  return khenThuongList;
};

export default useKhenThuongList;
