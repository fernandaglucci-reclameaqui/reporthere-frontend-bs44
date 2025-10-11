import React from 'react';

export default function RouteProbe({ name, children }) {
  return (
    <div style={{ position:"relative" }}>
      <div style={{
        position:"fixed", zIndex:99998, top:32, left:4,
        padding:"4px 6px", background:"#0a0", color:"#fff",
        font:"12px/1.2 system-ui", borderRadius:4
      }}>
        ROUTE: {name}
      </div>
      <div data-probe-static style={{ padding:"12px", border:"1px dashed #0a0", margin:"12px" }}>
        Static content OK — if you see this, routing renders. (Data below)
      </div>
      {children ?? <div style={{ color:"#a00" }}>Child missing</div>}
    </div>
  );
}