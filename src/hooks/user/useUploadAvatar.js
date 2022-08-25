import { toast } from "react-toastify";
import useGetUserImage from "./useGetUserImage";
const domain = "https://api-nodejs-todolist.herokuapp.com";

let useUploadAvatar = () => {
  const getUserImage = useGetUserImage();
  let uploadAvatar = (imageFile, id) => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    let formdata = new FormData();
    formdata.append("avatar", imageFile, imageFile.name);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
      caches: "reload",
    };

    toast.promise(
      fetch(`${domain}/user/me/avatar`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .then(() => {
          getUserImage(id);
        })
        .catch((error) => console.log("error", error)),
      {
        pending: "Uploading...",
        success: "Upload successful!!!",
        error: "Upload failed",
      }
    );
  };

  return uploadAvatar;
};

export default useUploadAvatar;
