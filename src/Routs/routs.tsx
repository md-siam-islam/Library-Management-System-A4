import {
  createBrowserRouter,
} from "react-router";

import { HomeLayout } from "@/Homelayout/homelayout";
import HomeSection from "@/HomeSection/HomeSectio";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children:[
        {
            path: "/",
            element : <HomeSection/>
        }
    ]
  },
]);

export default router

