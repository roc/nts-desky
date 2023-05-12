// import { useEffect, useState } from "react";

export default function DialKnob( {volume, callback}) {
  // actually want this to be a knob not a slider
  return (
    <div>
      <input type="range" min={0} max={100} value={volume} onChange={(e) => (callback(e.target.value))} />
    </div>
  );
}