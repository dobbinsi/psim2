import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

type DraggableProps = {
  id: string;
  styles?: React.CSSProperties;
  name?: string;
  logo?: string;
  power: string;
  draggingColor?: string;
};

export function Draggable(props: DraggableProps) {
  const { id, styles, name, logo, power, draggingColor } = props;
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  const powerNumber = parseFloat(power);
  const powerDecimal = (powerNumber / Math.pow(10, 6)).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  return (
    <div
      ref={setNodeRef}
      style={
        draggingColor
          ? { ...style, color: draggingColor }
          : { ...style, ...styles }
      }
      className="draggable"
      {...listeners}
      {...attributes}
    >
      <div className="val-container">
        <div className="logo-box">
          <img src={logo} className="vlogo" alt="logo" />
          <h4>{name}</h4>
        </div>
        <div className="vinfo">
          <div className="vinfo-power">
            <h5>{powerDecimal}</h5>
            <h5 className="osmolabel">OSMO</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
