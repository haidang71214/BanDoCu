const DoctorsHeader = ({
  selectedSpecialty,
  loading,
  error,
  filteredDoctors,
  startIndex,
  doctorsPerPage,
}) => {
  const hasDoctors = filteredDoctors.length > 0;
  const showStatus = !loading && !error;

  const doctorCountText = hasDoctors
    ? `${startIndex + 1}-${Math.min(
        startIndex + doctorsPerPage,
        filteredDoctors.length
      )} of ${filteredDoctors.length} doctors available`
    : "No doctors found";

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {selectedSpecialty
              ? `${selectedSpecialty} Specialists`
              : "All Medical Professionals"}
          </h2>

          {showStatus && (
            <p className="text-gray-600 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {doctorCountText}
            </p>
          )}
        </div>

        {showStatus && hasDoctors && (
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <StatusIndicator color="bg-blue-500" label="Available Today" />
            <StatusIndicator color="bg-green-500" label="Verified" />
          </div>
        )}
      </div>
    </div>
  );
};

const StatusIndicator = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-3 h-3 ${color} rounded-full`} />
    <span>{label}</span>
  </div>
);

export default DoctorsHeader;
