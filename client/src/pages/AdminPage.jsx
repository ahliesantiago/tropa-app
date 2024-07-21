import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

import Navbar from '../components/Layout/Navbar';
import Spinner from '../components/Spinner';
import CreateInterest from '../components/Admin/CreateInterest';
import DeleteInterest from '../components/Admin/DeleteInterest';

const AdminPage = () => {
  const [categories, setCategories] = React.useState([]);
  const [interests, setInterests] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [action, setAction] = React.useState('');
  const [selectedInterest, setSelectedInterest] = React.useState(null);

  const handleCancel = () => {
    setAction();
  };

  React.useEffect(() => {
    setLoading(true);
    axios.all([
      axios.get('http://localhost:8080/interests'),
      axios.get('http://localhost:8080/categories')
    ])
    .then(axios.spread((interestsResponse, categoriesResponse) => {
      setInterests(interestsResponse.data.data);
      setCategories(categoriesResponse.data.data);
      setLoading(false);
    }))
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, []);

  return (
    <>
    <h1>Admin Page</h1>
    <Navbar />

    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-3'>Interests List</h1>
        <MdOutlineAddBox className='text-black text-4xl' onClick={() => setAction('add')} />
      </div>

      {action && (
        <div className="modal p-4 m-4 border border-slate-400 rounded-lg shadow-lg">
          {action === 'add' && <CreateInterest handleCancel={handleCancel} />}
          {action === 'delete' && <DeleteInterest interest={selectedInterest} handleCancel={handleCancel} />}
        </div>
      )}
      
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-1 mt-8'>
          {/* <thead>
            <tr>
              <th className='bg-slate-500'>No.</th>
              <th className='bg-slate-500'>Categories</th>
              <th className='bg-slate-500'>Interests</th>
              <th className='bg-slate-500'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id} className='h-8'>
                <td>{index + 1}</td>
                <td>{category.categoryName}</td>
                <td>
                  {interests
                    .filter(interest => interest.categories.includes(category._id))
                    .map((interest, index, array) => (
                      <span id={index} key={index}>
                        {interest.interestName}
                        {index !== array.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                </td>
                <td>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`categories/${category._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`categories/${category._id}/edit`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`categories/${category._id}/delete`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody> */}
          <thead>
            <tr>
              <th className='bg-slate-500'>No.</th>
              <th className='bg-slate-500'>Interests</th>
              <th className='bg-slate-500'>Umbrella</th>
              <th className='bg-slate-500'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {interests.map((interest, index) => (
                <tr key={interest._id} className='h-8'>
                  <td>{index + 1}</td>
                  <td>{interest.interestName}</td>
                  <td>{interest.categories.map(categoryId => {
                    const category = categories.find(category => category._id === categoryId);
                    return category ? category.categoryName : '';
                  }).join(', ')}</td>
                  <td>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`interests/${interest._id}/edit`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                      </Link>
                      <MdOutlineDelete
                        onClick={() => {
                          setAction('delete');
                          setSelectedInterest(interest);
                        }}
                        className='text-2xl text-red-600' />
                    </div>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  )
}

export default AdminPage