import React, { useEffect, useState } from "react";
import { useAppDispatch } from "contexts/app-context/root/provider";
import { AlgorithmActionType } from "contexts/app-context/algorithm/types";

const withAsyncData = (Component: React.FC<any>) => {
  const WrappedComponent = ({
    traversalPath,
    dfsTraversal,
    animatePath,
    speed = 1,
    ...props
  }: any) => {
    const [wayPointsSequential, setWayPointsSequential] = useState<any>([]);
    const [dfsTraversalSequential, setDfsTraversalSequential] = useState<any>(
      []
    );
    const appDispatch = useAppDispatch();

    useEffect(() => {
      if (wayPointsSequential.length === 0) {
        appDispatch({
          type: AlgorithmActionType.SET_IS_ALGORITHM_SHOWING_RESULT,
          payload: true,
        });
      }

      if (wayPointsSequential.length === traversalPath?.length) {
        appDispatch({
          type: AlgorithmActionType.SET_IS_ALGORITHM_SHOWING_RESULT,
          payload: false,
        });
      }
    }, [traversalPath, wayPointsSequential, appDispatch]);

    useEffect(() => {
      if (dfsTraversalSequential.length === 0) {
        appDispatch({
          type: AlgorithmActionType.SET_IS_ALGORITHM_SHOWING_RESULT,
          payload: true,
        });
      }

      if (dfsTraversalSequential.length === dfsTraversal?.length) {
        appDispatch({
          type: AlgorithmActionType.SET_IS_ALGORITHM_SHOWING_RESULT,
          payload: false,
        });
      }
    }, [dfsTraversal, dfsTraversalSequential, appDispatch]);

    useEffect(() => {
      let interval: NodeJS.Timeout;

      if (animatePath) {
        let counter = 1;
        interval = setInterval(() => {
          const newWayPoints = traversalPath?.slice(0, counter);
          setWayPointsSequential(newWayPoints);
          counter += 1;

          if (newWayPoints?.length === traversalPath?.length) {
            clearInterval(interval);
          }
        }, 1000 / speed);
      } else {
        setWayPointsSequential(traversalPath);
      }

      return () => clearInterval(interval);
    }, [traversalPath, animatePath]);

    useEffect(() => {
      let interval: NodeJS.Timeout;

      if (animatePath) {
        let counter = 1;
        interval = setInterval(() => {
          const newEdges = dfsTraversal?.slice(0, counter);
          setDfsTraversalSequential(newEdges);
          counter += 1;

          if (newEdges?.length === dfsTraversal?.length) {
            clearInterval(interval);
          }
        }, 1000 / speed);
      } else {
        setDfsTraversalSequential(dfsTraversal);
      }

      return () => clearInterval(interval);
    }, [dfsTraversal, animatePath]);

    return (
      <Component
        {...props}
        traversalPath={wayPointsSequential}
        dfsTraversal={dfsTraversalSequential}
      />
    );
  };

  WrappedComponent.displayName = `withAsyncData(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default withAsyncData;
