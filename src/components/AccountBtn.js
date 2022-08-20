import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { getLoggedInUser, logout } from "../Data";

let AccountBtn = (props) => {
  let [user, setUser] = useState({});
  let [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    getLoggedInUser(setUser);
  }, []);

  let imgAccount =
    "https://www.meme-arsenal.com/memes/8b6f5f94a53dbc3c8240347693830120.jpg";

  return (
    <div className="flex mb-3">
      <Popup
        trigger={
          <button
            className="w-12 h-12 bg-cover flex rounded-full mr-3"
            style={{
              backgroundImage: `url(${imgAccount})`,
            }}
          ></button>
        }
        position={"bottom center"}
        onOpen={() => setIsOpen(true)}
        open={isOpen}
      >
        <div className="rounded-md absolute top-0 left-0 p-5 bg-white drop-shadow-lg">
          <div>
            <div className="flex">
              name: <div className="w-5"></div>
              <div className="font-bold w-full justify-end flex text-red-400">
                {user.name}
              </div>
            </div>
            <div className="flex">
              email: <div className="w-5"></div>
              <div className="font-bold text-red-400">{user.email}</div>
            </div>
            <div className="flex">
              age: <div className="w-full"></div>
              <div className="font-bold text-red-400">{user.age}</div>
            </div>
          </div>
          <button
            onClick={() => logout(navigate)}
            className="bg-red-400 w-full text-white p-5 mt-5"
          >
            Logout
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default AccountBtn;
