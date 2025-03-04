import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo1.png";
import { Home } from "@material-ui/icons";
import { useSelector } from "react-redux";
import "./Sidebar.scss";
const Sidebar = () => {
  const sideBar = useRef();
  // const{toggleSidebar}=useSelector((state)=>state.userSharedSlice)
  // console.log(toggleSidebar)
  useEffect(() => {
    // if(toggleSidebar===true)
    // {
    //     sideBar.current.classList.add("widthSaidbar");
    //     console.log("ahmde"+sideBar.current.classList)
    // }else{
    //     sideBar.current.classList.remove("widthSaidbar")
    // }
  });
  // =============================| return |===============================
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {/* =============================== Logo ================================ */}
        <div className="sidebarMenu">
          {/* ----------logo---------- */}
          {/* <NavLink to="/" className="loogo"> */}
          <div className="loogo">
            <img className="loogo" src={logo} alt="logo" />
            <span className="lodgname"> Life</span>
          </div>
          {/* </NavLink> */}
          {/* =============================== Sidebar Links ================================ */}
          <ul className="sidebarList">
            {/* ----------home---------- */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "sidebarListItem active" : "sidebarListItem"
              }
            >
              Home
            </NavLink>
            {/* -------------- start Users--------------------- */}
            <li className="itemcontainsubmenue">
              <span className="homeIconUser">
                <i className="fa-solid fa-users"></i>
              </span>
              Users
              {/* ----Submenu Users---- */}
              <ul className="SubmenuUsers">
                {/*---- Doctor Links ----*/}
                <fieldset className="fieldset">
                  <div className="lineSubmenue"></div>
                  <div className="lineSubmenue"></div>
                  <legend className="legend1">Doctor</legend>
                  <NavLink
                    to="/pendingDoctors"
                    className="sidebarListItemsubMenue"
                  >
                    <i className="fa-solid fa-wheelchair p-1 me-1'"></i>
                    <span>Pending Doctors</span>
                  </NavLink>
                  <NavLink
                    to="/confirmedDoctors"
                    className="sidebarListItemsubMenue"
                  >
                    <i className="fa-solid fa-user-check p-1 me-1'"></i>
                    <span>Confirmed Doctors</span>
                  </NavLink>
                  <NavLink
                    to="/blockedDoctors"
                    className="sidebarListItemsubMenue"
                  >
                    <i className="fa-solid fa-user-large-slash p-1 me-1"></i>
                    <span>Blacklist Doctors</span>
                  </NavLink>
                </fieldset>
                {/*---- pharmacist links ----*/}
                <fieldset className="fieldset">
                  <div className="lineSubmenue2"></div>
                  <legend className="legend2">pharmacist</legend>
                  <NavLink
                    to="/pendingPharmacists"
                    className="sidebarListItemsubMenue"
                  >
                    <i className="fa-solid fa-wheelchair p-1 me-1'"></i>
                    <span> Pending pharmacist</span>
                  </NavLink>
                  <NavLink
                    to="/confirmedPharmacists"
                    className="sidebarListItemsubMenue"
                  >
                    <i className="fa-solid fa-user-check p-1 me-1'"></i>
                    <span>Confirmed pharmacist</span>
                  </NavLink>
                  <NavLink
                    to="/blockedPharmacists"
                    className="sidebarListItemsubMenue"
                  >
                    <i className="fa-solid fa-user-large-slash p-1 me-1"></i>
                    <span>Blacklist pharmacist</span>
                  </NavLink>
                </fieldset>
              </ul>
            </li>
            {/* -------------- End Users--------------------- */}
            {/* -------------- start Employees--------------------- */}
            <li className="itemcontainsubmenueEmployee">
              <span className="homeIconUser">
                <i className="fa-solid fa-users"></i>
              </span>
              Employee
              {/* ----Submenu Users---- */}
              <ul className="SubmenuUsersEmployee">
                {/*---- Flay Boy Links ----*/}
                <fieldset className="fieldsetEmployee">
                  <div className="lineSubmenueEmployee"></div>
                  <legend className="legend1">
                    <i className="fa-solid fa-user-doctor-hair"></i> Flay Boy
                  </legend>
                  <NavLink to="/flayBoyeList" className="sidebarListItem">
                    <i className="fa-solid fa-person-dolly"></i>
                    <span>Flay Boy List</span>
                  </NavLink>
                </fieldset>
                {/*---- Emloyee links ----*/}
                <fieldset className="fieldsetEmployee">
                  <div className="lineSubmenueEmployee"></div>
                  <legend className="legend2">Emloyee</legend>
                  <NavLink to="/casherList" className="sidebarListItem">
                    <i className="fa-solid fa-wheelchair p-1 me-1'"></i>
                    <span> Employee List</span>
                  </NavLink>
                </fieldset>
              </ul>
            </li>
            {/* -------------- End Users--------------------- */}
            <NavLink to="/analyses" className="sidebarListItem">
              <i className="fa-solid fa-chart-line"></i>
              <span> analyses</span>
            </NavLink>
            <hr />
            {/* -------------- product--------------------- */}
            <li className="itemcontainsubmenueProduct">
              <span className="homeIconUser">
                <i className="fa-brands fa-product-hunt"></i>
              </span>
              Product
              {/* ----Submenu Users---- */}
              <ul className="SubmenuUsersProduct">
                {/*---- Flay Boy Links ----*/}
                <fieldset className="fieldsetProduct">
                  <div className="lineSubmenueProduct"></div>
                  <NavLink to="/products" className="sidebarListItem">
                    <i className="fa-solid fa-person-dolly"></i>
                    <span>products</span>
                  </NavLink>
                  <NavLink to="/productForm" className="sidebarListItem">
                    <i className="fa-solid fa-person-dolly"></i>
                    <span>Add/Edit Product</span>
                  </NavLink>
                </fieldset>
                {/*---- Emloyee links ----*/}
              </ul>
            </li>

            <NavLink to="/categorey" className="sidebarListItem">
              <i className="fa-solid fa-person-dolly"></i>
              <span>catigores</span>
            </NavLink>
            <NavLink to="/brand" className="sidebarListItem">
              <i className="fa-solid fa-person-dolly"></i>
              <span>brands</span>
            </NavLink>
            <NavLink to="/orders" className="sidebarListItem">
              <i className="fa-solid fa-arrow-down-short-wide"></i>
              <span>Orders</span>
            </NavLink>
            <NavLink to="/supliers" className="sidebarListItem">
              <i className="fa-solid fa-arrow-down-short-wide"></i>
              <span>supliers</span>
            </NavLink>
            <NavLink to="/descount" className="sidebarListItem">
              <i className="fa-solid fa-tags"></i>
              <span>descount</span>
            </NavLink>
            <NavLink to="/stors" className="sidebarListItem">
              <i className="fa-solid fa-shop"></i>
              <span>stors</span>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
