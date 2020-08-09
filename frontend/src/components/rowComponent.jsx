import React from "react";
const tableProperty1 = {
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const RowComponent = (props) => {
  const { id, timestamp, logText, _id } = props.value;
  // const { handleDelete } = props.onDelete;
  return (
    <tr>
      <td>{id}</td>
      <td>{timestamp}</td>
      <td style={tableProperty1}>{logText}</td>
      <td>
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => props.onInfo(_id)}
        >
          Info
        </button>
      </td>
      <td>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => props.onDelete(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default RowComponent;
