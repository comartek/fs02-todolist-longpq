import { Autocomplete, TextField } from "@mui/material";

let ComboBox = () => {
  const data = [
    {
      label: "All Task",
    },
    {
      label: "Completed",
    },
    {
      label: "Processing",
    },
  ];

  return (
    <Autocomplete
      disablePortal
      id="combo-box-filter"
      options={data}
      sx={{ width: 130 }}
      renderInput={(params) => <TextField {...params} label="Filter" />}
      //   onChange={() => }
    />
  );
};

export default ComboBox;
