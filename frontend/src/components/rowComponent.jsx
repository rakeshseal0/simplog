import React from "react";
const tableProperty1 = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
};
// const tableProperty2 = {
//   whiteSpace: "nowrap",
//   overflow: "hidden",
//   textOverflow: "ellipsis"
//   // maxWidth: 30
// };

const RowComponent = props => {
  const { id, timestamp, logText } = props.value;
  return (
    <tr>
      <td>{id}</td>
      <td>{timestamp}</td>
      <td style={tableProperty1}>{logText}</td>
      <td>
        <button className="btn btn-sm btn-secondary">Info</button>
      </td>
      <td>
        <button className="btn btn-sm btn-danger">Delete</button>
      </td>
    </tr>
  );
};

export default RowComponent;
