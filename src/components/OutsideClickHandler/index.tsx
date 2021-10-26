import React from "react";

import OutsideClickHandler from "react-outside-click-handler";

interface OutsideClickHandlerProps {
  children: React.ReactNode;
  onClickOutside: () => void;
}

function OutsideClickWrapper({
  children,
  onClickOutside,
}: OutsideClickHandlerProps) {
  return (
    <OutsideClickHandler onOutsideClick={onClickOutside} display="contents">
      {children}
    </OutsideClickHandler>
  );
}

export default OutsideClickWrapper;
