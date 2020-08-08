import React, { Component } from "react";
import RowComponent from "./rowComponent";

class TableComponent extends Component {
  //   componentDidMount() {
  //     console.log(this.props);
  //   }
  render = () => {
    const { data: logData } = this.props;
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>TimeStamp</th>
            <th>Log</th>
            <th>UPDATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {logData.map((dataRow) => (
            <RowComponent key={dataRow.id} value={dataRow} />
          ))}
        </tbody>
      </table>
    );
  };
}

export default TableComponent;
