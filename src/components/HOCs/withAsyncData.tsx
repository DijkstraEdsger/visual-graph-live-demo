import React, { useEffect, useState } from "react";
import { VerticeType } from "types/graph";

const withAsyncData = (Component: React.FC<any>) => {
  return ({ traversalPath, animatePath, ...props }: any) => {
    const [wayPointsSecuential, setWayPointsSecuential] = useState<any>([]);

    useEffect(() => {
      let interval: NodeJS.Timeout;

      if (animatePath) {
        let counter = 1;
        interval = setInterval(() => {
          const newWayPoints = traversalPath?.slice(0, counter);
          setWayPointsSecuential(newWayPoints);
          counter += 1;

          if (newWayPoints?.length === traversalPath?.length) {
            clearInterval(interval);
          }
        }, 1000);
      } else {
        setWayPointsSecuential(traversalPath);
      }

      return () => clearInterval(interval);
    }, [traversalPath, animatePath]);

    return <Component {...props} traversalPath={wayPointsSecuential} />;
  };
};

export default withAsyncData;
