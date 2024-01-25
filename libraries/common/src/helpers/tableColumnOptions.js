import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

import { Box } from "@mui/material";

export default {
  sort: true,
  customHeadLabelRender: function (columnMeta) {
    const [name, direction] = this?.sorting?.split(" ") ?? [];
    if (columnMeta.sort) {
      var SortIcon =
        name === columnMeta.name ? (
          direction === "asc" ? (
            <FaSortUp />
          ) : (
            <FaSortDown />
          )
        ) : (
          <FaSort />
        );
    }
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box>{columnMeta.label}</Box>
        <Box>{SortIcon}</Box>
      </Box>
    );
  },
  customBodyRender: (value, tableMeta, updateValue) => {
    return value !== null && value !== undefined && value !== ""
      ? value + ""
      : "-";
  },
};
