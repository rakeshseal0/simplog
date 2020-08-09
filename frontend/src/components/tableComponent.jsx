import React, { Component } from "react";
import RowComponent from "./rowComponent";
import { Table } from "react-bootstrap";

class TableComponent extends Component {
  render = () => {
    const { data: logData } = this.props;
    return (
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>timestamp</th>
            <th>LogData</th>
            <th>Info</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {logData.map(dat => (
            <RowComponent key={dat.id} value={dat} />
          ))}
        </tbody>
      </Table>
    );
  };
}

export default TableComponent;
