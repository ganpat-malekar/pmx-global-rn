// NOTE: This is depricated and not in use

import React, { useState } from "react";

function SmartDatePicker({ RenderInput }) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  return (
    <div
      // NOTE: display: "contents": contents causes an element's children to
      // appear as if they were direct children of the element's parent,
      // ignoring the element itself.
      style={{ display: "contents" }}
      onClick={() => {
        setIsDatePickerOpen(true);
        console.log("hi");
      }}
    >
      <RenderInput
        open={isDatePickerOpen}
        onOpen={() => setIsDatePickerOpen(true)}
        onClose={() => setIsDatePickerOpen(false)}
      />
    </div>
  );
}

export default SmartDatePicker;
