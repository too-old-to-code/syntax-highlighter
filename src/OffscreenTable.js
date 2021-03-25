import "./OffscreenTable.css";
import React from "react";

export const OffscreenTable = React.forwardRef(({ fontSize }, ref) => {
  return (
    <div
      ref={ref}
      className="offscreen"
      style={{
        fontSize: `${fontSize}pt`,
      }}
    >
      <table>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});
