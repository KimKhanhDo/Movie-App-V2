import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Loading from "@/components/Loading";

function RootLayout() {
    return (
        <div>
            <Header />
            {/* For lazing loading */}
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
        </div>
    );
}
export default RootLayout;
