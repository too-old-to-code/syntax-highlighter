import "./OffscreenTable.css";
import React from "react";

export const OffscreenTable = React.forwardRef(({ fontSize }, ref) => {
  return (
    <pre style={{ padding: 0 }} className="offscreen">
      <div
        style={{
          // fontSize: `${fontSize}pt`,
          position: "relative",
        }}
      >
        <table ref={ref} className="table">
          <tbody>
            <tr>
              <td className="td"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </pre>
  );
});
