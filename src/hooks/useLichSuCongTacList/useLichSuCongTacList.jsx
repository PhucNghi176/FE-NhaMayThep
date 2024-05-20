import { useDispatch, useSelector } from "react-redux";
import { lichSuCongTacSelector } from "../../redux/selector";
import { useEffect } from "react";
import { getListCongTac } from "../../redux/slices/lichSuCongTacSlice/lichSuCongTacSlice";

const useLichSuCongTacList = () => {
    const dispatch = useDispatch();
    const congTacList = useSelector(lichSuCongTacSelector);
    console.log("lichSuCongTacSelector: ", congTacList);

    useEffect(() => {
        const fetchLichSuCongTac = async () => {
            try {
                const PageNumber = 1;
                const PageSize = 10;
                const data = { PageNumber, PageSize };
                dispatch(getListCongTac(data));
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchLichSuCongTac();
        return () => {
        };
    }, [dispatch]);

    return congTacList;
};

export default useLichSuCongTacList;