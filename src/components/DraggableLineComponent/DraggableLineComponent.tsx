import React, { useRef, useState } from "react";

const DraggableLineComponent = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [lineStart, setLineStart] = useState({ x: 0, y: 0 });
  const [lineEnd, setLineEnd] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    const rect = e.target.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    setLineStart({
      x: rect.left + rect.width / 2 - containerRect?.left!,
      y: rect.top + rect.height / 2 - containerRect?.top!,
    });
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    const containerRect = containerRef.current?.getBoundingClientRect();

    setLineEnd({
      x: e.clientX - containerRect!.left,
      y: e.clientY - containerRect!.top,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      // onMouseLeave={handleMouseUp}
      style={{
        width: 500,
        height: 500,
        backgroundColor: "red",
        position: "relative",
        // userSelect: "none",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 50,
          height: 50,
          backgroundColor: "green",
          top: 100,
          left: 100,
          zIndex: 1,
          borderRadius: "50%",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: 50,
          height: 50,
          backgroundColor: "green",
          top: 200,
          left: 200,
          zIndex: 1,
          borderRadius: "50%",
        }}
      ></div>
      <svg
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <line
          x1={lineStart.x}
          y1={lineStart.y}
          x2={lineEnd.x}
          y2={lineEnd.y}
          stroke="black"
        />
      </svg>
    </div>
  );
};

export default DraggableLineComponent;
