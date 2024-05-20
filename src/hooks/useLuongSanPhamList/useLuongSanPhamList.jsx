import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListLuongSanPhamSelector } from "../../redux/selector";
import { filterLuongSanPham } from "../../redux/slices/luongSanPhamSlice/luongSanPhamSlice";

const useLuongSanPhamList = () => {
  const dispatch = useDispatch();

  const luongSanPhamList = useSelector(getListLuongSanPhamSelector);

  useEffect(() => {
    const fecthLuongSanPham = async () => {
      try {
        const PageNo = 1;
        const PageSize = 10;
        const data = { PageNo, PageSize };
        dispatch(filterLuongSanPham(data));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fecthLuongSanPham();
    return () => {};
  }, [dispatch]);

  return luongSanPhamList;
};

export default useLuongSanPhamList;
