import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import RootLayout from "@pages/RootLayout.jsx";
import ModalProvider from "@context/ModalProvider";
import SearchPage from "@pages/SearchPage";

// Lazy import
const MovieDetail = lazy(() => import("@pages/MovieDetail.jsx"));
const TVShowDetail = lazy(() => import("@pages/TVShowDetail.jsx"));
const HomePage = lazy(() => import("@pages/HomePage.jsx"));
const PeoplePage = lazy(() => import("@pages/PeoplePage.jsx"));

const router = createHashRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/movie/:id",
                element: <MovieDetail />,
            },
            {
                path: "/tv/:id",
                element: <TVShowDetail />,
            },
            {
                path: "/people/:id",
                element: <PeoplePage />,
                // loader = hàm bất đồng bộ để chuẩn bị dữ liệu cho route. Chạy trước khi render component.
                // Kết hợp với useLoaderData() để lấy dữ liệu trong component.
                loader: async ({ params }) => {
                    const res = await fetch(
                        `https://api.themoviedb.org/3/person/${params.id}?append_to_response=combined_credits`,
                        {
                            headers: {
                                accept: "application/json",
                                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                            },
                        },
                    );
                    return res;
                },
            },
            {
                path: "/search",
                element: <SearchPage />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ModalProvider>
            <RouterProvider router={router} />
        </ModalProvider>
    </StrictMode>,
);
