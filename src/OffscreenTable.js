import "./OffscreenTable.css";
import React from "react";

export const OffscreenTable = React.forwardRef(({ fontSize }, ref) => {
  return (
    <div
      className="offscreen"
      style={{
        fontSize: `${fontSize}pt`,
      }}
    >
      <table ref={ref}>
        <tbody>
          <tr>
            <td></td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
});
