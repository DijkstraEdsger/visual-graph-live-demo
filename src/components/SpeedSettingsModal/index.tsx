import React, { useId, useState } from "react";
import Button from "components/Button/Button";
import Modal from "components/modal";
import {
  useAppDispatch,
  useAppState,
} from "contexts/app-context/root/provider";
import { UIActionType } from "contexts/app-context/ui/types";
import classes from "./classes.module.scss";
import { SettingsActionType } from "contexts/app-context/settings/types";
import Slider from "components/Slider";

const SpeedSettingsModal: React.FC = () => {
  const {
    ui: { transitionSpeedSetting },
    settings: { transitionSpeed },
  } = useAppState();
  const dispatch = useAppDispatch();
  const [selectedSpeed, setSelectedSpeed] = useState<number>(
    transitionSpeed.speed
  );
  const id = useId();
  const speedLabels = ["No", "Slow", "Medium", "Fast", "Very Fast"];
  const speedValues = [0, 1, 2, 3, 6];

  const cancelHandler = () => {
    dispatch({ type: UIActionType.UI_CLOSE_TRANSITION_SPEED_SETTING_MODAL });
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSpeed(parseInt(event.target.value));
  };

  const saveHandler = async () => {
    dispatch({
      type: SettingsActionType.SET_TRANSITION_SPEED,
      payload: speedValues[selectedSpeed],
    });
    dispatch({ type: UIActionType.UI_CLOSE_TRANSITION_SPEED_SETTING_MODAL });
  };

  return (
    <Modal
      title="Transition speed setting"
      isOpen={transitionSpeedSetting?.isOpen}
      onClose={cancelHandler}
      maxWidth={460}
    >
      <div
        style={{
          width: `${
            ((speedLabels.length * 2 - 2) / (speedLabels.length * 2)) * 100
          }%`,
          margin: "auto",
        }}
      >
        <Slider
          id={id}
          min="0"
          max={speedValues.length - 1}
          step="1"
          value={selectedSpeed}
          onChange={onChangeHandler}
        />
      </div>

      <div
        className={classes.speed_labels}
        style={{
          gridTemplateColumns: `repeat(${speedLabels.length}, 1fr)`,
        }}
      >
        {speedLabels.map((label, index) => (
          <span
            key={index}
            style={{
              color:
                selectedSpeed === speedValues[index]
                  ? "var(--color-font-slider-label-selected)"
                  : "inherit",
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <div className={classes.actions}>
        <Button onClick={saveHandler} className={classes.actions__save}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default SpeedSettingsModal;
