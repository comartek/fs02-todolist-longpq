import {
  faCheckCircle,
  faCircleStop,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

let InputItem = (props) => {
  let { placeholder, value, setValue, type, validate } = props;
  let [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="my-2 relative">
      <input
        type={
          type === "password" && isShowPassword === false ? "password" : "text"
        }
        placeholder={placeholder}
        className="p-3 w-96 bg-gray-100 rounded-md"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {type === "password" && value.length > 0 && (
        <button
          className="absolute top-2.5 right-2 z-20"
          onClick={() => setIsShowPassword(!isShowPassword)}
        >
          <FontAwesomeIcon icon={isShowPassword ? faEye : faEyeSlash} />
        </button>
      )}

      {validate !== undefined ? (
        value === "" ? (
          <div></div>
        ) : type !== "password" ? (
          validate(value) ? (
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
        ) : validate(value) ? (
          <div className="text-green-400 ml-3 mt-2">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            {placeholder} is valid
          </div>
        ) : (
          <div className="text-red-400 ml-3 mt-2">
            <FontAwesomeIcon icon={faCircleStop} className="mr-2" />
            {placeholder} must be at least 7 characters
          </div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default InputItem;
