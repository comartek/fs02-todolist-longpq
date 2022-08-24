import { faRefresh, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { getLoggedInUser, getUserImage, logout } from "../Data";
import { setAvatar, setUser } from "../store/actions";
import { avatarSelector, userSelector } from "../store/selectors";
import BtnUI from "./BtnUI";
import UpdateInfo from "./UpdateInfo";

let AccountBtn = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenLogout, setIsOpenLogout] = useState(false);

  let navigate = useNavigate();

  let user = useSelector(userSelector);

  let dispatchRedux = useDispatch();
  let dispatchUser = (data) => {
    dispatchRedux(setUser(data));
  };

  let dispatchAvatar = (data) => {
    dispatchRedux(setAvatar(data));
  };

  let imgAccount = useSelector(avatarSelector);

  useEffect(() => {
    getLoggedInUser(dispatchUser);
  }, []);

  useEffect(() => {
    getUserImage(user._id, dispatchAvatar);
  }, [user]);

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
        closeOnDocumentClick={false}
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
          <UpdateInfo
            user={user}
            setUser={dispatchUser}
            imgAccount={imgAccount}
            dispatchAvatar={dispatchAvatar}
          />
          <Popup
            modal
            trigger={
              // <BtnUI text="Logout" action={() => setIsOpenLogout(true)} />
              <button className="bg-red-400 text-white w-full p-3 rounded-md mt-3">
                Logout
              </button>
            }
            position={"bottom center"}
            // closeOnDocumentClick={false}
            onOpen={() => setIsOpenLogout(true)}
            open={isOpenLogout}
            contentStyle={{
              borderRadius: 5,
            }}
          >
            <div className="rounded-md flex flex-col p-5">
              <div>Are you sure want to logout {user.name} account?</div>
              <div className="flex items-center self-end">
                <button
                  className="text-red-400 p-3 mt-3"
                  onClick={() => setIsOpenLogout(false)}
                >
                  Cancel
                </button>
                <BtnUI text="Apply" action={() => logout(navigate("/"))} />
              </div>
            </div>
          </Popup>
        </div>
      </Popup>
      <div>
        Welcome,
        <div className="font-bold text-red-400 text-xl">{user.name}</div>
      </div>
    </div>
  );
};

export default AccountBtn;
