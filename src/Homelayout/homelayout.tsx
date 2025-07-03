import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router";

export function HomeLayout() {
  return (
    <div>
        <Navbar></Navbar>
     <div className='min-h-[calc(100vh-116px)]'>
        <Outlet></Outlet>
    </div>
    <Footer/>
    </div>
  );
}