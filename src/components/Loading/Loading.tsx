import React from "react";
import LoadingSvg from "../../../public/assets/svgs/loading.svg";
import Logo from "../../../public/assets/svgs/main-icon.svg";

const Loading = () => {
  return (
    <div className="loading-bg">
      <div className="loading-icon">
        <Logo />
        <LoadingSvg />
      </div>
    </div>
  );
};

export default Loading;
