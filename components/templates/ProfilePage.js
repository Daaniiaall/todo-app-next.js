import { CgProfile } from "react-icons/cg";
import ProfileForm from "../modules/ProfileForm";
import ProfileData from "../modules/ProfileData";
import { useEffect, useState } from "react";
import { set } from "mongoose";

function ProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const [profileData, setProfileData] = useState(null);

  const [edit, setEdit] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    if (data.status === "success" && data.data.name && data.data.lastName)
      setProfileData(data.data);
  };

  const submitHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };

  const editHandler = () => {
    setEdit(!edit);
  };

  const updateInfoHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "PATCH",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if(data.status === "success"){ location.reload();}
  };

  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>

      {profileData ? (
        <ProfileData profileData={profileData} />
      ) : (
        <ProfileForm
          name={name}
          lastName={lastName}
          password={password}
          setName={setName}
          setLastName={setLastName}
          setPassword={setPassword}
          submitHandler={submitHandler}
        />
      )}

      {edit ? (
        <ProfileForm
          name={name}
          lastName={lastName}
          password={password}
          setName={setName}
          setLastName={setLastName}
          setPassword={setPassword}
          edit={edit}
          editHandler={editHandler}
          updateInfoHandler={updateInfoHandler}
        />
      ) : null}

      { profileData && !edit && <button onClick={editHandler}>Edit your info</button>}

    </div>
  );
}

export default ProfilePage;
