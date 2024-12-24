import classes from "./classes.module.scss";
import SaveDocumentModal from "components/document/save-modal";
import OpenDocument from "components/document/open-modal";
import SaveConfirmExistsModal from "components/document/save-confirm-exists";
import WantToSave from "components/document/want-to-save";
import GraphPropertiesPanel from "./GraphPropertiesPanel";
import AlgorithmsParametersPanel from "./AlgorithmsParametersPanel";
import MainPanel from "./MainPanel";
import StatusBar from "./StatusBar";

const GraphPage = () => {
  return (
    <div className={classes["page-container"]}>
      <GraphPropertiesPanel />
      <MainPanel />
      <AlgorithmsParametersPanel />
      <StatusBar />
      <SaveDocumentModal />
      <SaveConfirmExistsModal />
      <OpenDocument />
      <WantToSave />
    </div>
  );
};

export default GraphPage;
