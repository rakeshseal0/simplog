import React, { Component } from "react";
import RowComponent from "./rowComponent";
import { Table } from "react-bootstrap";
// import config from "../config.json";
// import axios from "axios";

class TableComponent extends Component {
  render = () => {
    const { data: logData, onDelete, onInfo } = this.props;
    return (
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>timestamp</th>
            <th>Incoming IP</th>
            <th>LogData</th>
            <th>Info</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {logData.map((dat) => (
            <RowComponent
              key={dat.id}
              value={dat}
              onDelete={onDelete}
              onInfo={onInfo}
            />
          ))}
        </tbody>
      </Table>
    );
  };
}

export default TableComponent;
