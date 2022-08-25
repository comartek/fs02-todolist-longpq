import { Autocomplete, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import useFilter from "../hooks/useFilter";
import { setFilterIsChoose } from "../store/actions";

let ComboBox = (props) => {
  const { setCount } = props;
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

  const dispatchRedux = useDispatch();
  const dispatchFilterIsChoose = (data) => {
    dispatchRedux(setFilterIsChoose(data));
  };

  const filter = useFilter();

  return (
    <Autocomplete
      disablePortal
      defaultValue={"All Task"}
      id="combo-box-filter"
      options={data}
      style={{ width: 180 }}
      renderInput={(params) => <TextField {...params} />}
      onChange={(e) => {
        filter(e.target.textContent, setCount);
        dispatchFilterIsChoose(e.target.textContent);
      }}
    />
  );
};

export default ComboBox;
