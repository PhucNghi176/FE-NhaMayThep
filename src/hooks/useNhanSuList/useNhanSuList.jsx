import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListNhanSuSelector } from "../../redux/selector";
import { filterNhanSu } from "../../redux/slices/nhanSuSlice/nhanSuSlice";

const useNhanSuList = () => {
  const dispatch = useDispatch();

  const nhanSuList = useSelector(getListNhanSuSelector);

  useEffect(() => {
    const fetchNhanSu = async () => {
      try {
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };
        dispatch(filterNhanSu(data));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchNhanSu();
    return () => {};
  }, [dispatch]);

  return nhanSuList;
};

export default useNhanSuList;
