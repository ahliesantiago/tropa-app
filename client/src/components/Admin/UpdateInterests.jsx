import * as React from 'react'
import axios from 'axios'

import Spinner from '../Spinner'

const UpdateInterests = ({action, interest, handleCancel, refreshInterests}) => {
  const [categories, setCategories] = React.useState([])
  const [newInterestName, setNewInterestName] = React.useState('')
  const [newInterestCategories, setNewInterestCategories] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if(action === 'edit'){
      setNewInterestName(interest.interestName)
      setNewInterestCategories(interest.categories)
    }

    axios.get('http://localhost:8080/categories')
    .then((response) => {
      setCategories(response.data.data)
    })
    .catch((error) => {
      console.log("Error fetching categories from server", error)
    })
  }, [])

  const handleAddInterest = (e) => {
    e.preventDefault()
    console.log(newInterestName, newInterestCategories)
    axios.post('http://localhost:8080/interests/new', {
      interestName: newInterestName,
      categories: newInterestCategories
    })
    .then(() => {
      setLoading(false)
      refreshInterests()
      setNewInterestName('')
      setNewInterestCategories([])
    })
    .catch((error) => {
      setLoading(false)
      alert("Error adding new interest, please check console for more details.")
      console.log(error)
    })
  }

  const handleEditInterest = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:8080/interests/${interest._id}`, {
      interestName: newInterestName,
      categories: newInterestCategories
    })
    .then(() => {
      setLoading(false)
      refreshInterests()
      handleCancel()
    })
    .catch((error) => {
      setLoading(false)
      alert("Error updating interest, please check console for more details.")
      console.log(error)
    })
  }

  const handleSelectCategories = (e) => {
    if(newInterestCategories.includes(e.target.value)){
      setNewInterestCategories(newInterestCategories.filter(category => category !== e.target.value))
    }else{
      setNewInterestCategories([...newInterestCategories, e.target.value])
    }
  }

  return (
    <div className='flex flex-col gap-y-4'>
      {action === 'add' && <h2 className='text-3xl'>Add New Interest</h2>}
      {action === 'edit' && <h2 className='text-3xl'>Edit Interest</h2>}
      {loading && <Spinner />}
      <form className='flex flex-col gap-y-4'>
        <div className='flex flex-col gap-y-2'>
          <label htmlFor='interestName'>Interest Name</label>
          <input
            type='text'
            id='interestName'
            className='border border-slate-400 rounded-md p-2'
            value = {newInterestName}
            onChange={(e) => setNewInterestName(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-y-2'>
          <label htmlFor='interestCategories'>Interest Categories</label>
          <select
            id='interestCategories'
            className='border border-slate-400 rounded-md p-2'
            value={newInterestCategories}
            onChange={handleSelectCategories}
            multiple
          >
            {categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <div className='flex justify-end'>
            <button
          className='border bg-neutral-300 rounded-md p-2 m-2 w-20'
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className='bg-blue-500 text-white rounded-md p-2 ml-2 my-2 w-20'
              onClick={action === 'add' ? handleAddInterest : handleEditInterest}
            >
              {action === 'add' ? "Add" : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateInterests