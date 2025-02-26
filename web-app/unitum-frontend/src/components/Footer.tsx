import React from "react";

interface FooterProps {
  isSidebarHidden: boolean;
}

const Footer: React.FC<FooterProps> = ({ isSidebarHidden }) => {
  return (
    <p 
    className={`footer ${
      isSidebarHidden ? "footer-sidebar-hidden" : ""
    }`}
    >
      © 2024 Sydney. All rights reserved.
    </p>
  );
};

export default Footer;
