import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { updateInfo, uploadAvatar } from "../Data";
import BtnUI from "./BtnUI";
import InputItem from "./InputItem";

let UpdateInfo = (props) => {
  let { user, setUser } = props;

  let [isOpen, setIsOpen] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [age, setAge] = useState(0);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
  }, []);

  let imgAccount =
    "https://www.meme-arsenal.com/memes/8b6f5f94a53dbc3c8240347693830120.jpg";

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
        // closeOnDocumentClick={false}
        onOpen={() => setIsOpen(true)}
        open={isOpen}
        // overlayStyle={{ backgroundColor: "white" }}
        contentStyle={{ borderRadius: 5, paddingTop: 20, paddingBottom: 20 }}
      >
        <div
          className="flex flex-col items-center justify-center"
          //   onClick={() => setIsOpen(true)}
        >
          <div className="text-xl font-bold text-red-400 uppercase my-5">
            Update information
          </div>
          <div>
            <div className="flex items-center">
              <input
                onChange={(e) => uploadAvatar(e.target.value)}
                type="file"
                className="w-40 h-40 bg-cover mr-5 mt-3 rounded-full cursor-pointer"
                style={{ backgroundImage: `url(${imgAccount})` }}
              />
              {/* <input type="file" /> */}
              {/* </inp> */}
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
                  updateInfo(name, email, age, setUser);
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
