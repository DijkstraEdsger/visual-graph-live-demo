/* eslint-disable spellcheck/spell-checker */
import { Children, cloneElement, forwardRef, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import classes from "./classes.module.scss";
import { InitialPositionType, Position } from "types/graph";

type DraggableDivProps = {
  children: React.ReactNode;
  initialPosition?: InitialPositionType;
  onChangePosition?: (position: Position) => void;
};

const Drag = forwardRef<HTMLDivElement, DraggableDivProps>(
  ({ children, initialPosition, onChangePosition = () => {} }, ref) => {
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

      const dragMouseDownTouch = (e: TouchEvent) => {
        e.preventDefault();
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDragTouch;
      };

      const elementDragTouch = (e: TouchEvent) => {
        e.preventDefault();
        pos1 = pos3 - e.touches[0].clientX;
        pos2 = pos4 - e.touches[0].clientY;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        const parent = div?.parentElement;

        if (div && parent) {
          let newTop = div.offsetTop - pos2;
          let newLeft = div.offsetLeft - pos1;

          const minX = 0;
          const maxX = parent.offsetWidth - div.offsetWidth;
          const minY = 0;
          const maxY = parent.offsetHeight - div.offsetHeight;

          newTop = Math.max(Math.min(newTop, maxY), minY);
          newLeft = Math.max(Math.min(newLeft, maxX), minX);

          div.style.top = `${newTop}px`;
          div.style.left = `${newLeft}px`;
        }
      };

      const elementDrag = (e: MouseEvent) => {
        e.preventDefault();
        // Calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Assuming the parent of the div is its container
        const parent = div?.parentElement;
        if (div && parent) {
          // New position based on cursor movement
          let newTop = div.offsetTop - pos2;
          let newLeft = div.offsetLeft - pos1;

          // Container boundaries
          const minX = 0;
          const maxX = parent.offsetWidth - div.offsetWidth;
          const minY = 0;
          const maxY = parent.offsetHeight - div.offsetHeight;

          // Clamp newTop and newLeft within the container boundaries
          newTop = Math.max(Math.min(newTop, maxY), minY);
          newLeft = Math.max(Math.min(newLeft, maxX), minX);

          div.style.top = `${newTop}px`;
          div.style.left = `${newLeft}px`;
        }
      };

      const closeDragElement = () => {
        if (divRef.current) {
          onChangePosition({
            x: +divRef.current.style.left.split("px")[0],
            y: +divRef.current.style.top.split("px")[0],
          });
        }

        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
      };

      if (div) {
        div.onmousedown = dragMouseDown;
        div.ontouchstart = dragMouseDownTouch;
      }

      return () => {
        if (div) {
          div.onmousedown = null;
          div.ontouchstart = null;
        }
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
      };
    }, []);

    const updateInitialPosition = () => {
      if (divRef.current && initialPosition) {
        divRef.current.style.top = `${initialPosition.top}px`;
        divRef.current.style.left = `${initialPosition.left}px`;
      }
    };

    useEffect(() => {
      updateInitialPosition();
    }, [initialPosition?.top, initialPosition?.left]);

    const updatedChildren = Children.map(children, (child) => {
      return cloneElement(child as React.ReactElement, {
        ref,
      });
    });

    return (
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        className={classes.drag}
        ref={divRef}
      >
        {updatedChildren}
      </motion.div>
    );
  }
);

export default Drag;
