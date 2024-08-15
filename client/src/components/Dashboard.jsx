import Users from '../components/Users/Users'

const DashboardPage = () => {
  return (
    <>
    <h2 className="text-3xl text-center my-4">You might be interested in...</h2>
    <Users />
    <p className="border border-b-2 w-4/5 m-auto my-5"></p>
    </>
  )
}

export default DashboardPage