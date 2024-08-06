import React, { useState, useEffect } from "react";
import "./Sidebar.scss";
import HamburgerMenu from "../../../public/assets/svgs/hamburger-menu.svg";
import Cross from "../../../public/assets/svgs/cross.svg";
import Link from "next/link";
import BuyMeACoffeeButton from "../BuyMeACoffeeButton/BuyMeACoffeeButton";
import DropDownSvg from "../../../public/assets/svgs/dropdown-outline.svg";
import { dropdownLinks, sidebarLinks } from "./data";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.body.style.overflowY = isOpen ? "auto" : "hidden";
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.body.style.overflowY = "auto";
  }, []);

  return (
    <div>
      <button
        aria-label="open sidebar"
        onClick={toggleSidebar}
        className="open-sidebar-button"
      >
        <HamburgerMenu />
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="container">
          <button onClick={toggleSidebar} className="close-sidebar-button">
            <Cross />
          </button>
          <div className="sidebar-content">
            {sidebarLinks.map((link, index) => (
              <div key={index}>
                <LinksContainer key={index}>
                  <Link href={link.href} onClick={closeSidebar}>
                    {link.label}
                  </Link>
                </LinksContainer>
                {index == 1 && <DropDownMenu closeSidebar={closeSidebar} />}
              </div>
            ))}
          </div>
          <BuyMeACoffeeButton />
        </div>
      </div>

      {isOpen && (
        <div className="sidebar-loading-overlay" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default Sidebar;

type LinksContainerProps = {
  children: React.ReactNode;
};
const LinksContainer = ({ children }: LinksContainerProps) => {
  return <div className="link">{children}</div>;
};

type DropDownMenuProps = {
  closeSidebar: () => void;
};
const DropDownMenu = ({ closeSidebar }: DropDownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleMenu} id="dropdown-toggle">
        <p>Calculators</p>
        <span className={isOpen ? "open" : ""}>
          <DropDownSvg />
        </span>
      </button>
      <div className="dropdown-container">
        <div
          className={`dropdown-animation ${isOpen ? "slide-in" : "slide-out"}`}
        >
          <div className="dropdown-menu">
            {dropdownLinks.map((link, index) => (
              <LinksContainer key={index}>
                <Link
                  className="dropdown-menu-links"
                  href={link.href}
                  onClick={closeSidebar}
                >
                  {link.label}
                </Link>
              </LinksContainer>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
