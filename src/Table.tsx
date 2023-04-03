import React from 'react';
import { ReactGrid, Column, Row, CellChange, TextCell, Id, MenuOption, SelectionMode } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

interface Props {
  className?: string;
  features: Feature[];
  setFeatures: Function;
}

interface Feature {
  [key: string]: string;
}

const applyChangesToData = (
  changes: CellChange<TextCell>[],
  prevTableData: Feature[]
): Feature[] => {
  changes.forEach((change) => {
    const index = change.rowId as number;
    const fieldName = change.columnId;
    prevTableData[index][fieldName] = change.newCell.text;
  });
  return [...prevTableData];
};

const Component = (props: Props) => {
  const [tableData, setTableData] = React.useState<Feature[]>(props.features);

  const handleChanges = (changes: CellChange[]) => {
    const textCellChanges = changes.filter(x => x.type === 'text') as CellChange<TextCell>[];
    setTableData((prevTableData) => applyChangesToData(textCellChanges, prevTableData));
    props.setFeatures([...tableData]);
  };

  const handleContextMenu = (
    selectedRowIds: Id[],
    selectedColIds: Id[],
    selectionMode: SelectionMode,
    menuOptions: MenuOption[]
  ): MenuOption[] => {
    if (selectionMode === "row") {
      menuOptions = [
        {
          id: "removeRow",
          label: "この行を削除する",
          handler: () => {
            setTableData(prevTableData => {
              const newTableData = [...prevTableData.filter((_tableData, idx) => !selectedRowIds.includes(idx))];
              props.setFeatures([...newTableData]);
              return newTableData
            })
          }
        }
      ];
    }
    return menuOptions;
  }

  const headerRow: Row = {
    rowId: "header",
    cells: tableData[0] ? Object.keys(tableData[0]).map((key) => {
      return { type: "header", text: key };
    }) : []
  };

  const getRows = (tableData: Feature[]): Row[] => [
    headerRow,
    ...tableData.map<Row>((rowData, idx) => ({
      rowId: idx,
      cells: Object.values(rowData).map((column) => { return {type: "text", text: column}})
    }))
  ];

  const getColumns = (): Column[] => tableData[0] ? Object.keys(tableData[0]).map((key) => {
    return { columnId: key, width: 150 };
  }) : [];
  
  const rows = getRows(tableData);
  const columns = getColumns();
  return (
    <div className="main">
      <div className="container">
        <p>{tableData.length}件のデータが登録されています。</p>
        <ReactGrid
          rows={rows}
          columns={columns}
          onCellsChanged={handleChanges}
          onContextMenu={handleContextMenu}
          enableRowSelection
        />
      </div>
    </div>
  );
}

export default Component;
