import React from "react";

const RowComponent = (props) => {
  const { id, timestamp, logText } = props.value;
  return (
    <tr>
      <td className="col-sm-0">{id}</td>
      <td className="col-sm-0">{timestamp}</td>
      <td className="col-md-2">{logText}</td>
      <td className="col-sm-0">
        <button className="btn btn-sm btn-primary">UPDATE</button>
      </td>
      <td className="col-sm-0">
        <button className="btn btn-sm btn-danger">DELETE</button>
      </td>
    </tr>
  );
};

export default RowComponent;
