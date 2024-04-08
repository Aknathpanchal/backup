import React from 'react'
import { useState } from 'react';
import { Outlet } from 'react-router-dom'
import Topbar from "../scenes/global/Topbar";
import SidebarMenu from "../scenes/global/Sidebar";

function Fixbar() {
    const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app">
    <SidebarMenu isSidebar={isSidebar} />
    <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      <Outlet/>
    </main>
  </div>
  )
}

export default Fixbar
