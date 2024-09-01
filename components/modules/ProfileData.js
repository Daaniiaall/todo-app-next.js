
function ProfileData({profileData}) {

  return (
    <div className="profile-data">
        <div>
            <span>Name:</span>
            <p>{profileData.name}</p>
        </div>
        <div>
            <span>LastName:</span>
            <p>{profileData.lastName}</p>
        </div>
        <div>
            <span>Email:</span>
            <p>{profileData.email}</p>
        </div>
    </div>
  )
}

export default ProfileData