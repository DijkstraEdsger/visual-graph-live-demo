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
    const [wayPointsSecuential, setWayPointsSecuential] = useState<any>([]);
    const [dfsTraversalSecuential, setDfsTraversalSecuential] = useState<any>(
      []
    );
    const appDispatch = useAppDispatch();

    useEffect(() => {
      if (wayPointsSecuential.length === 0) {
        appDispatch({
          type: AlgorithmActionType.SET_IS_ALGORITHM_SHOWING_RESULT,
          payload: true,
        });
      }

      if (wayPointsSecuential.length === traversalPath?.length) {
        appDispatch({
          type: AlgorithmActionType.SET_IS_ALGORITHM_SHOWING_RESULT,
          payload: false,
        });
      }
    }, [traversalPath, wayPointsSecuential, appDispatch]);

    useEffect(() => {
      if (dfsTraversalSecuential.length === 0) {
        appDispatch({
          type: AlgorithmActionType.SET_IS_ALGORITHM_SHOWING_RESULT,
          payload: true,
        });
      }

      if (dfsTraversalSecuential.length === dfsTraversal?.length) {
        appDispatch({
          type: AlgorithmActionType.SET_IS_ALGORITHM_SHOWING_RESULT,
          payload: false,
        });
      }
    }, [dfsTraversal, dfsTraversalSecuential, appDispatch]);

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

    useEffect(() => {
      let interval: NodeJS.Timeout;

      if (animatePath) {
        let counter = 1;
        interval = setInterval(() => {
          const newEdges = dfsTraversal?.slice(0, counter);
          setDfsTraversalSecuential(newEdges);
          counter += 1;

          if (newEdges?.length === dfsTraversal?.length) {
            clearInterval(interval);
          }
        }, 1000 / speed);
      } else {
        setDfsTraversalSecuential(dfsTraversal);
      }

      return () => clearInterval(interval);
    }, [dfsTraversal, animatePath]);

    return (
      <Component
        {...props}
        traversalPath={wayPointsSecuential}
        dfsTraversal={dfsTraversalSecuential}
      />
    );
  };

  WrappedComponent.displayName = `withAsyncData(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default withAsyncData;
