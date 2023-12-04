import { useEffect, useRef } from "react";

type DraggableDivProps = {
  children: React.ReactNode;
};

const Drag: React.FC<DraggableDivProps> = ({ children }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const div = divRef.current;

    const dragMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e: MouseEvent) => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      if (div) {
        div.style.top = `${div.offsetTop - pos2}px`;
        div.style.left = `${div.offsetLeft - pos1}px`;
      }
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    if (div) {
      div.onmousedown = dragMouseDown;
    }

    return () => {
      if (div) {
        div.onmousedown = null;
      }
      document.onmouseup = null;
      document.onmousemove = null;
    };
  }, []);

  return (
    <div id="mydiv" ref={divRef}>
      {children}
    </div>
  );
};

export default Drag;
