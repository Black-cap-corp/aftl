import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const IssueVerticalTimeline = ({ history = [] }) => {
  return (
    <VerticalTimeline lineColor="#000">
      {history &&
        history.map((his) => (
          <VerticalTimelineElement
            key={his?.who}
            className="vertical-timeline-element--education vertical-timeline-element"
            contentStyle={{
              background: "rgb(33, 150, 243)",
              color: "#000",
              borderTopColor: "#000",
              borderTopWidth: "5px",
              backgroundColor: "#fff",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #fff" }}
            iconStyle={{ background: "#fff", color: "#000" }}
          >
            <h4 className="vertical-timeline-element-title">{his?.who}</h4>
            <h6 className="vertical-timeline-element-subtitle">{his?.when}</h6>
            <p>{his?.description}</p>
          </VerticalTimelineElement>
        ))}
    </VerticalTimeline>
  );
};

export default IssueVerticalTimeline;
