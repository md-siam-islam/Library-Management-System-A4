import {
  createBrowserRouter,
} from "react-router";

import { HomeLayout } from "@/Homelayout/homelayout";
import HomeSection from "@/HomeSection/HomeSectio";
import BookList from "@/Page/BookList";
import CreateBook from "@/Page/Createbook";
import Bookdetails from "@/Page/Bookdetails";


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
        },
        {
            path: "/books/:id",
            element: <Bookdetails/>
        }
    ]
  },
]);

export default router

