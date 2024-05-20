import { useDispatch, useSelector } from "react-redux";
import { lichSuNghiPhepSelector } from "../../redux/selector";
import { useEffect } from "react";
import { getListNghiPhep } from "../../redux/slices/LichSuNghiPhepSlice/LichSuNghiPhepSlice";

const useLichSuNghiPhepList = () => {
    const dispatch = useDispatch();
    const nghiPhepList = useSelector(lichSuNghiPhepSelector);
    console.log("lichSuNghiPhepSelector: ", nghiPhepList);

    useEffect(() => {
        const fetchLichSuNghiPhep = async () => {
            try {
                const PageNumber = 1;
                const PageSize = 10;
                const data = { PageNumber, PageSize };
                dispatch(getListNghiPhep(data));
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchLichSuNghiPhep();
        return () => {
        };
    }, [dispatch]);

    return nghiPhepList;
};

export default useLichSuNghiPhepList;