import React, { useState, useEffect } from "react";
import "./Sidebar.scss";
import HamburgerMenu from "../../../public/assets/svgs/hamburger-menu.svg";
import Cross from "../../../public/assets/svgs/cross.svg";
import Link from "next/link";
import BuyMeACoffeeButton from "../BuyMeACoffeeButton/BuyMeACoffeeButton";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.body.style.overflowY = isOpen ? "auto" : "hidden";
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
            <LinksContainer>
              <Link href="/">Home</Link>
            </LinksContainer>
            <LinksContainer>
              <Link href="/about-us">About</Link>
            </LinksContainer>
            <LinksContainer>
              <Link href="/whats-new">Whats New</Link>
            </LinksContainer>
            <LinksContainer>
              <Link href="/feature-request">Feature Request</Link>
            </LinksContainer>
            <LinksContainer>
              <Link href="/report-issue">Report issue</Link>
            </LinksContainer>
            <LinksContainer>
              <Link href="/info">Calculator Info</Link>
            </LinksContainer>
            <LinksContainer>
              <Link href="/error-reports">Error Reports</Link>
            </LinksContainer>
          </div>
          <BuyMeACoffeeButton />
        </div>
      </div>
      {isOpen && (
        <div className="loading-overlay" onClick={toggleSidebar}></div>
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
