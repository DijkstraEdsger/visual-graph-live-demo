import React from "react";
import Button from "components/Button/Button";

interface PrimProps {
  onRun: () => void;
  onClean?: () => void;
}

const Prim: React.FC<PrimProps> = ({ onRun, onClean = () => {} }) => {
  return (
    <div>
      <Button onClick={onRun}>Run</Button>
      <Button onClick={onClean}>Clean</Button>
    </div>
  );
};

export default Prim;
