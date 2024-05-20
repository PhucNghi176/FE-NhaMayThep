import { useDispatch, useSelector } from "react-redux";
import { tangLuongSelector } from "../../redux/selector";
import { useEffect } from "react";
import { getListTangLuong } from "../../redux/slices/khaiBaoTangLuongSlice/khaiBaoTangLuongSlice";

const useKhaiBaoTangLuongList = () => {
    const dispatch = useDispatch();
    const tangLuongList = useSelector(tangLuongSelector);
    // console.log("tangLuongSelector: ", tangLuongList);

    useEffect(() => {
        const fetchKhaiBaoTangLuong = async () => {
            try {
                // const PageNumber = 1;
                // const PageSize = 10;
                // const data = { PageNumber, PageSize };
                dispatch(getListTangLuong());
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchKhaiBaoTangLuong();
        return () => {
        };
    }, [dispatch]);

    return tangLuongList;
};

export default useKhaiBaoTangLuongList;