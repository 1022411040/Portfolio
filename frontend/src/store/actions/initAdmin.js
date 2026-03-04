import ApiClient from "../../Common/axios";
import SummaryApi from "../../common/SummaryApi";
import { setAdmin, clearAuth, setLoading } from "../slices/adminSlice";

export const initAdmin = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      dispatch(clearAuth());
      return;
    }

    const { url, method } = SummaryApi.adminMe;
    const res = await ApiClient({ url, method });

    if (res.data?.data) {
      dispatch(setAdmin(res.data.data));
    } else {
      dispatch(clearAuth());
    }
  } catch {
    dispatch(clearAuth());
  }
};
