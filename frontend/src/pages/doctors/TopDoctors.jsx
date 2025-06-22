import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../providers/AppProvider";
import { useAuth } from "../../providers/AuthProvider";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/2 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 gap-y-6 pt-5 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}/${user.id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full bg-blue-50"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p>Available</p>
              </div>
              <p className="font-medium text-lg text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:scale-105 transition-all duration-300"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
