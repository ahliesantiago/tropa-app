import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { FaLocationDot } from "react-icons/fa6";
import { HiMiniPencilSquare } from "react-icons/hi2";
import '../assets/styles/ProfilePage.css'

import Navbar from "../components/Layout/Navbar";
import ProfilePhotoGallery from '../components/Profile/ProfilePhotoGallery';
import Spinner from '../components/Spinner';

const ProfilePage = () => {
  const [user, setUser] = React.useState({});
  const [userInterests, setUserInterests] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { username } = useParams();
  const birthDate = new Date(user.birthday);
  const joinDate = new Date(user.createdAt);
  const joined = joinDate.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
  const currentDate = new Date();
  const age = calculateAge(currentDate, birthDate);

  function calculateAge(currentDate, birthDate){
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    if (currentDate.getMonth() < birthDate.getMonth() ||
      currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) {
      years --;
    }
    return years;
  }

  React.useEffect(() => {
    setLoading(true);
    axios.all([
      axios.get(`http://localhost:8080/users/${username}`),
      axios.get(`http://localhost:8080/interests`)
    ])
      .then(axios.spread((userResponse, interestsResponse) => {
        setUser(userResponse.data[0]);
        const interests = interestsResponse.data.data;
        const interestIds = userResponse.data[0].interests;
        setUserInterests(interests.filter(interest => interestIds.includes(interest._id)));
        setLoading(false);
      }))
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      {loading ? (
        <Spinner />
      ) : (
        <>
        <ProfilePhotoGallery />
        <div className='flex justify-between'>
        <h1 className='text-2xl align-top'>{user.firstName} {user.lastName} (@{user.username})</h1>
          <HiMiniPencilSquare className='text-3xl text-gray-600' />
        </div>
        <div>
          <p className='text-xl mr-4 text-gray-600'><FaLocationDot className='inline-block' /> {user.location}</p>
          <p className='text-xl mr-4 text-gray-500'>{user.nickname && `A.K.A. ${user.nickname},`} {age} years old</p>
          <p className='text-lg mr-4 text-gray-500'>Joined {joined}</p>
        </div>
        <div className='my-4'>
          <h2 className='text-2xl'>About Me</h2>
          <p className='text-xl mr-4'>{user.about}</p>
        </div>
        <div className='my-4'>
          <h2 className='text-2xl my-4'>Interests</h2>

          {userInterests.map((interest) => (
            <p key={interest._id} className='inline-block text-blue-700 border-2 border-blue-400 rounded-xl py-1 px-2 mr-2'
            >{interest.interestName}</p>
          ))}
          <button
            className='inline-block text-gray-400 border-2 border-gray-400 rounded-xl py-1 px-2'
            onClick={() => {
                console.log('clicked');
              }}
            >
              + add
            </button>
        </div>
        </>
      )}
    </div>
  )
}
export default ProfilePage;