import DoctorCard from "./DoctorCard";
import LoadingState from "../states/LoadingState";
import ErrorState from "../states/ErrorState";
import EmptyState from "../states/EmptyState";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const DoctorsGrid = ({
  loading,
  error,
  paginatedDoctors,
  selectedSpecialty,
  onDoctorClick,
  onRetry,
  onSpecialtyClick,
  currentPage,
  totalPage,
  onPageChange,
}) => {
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }

  if (paginatedDoctors.length === 0) {
    return (
      <EmptyState
        selectedSpecialty={selectedSpecialty}
        onSpecialtyClick={onSpecialtyClick}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {paginatedDoctors.map((doctor, index) => (
          <div
            key={doctor._id}
            onClick={() => onDoctorClick(doctor)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group-hover:bg-white relative">
              <DoctorCard doctor={doctor} />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination render dưới cùng nếu có nhiều trang */}
      {totalPage > 1 && (
        <DoctorsPagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

const DoctorsPagination = ({ currentPage, totalPage, onPageChange }) => {
  return (
    <div className="mt-12 flex justify-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20">
        <Pagination>
          <PaginationContent className="gap-2">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(currentPage - 1)}
                className={`cursor-pointer rounded-xl transition-all duration-300 ${
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md"
                }`}
              />
            </PaginationItem>

            {[...Array(totalPage)].map((_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === totalPage ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => onPageChange(page)}
                      isActive={currentPage === page}
                      className={`cursor-pointer rounded-xl transition-all duration-300 ${
                        currentPage === page
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md"
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              if (
                (page === currentPage - 2 && currentPage > 3) ||
                (page === currentPage + 2 && currentPage < totalPage - 2)
              ) {
                return (
                  <PaginationEllipsis key={page} className="text-gray-400" />
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(currentPage + 1)}
                className={`cursor-pointer rounded-xl transition-all duration-300 ${
                  currentPage === totalPage
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default DoctorsGrid;