import {
  createBrowserRouter,
} from "react-router";

import { HomeLayout } from "@/Homelayout/homelayout";
import HomeSection from "@/HomeSection/HomeSectio";
import BookList from "@/Page/BookList";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children:[
        {
            path: "/",
            element : <HomeSection/>
        },
        {
            path: '/books',
            element: <BookList></BookList>
            
        }
    ]
  },
]);

export default router

