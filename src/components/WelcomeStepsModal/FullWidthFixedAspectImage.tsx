import React from "react";

export const FullWidthFixedAspectImage: React.FC<{ aspect: number; src: string; alt: string }> = (props) => {
  // the aspect value should be calculated as 100 * h / w
  return (
    <div style={{ position: "relative", width: "100%", height: "auto", padding: `${props.aspect}% 0 0 0` }}>
      <img
        src={props.src}
        alt={props.alt}
        style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      />
    </div>
  );
};
