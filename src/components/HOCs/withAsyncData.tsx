import React, { useEffect, useState } from "react";

const withAsyncData = (Component: React.FC<any>) => {
  return ({ traversalPath, animatePath, speed = 1, ...props }: any) => {
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
        }, 1000 / speed);
      } else {
        setWayPointsSecuential(traversalPath);
      }

      return () => clearInterval(interval);
    }, [traversalPath, animatePath]);

    return <Component {...props} traversalPath={wayPointsSecuential} />;
  };
};

export default withAsyncData;
