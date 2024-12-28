import React, { useEffect, useMemo, useState } from "react";
import type { DocumentGraph } from "contexts/graph-document-context";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  type ColDef,
  ModuleRegistry,
  RowClickedEvent,
  RowDoubleClickedEvent,
  RowSelectionOptions,
  Theme,
  themeQuartz,
} from "ag-grid-community";
import { dateToLocalString } from "utils/util-functions";
import NameCell from "./name-cell";
import classes from "./classes.module.scss";
import DeleteButton from "./delete-button";
import GearIcon from "components/Icon/Icons/GearIcon";
import { useAppDispatch } from "contexts/app-context/root/provider";
import { UIActionType } from "contexts/app-context/ui/types";

const HeaderComponentActions = () => (
  <div
    style={{
      height: 32,
      width: 32,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <GearIcon size="20px" />
  </div>
);

ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withParams({
  fontFamily: '"Roboto", sans-serif',
  backgroundColor: "transparent",
  foregroundColor: "var(--color-font-document-list-item-default)",
  headerTextColor: "var(--color-font-document-list-item-default)",
  headerBackgroundColor: "var(--color-background-document-list-item-default)",
  rowHoverColor: "var(--color-background-document-list-item-hover)",
  selectedRowBackgroundColor:
    "var(--color-background-document-list-item-selected)",
});

interface IRow {
  name: string;
  modifiedDate?: string;
  vertices?: number;
  edges?: number;
  actions?: any;
}

interface GraphDocumentListProps {
  documents: DocumentGraph[];
  onDocumentSelected?: (name: string) => void;
  onDocumentDoubleClick?: () => void;
}

const GraphDocumentList: React.FC<GraphDocumentListProps> = ({
  documents,
  onDocumentSelected,
  onDocumentDoubleClick,
}) => {
  const documentDispatch = useAppDispatch();
  const [rowData, setRowData] = useState<IRow[]>(
    documents.map((document) => ({
      ...document,
      modifiedDate: dateToLocalString(document.modifiedDate),
      vertices: document.data.vertices.length,
      edges: document.data.edges.length,
    }))
  );

  useEffect(() => {
    setRowData(
      documents.map((document) => ({
        ...document,
        modifiedDate: dateToLocalString(document.modifiedDate),
        vertices: document.data.vertices.length,
        edges: document.data.edges.length,
      }))
    );
  }, [documents]);

  const openConfirmDeleteModal = (documentName: string) => {
    console.log("open");

    documentDispatch({
      type: UIActionType.UI_OPEN_CONFIRM_DELETE_MODAL,
      payload: documentName,
    });
  };

  const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    {
      field: "name",
      cellRenderer: (props: any) => {
        return <NameCell name={props.value} />;
      },
      cellClass: classes.document_list__cell,
    },
    {
      field: "modifiedDate",
      cellClass: classes.document_list__cell,
      maxWidth: 200,
    },
    {
      field: "vertices",
      cellClass: classes.document_list__cell,
      maxWidth: 90,
    },
    {
      field: "edges",
      cellClass: classes.document_list__cell,
      maxWidth: 80,
    },
    {
      field: "actions",
      cellRenderer: (props: any) => (
        <DeleteButton
          documentName={props.data?.name}
          onClick={openConfirmDeleteModal}
        />
      ),
      cellClass: classes.document_list__cell_delete,
      maxWidth: 60,
      headerComponent: HeaderComponentActions,
      headerClass: classes.document_list__header_actions,
    },
  ]);

  const rowSelection = useMemo<
    RowSelectionOptions | "single" | "multiple"
  >(() => {
    return {
      mode: "singleRow",
      checkboxes: false,
      enableClickSelection: true,
    };
  }, []);

  const theme = useMemo<Theme | "legacy">(() => {
    return myTheme;
  }, []);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <div className={classes.document_list}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection={rowSelection}
        defaultColDef={defaultColDef}
        theme={theme}
        onRowClicked={(event: RowClickedEvent<any, any>) => {
          onDocumentSelected?.(event?.data?.name);
        }}
        onRowDoubleClicked={(event: RowDoubleClickedEvent<any, any>) => {
          onDocumentDoubleClick?.();
        }}
        rowClass={classes.document_list__row}
        noRowsOverlayComponent={() => <span>No documents to show</span>}
      />
    </div>
  );
};

export default GraphDocumentList;
