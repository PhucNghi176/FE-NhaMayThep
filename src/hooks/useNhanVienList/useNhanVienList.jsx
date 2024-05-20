import { useDispatch, useSelector } from "react-redux";
import { filterNhanVien } from "../../redux/slices/nhanVienSlice/nhanVienSlice";
import { getListNhanVienSelector } from "../../redux/selector";
import { useEffect } from "react";

const useNhanVienList = () => {
    const dispatch = useDispatch();
    const nhanVienList = useSelector(getListNhanVienSelector);
    console.log("getNhanVienSelector: ", nhanVienList);

    useEffect(() => {
        const fetchNhanVien = async () => {
            try {
                const PageNumber = 1;
                const PageSize = 10;
                const data = { PageNumber, PageSize };
                dispatch(filterNhanVien(data));
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchNhanVien();
        return () => {
        };
    }, [dispatch]);

    return nhanVienList;
};

export default useNhanVienList;