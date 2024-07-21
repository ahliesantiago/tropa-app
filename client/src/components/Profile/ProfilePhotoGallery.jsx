import PlaceholderGirl from '../../assets/images/PlaceholderGirl.jpg';

const ProfilePhotoGallery = () => {
  return (
    <>
    <div className='gallery flex'>
      <img src={PlaceholderGirl} className='my-4 mr-2 rounded-lg' alt="one of this user's profile pictures" />
      <div className='mini-gallery flex flex-col justify-around'>
        <img src={PlaceholderGirl} className='my-4 ml-2 rounded-lg' alt="one of this user's profile pictures" />
        <img src={PlaceholderGirl} className='my-4 ml-2 rounded-lg' alt="one of this user's profile pictures" />
      </div>
    </div>
    </>
  )
}

export default ProfilePhotoGallery