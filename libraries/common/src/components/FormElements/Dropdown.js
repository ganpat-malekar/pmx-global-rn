import { MenuItem, TextField } from "@mui/material";

/**
 * A customizable dropdown component that renders a list of items within a TextField.
 *
 * @typedef {Object} DropdownProps
 * @property {Array<any>} list - The list of items to be displayed in the dropdown.
 * @property {function(any): boolean} [filterFn] - An optional function to filter the list of items.
 * @property {function(any): any} [mapFn] - An optional function to map items to a custom format.
 * @property {string} [itemName="label"] - The key in each item object to use as the item's label.
 * @property {string} [itemValue="value"] - The key in each item object to use as the item's value.
 * @property {boolean} [loading] - If true, displays a loading message when the list is not loaded (undefined).
 * @property {function(any, number): JSX.Element} [renderItems] - A function to render each item as a MenuItem.
 * @property {...any} [textFieldProps] - Other props to be passed to the underlying TextField component.
 */

/**
 * Dropdown component renders a list of items within a TextField.
 *
 * @param {DropdownProps} props - The props for the Dropdown component.
 * @returns {JSX.Element} The JSX element representing the Dropdown component.
 */

const Dropdown = ({
  list,
  filterFn = (i) => true,
  mapFn = (i) => i,
  itemName = "label",
  itemValue = "value",
  loading,
  renderItems = (item, index) => {
    return (
      <MenuItem key={index} value={item[itemValue]}>
        {item[itemName]}
      </MenuItem>
    );
  },
  ...textFieldProps
}) => {
  return (
    <TextField select {...textFieldProps}>
      {list?.length > 0 && list?.filter(filterFn).length > 0 ? (
        list.filter(filterFn).map(mapFn).map(renderItems)
      ) : (
        <MenuItem disabled>{loading ? "Loading..." : "No options"}</MenuItem>
      )}
    </TextField>
  );
};

export default Dropdown;
