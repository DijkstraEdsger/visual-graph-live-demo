import React from "react";
import Modal from "components/modal";
import classes from "./classes.module.scss";
import {
  useAppDispatch,
  useAppState,
} from "contexts/app-context/root/provider";
import { UIActionType } from "contexts/app-context/ui/types";
import { VERSION } from "version";

const AboutModal: React.FC = () => {
  const {
    ui: { aboutModal },
  } = useAppState();
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch({ type: UIActionType.UI_CLOSE_ABOUT_MODAL });
  };

  return (
    <Modal
      title="About Graph Builder"
      isOpen={aboutModal?.isOpen}
      onClose={closeHandler}
      maxWidth={700}
    >
      <p className={classes.about__description}>
        Welcome to Graph Builder, a dynamic and intuitive React-based
        application designed to bring your graph theory concepts to life. This
        tool empowers you to create custom graphs with nodes and edges,
        providing an interactive and user-friendly interface for your graph
        visualization needs.
      </p>
      <h3 className={classes.about__heading}>Key Features:</h3>
      <ul className={classes.about__list}>
        <li>
          <b>Custom Graph Creation:</b> Easily add and connect nodes and edges
          to build your unique graphs.
        </li>
        <li>
          <b>Interactive Interface:</b> Enjoy smooth transitions and an engaging
          user experience while exploring various graph structures.
        </li>
        <li>
          <b>Algorithmic Solutions:</b> Integrate and visualize solutions from
          popular graph theory libraries like Graphlib and Graphology.
        </li>
        <li>
          <b>Graph Persistence:</b> Save graphs directly in your browser using
          IndexedDB, and open them later for continued work.
        </li>
        <li>
          <b>File Operations:</b> Download graphs as text files for offline use,
          and upload/import graphs from text files.
        </li>
        <li>
          <b>Undo/Redo Operations:</b> Effortlessly reverse and reapply changes
          to your graphs, enhancing your editing experience.
        </li>
        <li>
          <b>Algorithm Execution:</b> Run and see the results of various graph
          theory algorithms to explore and understand graph behavior.
        </li>
        <li>
          <b>Theme Toggle:</b> Switch between light and dark modes to suit your
          preference and working conditions.
        </li>
      </ul>
      <h3 className={classes.about__heading}>Technologies Used:</h3>
      <ul className={classes.about__list}>
        <li>
          <b>React:</b> A powerful JavaScript library for building user
          interfaces.
        </li>
        <li>
          <b>Graphlib and Graphology:</b> Comprehensive libraries for handling
          graph theory algorithms and data structures.
        </li>
      </ul>
      <h3 className={classes.about__heading}>Author and Version:</h3>
      <ul className={classes.about__list}>
        <li>
          <b>Author:</b> Humberto Lázaro Martínez Morales
        </li>
        <li>
          <b>Version:</b> {VERSION}
        </li>
      </ul>
      <p className={classes.about__footer}>
        Thank you for using Graph Builder! We hope you find it exciting and
        useful.
      </p>
    </Modal>
  );
};

export default AboutModal;
