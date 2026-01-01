import React from "react";

// const UserWatermark = ({ text }) => {
//   console.log(text, "text");
//   if (!text) return null;

//   return <div className="user-watermark">{text}</div>;
// };

// export default UserWatermark;
import { useEffect, useRef } from "react";

const UserWatermark = ({ text }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const move = () => {
      const x = Math.random() * 80 + 10;
      const y = Math.random() * 80 + 10;

      ref.current.style.top = `${y}%`;
      ref.current.style.left = `${x}%`;
    };

    move();
    const interval = setInterval(move, 8000);

    return () => clearInterval(interval);
  }, []);

  if (!text) return null;

  return (
    <div ref={ref} className="user-watermark">
      {text}
    </div>
  );
};

export default UserWatermark;
