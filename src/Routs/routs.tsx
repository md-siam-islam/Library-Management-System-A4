import {
  createBrowserRouter,
} from "react-router";

import { HomeLayout } from "@/Homelayout/homelayout";
import HomeSection from "@/HomeSection/HomeSectio";
import BookList from "@/Page/BookList";
import CreateBook from "@/Page/Createbook";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children:[
        {
            path: '/',
            element: <HomeSection/>
        },
        {
            path: '/books',
            element: <BookList></BookList>
            
        },
        {
            path: '/create-book',
            element: <CreateBook/>
        }
    ]
  },
]);

export default router

