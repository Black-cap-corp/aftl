import React, { useEffect, useState } from "react";
import "./Card.css";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { FileEarmarkX, PencilSquare } from "react-bootstrap-icons";
import Project from "./Project";

const Card = ({
  content,
  onEdit,
  onDelete,
  child,
  isSingleChild,
  selectedId,
  onSelected,
  colorClass,
}) => {
  const [selected, setSelected] = useState(() => {
    if (selectedId && selectedId === content.id) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (selectedId && selectedId === content.id) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedId]);

  return (
    <div className={`outer-container ${isSingleChild ? "single-child" : ""}`}>
      <div
        className={`custom-card
         ${
           selected
             ? content[child]?.length > 1
               ? "selected"
               : "single-child__selector"
             : ""
         } ${colorClass} `}
        onClick={onSelected}
      >
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{content.name}</Tooltip>}
        >
          <div className="body">{content.name}</div>
        </OverlayTrigger>
        <div className="actions-center">
          <div className="action-btn btn-edit">
            <PencilSquare
              color="green"
              style={{ cursor: "pointer" }}
              onClick={onEdit}
            />
          </div>
          <div className="action-btn btn-del">
            <FileEarmarkX
              color="lightcoral"
              style={{ cursor: "pointer" }}
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
      <div className="children">
        {selected && <Project data={content[child]} type={child} />}
      </div>
    </div>
  );
};

export default Card;
