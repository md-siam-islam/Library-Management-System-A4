import {
  createBrowserRouter,
} from "react-router";

import { HomeLayout } from "@/Homelayout/homelayout";
import HomeSection from "@/HomeSection/HomeSectio";
import BookList from "@/Page/BookList";
import CreateBook from "@/Page/Createbook";
import Bookdetails from "@/Page/Bookdetails";
import BorrowBookPage from "@/Page/BorrowBookPage";
import BorrowSummary from "@/Page/BorrowBooksummery";
import EditBookPage from "@/Page/EditBookPage";


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
        },
        {
            path : "/borrow/:bookId",
            element : <BorrowBookPage/>
            
        },
        {
            path : "/borrow-summary",
            element : <BorrowSummary/>
        },
        {
            path : "/edit-book/:id",
            element : <EditBookPage/>
        }
    ]
  },
]);

export default router

