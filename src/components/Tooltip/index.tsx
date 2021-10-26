import React from "react";
import ReactTooltip from "react-tooltip";

type Place = "top" | "right" | "bottom" | "left";

interface CustomTooltipProps {
  id: string;
  children: React.ReactNode;
  place?: Place;
}

function Tooltip({ children, id, place = "top" }: CustomTooltipProps) {
  return (
    <>
      {children}
      <ReactTooltip
        id={id}
        place={place}
        backgroundColor="#8969B5"
        textColor="#FFFFFF"
      />
    </>
  );
}

export default Tooltip;
