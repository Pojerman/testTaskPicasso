import {Route, Routes} from "react-router-dom";
import {AppRoutes} from "../shared/types/route";
import Main from "../pages/main/main";
import HistoryRoute from "../shared/routing/history-route";
import browserHistory from "../browser-history";
import DetailCard from "../pages/detail-card/detail-card";

export default function App() {
    return(
        <HistoryRoute history={browserHistory}>
            <Routes>
                <Route path={AppRoutes.Main} element={<Main />}></Route>
                <Route path={AppRoutes.POST_DETAILS} element={<DetailCard />}></Route>
            </Routes>
        </HistoryRoute>
    )
}
