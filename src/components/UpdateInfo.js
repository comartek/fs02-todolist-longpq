import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import useUpdateInfo from "../hooks/user/useUpdateInfo";
import useUploadAvatar from "../hooks/user/useUploadAvatar";
import BtnUI from "./BtnUI";
import InputItem from "./InputItem";

const UpdateInfo = (props) => {
  let { user, setUser, imgAccount } = props;

  let [isOpen, setIsOpen] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [age, setAge] = useState(0);

  const updateInfo = useUpdateInfo();
  const uploadAvatar = useUploadAvatar();

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
  }, []);

  return (
    <div className="flex">
      <Popup
        modal
        position="bottom center"
        trigger={
          <button className="bg-gray-100 w-full p-3 rounded-md mt-2">
            <FontAwesomeIcon icon={faRefresh} className="mr-2" />
            Update information
          </button>
        }
        onOpen={() => setIsOpen(true)}
        open={isOpen}
        contentStyle={{ borderRadius: 5, paddingTop: 20, paddingBottom: 20 }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="text-xl font-bold text-red-400 uppercase my-5">
            Update information
          </div>
          <div>
            <div className="flex items-center">
              <label
                className="w-32 h-32 bg-cover mr-5 rounded-full cursor-pointer"
                style={{
                  backgroundImage: `url(${imgAccount})`,
                  display: "inline-block",
                }}
              >
                <input
                  onChange={(e) => {
                    uploadAvatar(e.target.files[0], user._id);
                  }}
                  type="file"
                  className="hidden"
                />
              </label>
              <div>
                <InputItem value={name} placeholder="Name" setValue={setName} />
                <InputItem
                  value={email}
                  placeholder="Email"
                  setValue={setEmail}
                />
                <InputItem value={age} placeholder="Age" setValue={setAge} />
              </div>
            </div>
            <div className="w-full my-5">
              <BtnUI
                text="Update"
                action={() => {
                  updateInfo(name, email, age);
                  setIsOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default UpdateInfo;
