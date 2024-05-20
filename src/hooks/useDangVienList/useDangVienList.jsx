import { useDispatch, useSelector } from "react-redux";
import { getListDangVien } from "../../redux/slices/dangVienSlice/dangVienSlice";
import { getListDangVienSelector } from "../../redux/selector";
import { useEffect } from "react";

const useDangVienList = () => {
    const dispatch = useDispatch();
    const dangVienList = useSelector(getListDangVienSelector);
    console.log("getDangVienSelector: ", dangVienList);

    useEffect(() => {
        const fetchDangVien = async () => {
            try {
                const PageNumber = 1;
                const PageSize = 10;
                const data = { PageNumber, PageSize };
                dispatch(getListDangVien(data));
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchDangVien();
        return () => {
        };
    }, [dispatch]);

    return dangVienList;
};

export default useDangVienList;