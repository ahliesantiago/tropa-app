import * as React from 'react'
import axios from 'axios';

import Spinner from '../Spinner';

const DeleteInterest = ({handleCancel, interest}) => {
  const [loading, setLoading] = React.useState(false);
  const id = interest._id;

  const handleDeleteInterest = () => {
    setLoading(true);
    axios.delete(`http://localhost:8080/interests/${id}`)
    .then(() => {
      setLoading(false);
      window.location.reload();
    })
    .catch((error) => {
      setLoading(false);
      alert("An error occurred, please check console for more details.");
      console.log(error);
    });
  };

  return (
    <div className='flex flex-col items-center gap-y-4'>
      <h2 className='text-3xl'>Delete Interest</h2>
      {loading && <Spinner />}
      <p className='text-xl'>Are you sure you want to delete the '{interest.interestName}' interest?</p>
      <div>
        <button
          className='border bg-neutral-300 rounded-md p-2 m-2 w-20'
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className='bg-red-500 text-white rounded-md p-2 ml-2 my-2 w-20'
          onClick={handleDeleteInterest}
        >
          Delete
        </button>
      </div>      
    </div>
  )
}

export default DeleteInterest