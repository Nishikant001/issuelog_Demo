// components/CompanyDetail.jsx
import React, { useState, useEffect } from "react";

const CompanyDetail = ({
  company,
  selectedTechId,
  selectedModuleId,
  onSelectTech,
  onSelectModule,
  onEditTech,
  onDeleteTech,
  onEditModule,
  onDeleteModule,
  onEditTeam,
  onDeleteTeam,
  onEditStatus,
}) => {
  const [companyToEdit, setCompanyToEdit] = useState(null);
  const [newStatus, setNewStatus] = useState("On Going");
  const [showEditStatusModal, setShowEditStatusModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(
    company.status || "On Going"
  );
  const [showStatusToast, setShowStatusToast] = useState(false);

  // Update currentStatus when company prop changes
  useEffect(() => {
    setCurrentStatus(company.status || "On Going");
  }, [company.status]);

  const handleEditStatusClick = (e, companyName) => {
    e.stopPropagation();
    setCompanyToEdit(companyName);
    setNewStatus(currentStatus);
    setShowEditStatusModal(true);
  };

  // Function to save status change
  const handleSaveStatus = () => {
    if (companyToEdit) {
      // Now using the onEditStatus prop
      onEditStatus && onEditStatus(companyToEdit, newStatus);
      setCurrentStatus(newStatus); // Update local state immediately
      setShowEditStatusModal(false);
      setShowStatusToast(true);

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowStatusToast(false);
      }, 3000);
    }
  };

  // Function to handle back navigation
  const handleBackNavigation = (level) => {
    if (level === "module" && selectedModuleId) {
      // If we're at the team level, go back to module level
      onSelectModule(null);
    } else if (level === "tech" && selectedTechId) {
      // If we're at the module level, go back to tech level
      onSelectTech(null);
    }
  };

  // Back button component for reuse
  const BackButton = ({ onClick, text }) => (
    <button
      onClick={onClick}
      className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {text}
    </button>
  );

  // Count customers by status
  const customerCounts = {
    total: company.customerCount || 0,
    onGoing: company.onGoingCustomers || 0,
    onHold: company.onHoldCustomers || 0,
    disconnected: company.disconnectedCustomers || 0,
  };

  // Status badge component with improved styling
  const StatusBadge = ({ status }) => {
    let badgeStyle;
    switch (status) {
      case "On Going":
        badgeStyle =
          "bg-emerald-100 text-emerald-800 border border-emerald-200";
        break;
      case "On Hold":
        badgeStyle = "bg-amber-100 text-amber-800 border border-amber-200";
        break;
      case "Disconnected":
        badgeStyle = "bg-rose-100 text-rose-800 border border-rose-200";
        break;
      default:
        badgeStyle = "bg-gray-100  text-gray-800 border border-gray-200";
    }

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeStyle}`}
      >
        <span
          className={`h-2 w-2 rounded-full mr-2 ${
            status === "On Going"
              ? "bg-emerald-500"
              : status === "On Hold"
              ? "bg-amber-500"
              : "bg-rose-500"
          }`}
        ></span>
        {status}
      </span>
    );
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
      {/* Success Toast */}
      {showStatusToast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-100 border border-emerald-300 text-emerald-700 px-4 py-3 rounded shadow-lg flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          Status successfully updated to {currentStatus}
          <button
            onClick={() => setShowStatusToast(false)}
            className="ml-4 text-emerald-600 hover:text-emerald-800"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      )}

      {/* Main Back Navigation */}
      {(selectedTechId || selectedModuleId) && (
        <BackButton
          onClick={() =>
            handleBackNavigation(selectedModuleId ? "module" : "tech")
          }
          text={`Back to ${selectedModuleId ? "Modules" : "Technologies"}`}
        />
      )}

      <div className="bg-white p-8 rounded-xl shadow-xl mb-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-gray-800">{company.name}</h2>
            <div className="mt-2 text-gray-500 text-sm">
              Client since {company.joinDate || "January 2023"}
            </div>
          </div>
          <StatusBadge status={currentStatus} />
        </div>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {company.description}
        </p>

        {/* Customer Stats Section */}
        <div className="mb-6 bg-gray-50 rounded-lg p-5 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Customer Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">Total Customers</div>
              <div className="text-2xl font-bold text-gray-800">
                {customerCounts.total}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
              <div className="text-sm text-gray-500 mb-1">Active</div>
              <div className="text-2xl font-bold text-emerald-600">
                {customerCounts.onGoing}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
              <div className="text-sm text-gray-500 mb-1">On Hold</div>
              <div className="text-2xl font-bold text-amber-600">
                {customerCounts.onHold}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
              <div className="text-sm text-gray-500 mb-1">Disconnected</div>
              <div className="text-2xl font-bold text-rose-600">
                {customerCounts.disconnected}
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={(e) => handleEditStatusClick(e, company.name)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Update Status
          </button>
          {/* <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </button> */}
        </div>
      </div>

      {/* Status Edit Modal - Enhanced UI */}
      {showEditStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full border shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Update Client Status
              </h3>
              <button
                onClick={() => setShowEditStatusModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Status
              </label>
              <div className="mb-4">
                <StatusBadge status={currentStatus} />
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Status for {companyToEdit}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["On Going", "On Hold", "Disconnected"].map((status) => (
                  <div
                    key={status}
                    onClick={() => setNewStatus(status)}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      newStatus === status
                        ? "bg-blue-50 border-blue-300 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-blue-200"
                    }`}
                  >
                    <StatusBadge status={status} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditStatusModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStatus}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Modules</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 bg-gray-100 shadow-xl rounded-md gap-6">
          {company.technologies &&
            company.technologies.map((tech) => (
              <div
                key={tech.id}
                className={`border rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow ${
                  selectedTechId === tech.id
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "bg-white"
                }`}
                onClick={() => onSelectTech(tech)}
              >
                <div className="flex justify-between items-start p- mb-3">
                  <h4 className="font-semibold text-gray-800">{tech.name}</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditTech(tech);
                      }}
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm(
                            `Are you sure you want to delete ${tech.name}?`
                          )
                        ) {
                          onDeleteTech(tech.id);
                        }
                      }}
                      className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {tech.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">
                    {tech.modules?.length || 0} module
                    {tech.modules?.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {selectedTechId && company.technologies && (
          <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Modules for{" "}
                {
                  company.technologies.find((t) => t.id === selectedTechId)
                    ?.name
                }
              </h3>

              {/* Back button for Modules section */}
              <BackButton
                onClick={() => handleBackNavigation("tech")}
                text="Back to Technologies"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-100 shadow-xl p-6 rounded-md gap-6">
              {company.technologies
                .find((t) => t.id === selectedTechId)
                ?.modules?.map((module) => (
                  <div
                    key={module.id}
                    className={`border rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow ${
                      selectedModuleId === module.id
                        ? "ring-2 ring-blue-500 bg-blue-50"
                        : "bg-white"
                    }`}
                    onClick={() => onSelectModule(module)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-800">
                        {module.name}
                      </h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditModule(module);
                          }}
                          className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              window.confirm(
                                `Are you sure you want to delete ${module.name}?`
                              )
                            ) {
                              onDeleteModule(module.id);
                            }
                          }}
                          className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {module.description}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">
                        {module.teams?.length || 0} team
                        {module.teams?.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {selectedModuleId && selectedTechId && company.technologies && (
          <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Teams for{" "}
                {
                  company.technologies
                    .find((t) => t.id === selectedTechId)
                    ?.modules?.find((m) => m.id === selectedModuleId)?.name
                }
              </h3>

              {/* Back button for Teams section */}
              <BackButton
                onClick={() => handleBackNavigation("module")}
                text="Back to Modules"
              />
            </div>

            <div className="overflow-hidden shadow-xl bg-gray-100 ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lead
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Members
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {company.technologies
                    .find((t) => t.id === selectedTechId)
                    ?.modules?.find((m) => m.id === selectedModuleId)
                    ?.teams?.map((team) => (
                      <tr key={team.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {team.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {team.lead}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {team.memberCount || 0} members
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => onEditTeam(team)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to delete ${team.name}?`
                                )
                              ) {
                                onDeleteTeam(team.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;
