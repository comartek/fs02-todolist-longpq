import { faCheckCircle, faCircleStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let InputItem = (props) => {
  let { placeholder, value, setValue, type, validate } = props;

  console.log(props);

  return (
    <div className="mt-3">
      <input
        type={type === "password" ? "password" : ""}
        placeholder={placeholder}
        className="p-3 w-96"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {validate !== undefined ? (
        value === "" ? (
          <div></div>
        ) : validate(value) ? (
          <div className="text-green-400 ml-3 mt-2">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            {placeholder} is valid
          </div>
        ) : (
          <div className="text-red-400 ml-3 mt-2">
            <FontAwesomeIcon icon={faCircleStop} className="mr-2" />
            {placeholder} is invalid
          </div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default InputItem;
