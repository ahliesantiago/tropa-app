import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Select } from 'antd'
import { CloseCircleTwoTone } from '@ant-design/icons'
import { FaLocationDot } from "react-icons/fa6"
import { HiMiniPencilSquare } from "react-icons/hi2"

import '../assets/styles/ProfilePage.css'

// import ProfilePhotoGallery from '../components/Profile/ProfilePhotoGallery'
import Spinner from '../components/Spinner'

const ProfilePage = () => {
  const [user, setUser] = useState({})
  const [userInterests, setUserInterests] = useState([])
  const [loading, setLoading] = useState(false)
  const [isAddingInterest, setIsAddingInterest] = useState(false)
  const [interestList, setInterestList] = useState([])
  const [hoveringOverInterest, setHoveringOverInterest] = useState({})
  const [isHovering, setIsHovering] = useState(false) // temporary

  const { username } = useParams()
  const birthDate = new Date(user.birthday)
  const joinDate = new Date(user.createdAt)
  const joined = joinDate.toLocaleDateString('en-US', {month: 'long', year: 'numeric'})
  const currentDate = new Date()

  const calculateAge = (currentDate, birthDate) => {
    let years = currentDate.getFullYear() - birthDate.getFullYear()
    if (currentDate.getMonth() < birthDate.getMonth() ||
      currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) {
      years --
    }
    return years
  }
  const age = calculateAge(currentDate, birthDate)

  const handleAddInterest = (e) => {
    const existingInterests = user.interests
    const newInterests = [...existingInterests, e]
    console.log(newInterests)
    axios.put(`http://localhost:8080/users/${user._id}/`, {
      interests: newInterests,
    })
      .then((response) => {
        if(response.status === 200) {
          fetchUserInterests()
          setIsAddingInterest(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchUserInterests = () => {
    setLoading(true)
    axios.all([
      axios.get(`http://localhost:8080/users/${username}`),
      axios.get(`http://localhost:8080/interests`)
    ])
      .then(axios.spread((userResponse, interestsResponse) => {
        setUser(userResponse.data[0])
        const interests = interestsResponse.data.data
        const userInterestIds = userResponse.data[0].interests
        setUserInterests(interests.filter(interest => userInterestIds.includes(interest._id)))
        setInterestList(interests.filter(interest => !userInterestIds.includes(interest._id)).map(interest => ({label: interest.interestName, value: interest._id})))
        setLoading(false)
      }))
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchUserInterests()
  }, [])

  return (
    <div className='p-4'>
        {/* <ProfilePhotoGallery /> */}
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
      {loading ? (
        <Spinner />
      ) : (
        <div className='my-4'>
          <h2 className='text-2xl my-4'>Interests</h2>

          {userInterests.map((interest) => (
            <React.Fragment key={interest._id}>
              <div className="interestContainer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <p className='inline-block text-blue-700 border-2 border-blue-400 rounded-xl py-1 px-2 mr-2'
                >{interest.interestName}</p>
                {isHovering && (
                  <CloseCircleTwoTone className='deleteButton'/>
                )}
              </div>
            </React.Fragment>
          ))}
          {!isAddingInterest && (
            <button
              className='inline-block text-gray-400 border-2 border-gray-400 rounded-xl py-1 px-2'
              onClick={() => {setIsAddingInterest(true)}}
            >
              + add
            </button>
          )}
          {isAddingInterest && (
            <form
              className='inline-block'
            >
              <Select
                showSearch
                // className='inline-block border-2 border-gray-400 rounded-xl py-1 px-2'
                style={{ minWidth: '150px' }}
                onChange={handleAddInterest}
                options={interestList}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
              />
              <button className='inline-block text-gray-400 border-2 border-gray-400 rounded-xl py-1 px-2 ms-2'>add</button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
export default ProfilePage