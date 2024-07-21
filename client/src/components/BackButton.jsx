import { Link } from "react-router-dom"
import { IoArrowBackCircleOutline } from "react-icons/io5";

const BackButton = ({destination = '/'}) => {
  return (
    <div className="flex">
      <Link to={destination}>
        <IoArrowBackCircleOutline className="text-2xl" />
      </Link>
    </div>
  )
}

export default BackButton