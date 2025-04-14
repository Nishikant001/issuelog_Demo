import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import Dashboard from "../Component/Dashboard";

const CompanyModuleManager = () => {
  // Sample data structure
  const [data, setData] = useState({
    SAP: {
      companies: {
        Accenture: {
          status: "On Going",
          projects: {
            "SAP S/4HANA Implementation": {
              issues: {
                "Data Migration Issues": {
                  description:
                    "Issues with migrating legacy data to new system",
                  teams: {
                    "Data Migration Team": {
                      employees: [
                        "John Smith",
                        "Emma Johnson",
                        "Michael Brown",
                      ],
                    },
                    "Integration Team": {
                      employees: [
                        "Sarah Davis",
                        "Robert Wilson",
                        "Jennifer Lee",
                      ],
                    },
                  },
                },
                "Performance Optimization": {
                  description: "System performance issues after implementation",
                  teams: {
                    "Performance Team": {
                      employees: [
                        "David Miller",
                        "Laura Taylor",
                        "James Anderson",
                      ],
                    },
                  },
                },
              },
              customers: [
                "Global Manufacturing Co.",
                "International Retail Inc.",
              ],
            },
            "SAP SuccessFactors Integration": {
              issues: {
                "User Authentication": {
                  description: "SSO implementation challenges",
                  teams: {
                    "Security Team": {
                      employees: [
                        "Patricia Moore",
                        "Thomas Jackson",
                        "Barbara White",
                      ],
                    },
                  },
                },
              },
              customers: [
                "Worldwide Logistics Ltd.",
                "National Healthcare Group",
              ],
            },
          },
        },
        IBM: {
          status: "Disconnected",
          projects: {
            "SAP BW/4HANA Analytics": {
              issues: {
                "Reporting Delays": {
                  description: "Batch processing performance issues",
                  teams: {
                    "Analytics Team": {
                      employees: [
                        "Richard Thompson",
                        "Susan Martinez",
                        "Kevin Clark",
                      ],
                    },
                  },
                },
              },
              customers: ["Financial Services Inc.", "Government Agency"],
            },
          },
        },
      },
    },
    ADOBE: {
      companies: {
        "Deloitte Digital": {
          status: "On Hold",
          projects: {
            "Adobe Experience Manager Implementation": {
              issues: {
                "Content Migration": {
                  description:
                    "Issues with transferring content from legacy CMS",
                  teams: {
                    "Content Team": {
                      employees: [
                        "Michelle Lewis",
                        "Daniel Walker",
                        "Lisa Robinson",
                      ],
                    },
                  },
                },
              },
              customers: ["Media Corporation", "Retail Chain Inc."],
            },
          },
        },
        "Publicis Sapient": {
          status: "On Going",
          projects: {
            "Adobe Analytics Integration": {
              issues: {
                "Tag Management": {
                  description: "Inconsistent tag implementation across sites",
                  teams: {
                    "Analytics Implementation Team": {
                      employees: [
                        "Christopher Green",
                        "Amanda King",
                        "Steven Wright",
                      ],
                    },
                  },
                },
              },
              customers: ["E-commerce Platform", "Travel Agency Group"],
            },
          },
        },
      },
    },
    ANDROID: {
      companies: {
        Cognizant: {
          status: "On Going",
          projects: {
            "Banking App Development": {
              issues: {
                "Biometric Authentication": {
                  description:
                    "Issues with fingerprint scanner on certain devices",
                  teams: {
                    "Mobile Security Team": {
                      employees: [
                        "Jessica Adams",
                        "Brian Campbell",
                        "Karen Mitchell",
                      ],
                    },
                  },
                },
              },
              customers: ["National Bank", "Credit Union Association"],
            },
          },
        },
        TCS: {
          status: "On Hold",
          projects: {
            "Retail Loyalty App": {
              issues: {
                "Push Notification Delivery": {
                  description:
                    "Delayed notifications on specific Android versions",
                  teams: {
                    "Mobile Development Team": {
                      employees: [
                        "Mark Peterson",
                        "Nicole Carter",
                        "Eric Rodriguez",
                      ],
                    },
                  },
                },
              },
              customers: ["Fashion Retailer", "Electronics Chain"],
            },
          },
        },
      },
    },
    WEBAPPLICATIONS: {
      companies: {
        Infosys: {
          status: "Disconnected",
          projects: {
            "Customer Portal Redesign": {
              issues: {
                "Responsive Design Issues": {
                  description: "Layout problems on certain screen sizes",
                  teams: {
                    "Frontend Team": {
                      employees: [
                        "Rebecca Turner",
                        "Justin Phillips",
                        "Olivia Cooper",
                      ],
                    },
                  },
                },
              },
              customers: ["Insurance Provider", "Telecommunications Company"],
            },
          },
        },
        Capgemini: {
          status: "On Going",
          projects: {
            "E-commerce Platform Migration": {
              issues: {
                "Payment Gateway Integration": {
                  description: "Transaction failures during checkout process",
                  teams: {
                    "Payment Systems Team": {
                      employees: [
                        "Andrew Scott",
                        "Melissa Harris",
                        "Jonathan Young",
                      ],
                    },
                    "QA Team": {
                      employees: [
                        "Catherine Evans",
                        "Paul Roberts",
                        "Rachel Morgan",
                      ],
                    },
                  },
                },
              },
              customers: ["Luxury Goods Retailer", "Sporting Goods Company"],
            },
          },
        },
      },
    },
  });

  // State for navigation
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // State for modals
  const [showAddTechModal, setShowAddTechModal] = useState(false);
  const [showEditStatusModal, setShowEditStatusModal] = useState(false);
  const [newTechName, setNewTechName] = useState("");
  const [companyToEdit, setCompanyToEdit] = useState(null);
  const [newStatus, setNewStatus] = useState("On Going");

  // Reset states when selecting a new option
  const handleTechSelect = (tech) => {
    setSelectedTech(tech);
    setSelectedCompany(null);
    setSelectedProject(null);
    setSelectedIssue(null);
    setSelectedTeam(null);
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setSelectedProject(null);
    setSelectedIssue(null);
    setSelectedTeam(null);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setSelectedIssue(null);
    setSelectedTeam(null);
  };

  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
    setSelectedTeam(null);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  // Helper function to count items
  const countCompanies = (tech) => {
    return Object.keys(data[tech].companies).length;
  };

  // Function to handle adding new technology
  const handleAddTech = () => {
    if (newTechName.trim() !== "" && !data[newTechName.toUpperCase()]) {
      const updatedData = {
        ...data,
        [newTechName.toUpperCase()]: {
          companies: {},
        },
      };
      setData(updatedData);
      setNewTechName("");
      setShowAddTechModal(false);
    }
  };

  // Function to open edit status modal
  const handleEditStatusClick = (e, company) => {
    e.stopPropagation();
    setCompanyToEdit(company);
    setNewStatus(data[selectedTech].companies[company].status);
    setShowEditStatusModal(true);
  };

  // Function to save status change
  const handleSaveStatus = () => {
    if (companyToEdit) {
      const updatedData = {
        ...data,
        [selectedTech]: {
          ...data[selectedTech],
          companies: {
            ...data[selectedTech].companies,
            [companyToEdit]: {
              ...data[selectedTech].companies[companyToEdit],
              status: newStatus,
            },
          },
        },
      };
      setData(updatedData);
      setShowEditStatusModal(false);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor;
    switch (status) {
      case "On Going":
        bgColor = "bg-green-100 text-green-800";
        break;
      case "On Hold":
        bgColor = "bg-yellow-100 text-yellow-800";
        break;
      case "Disconnected":
        bgColor = "bg-red-100 text-red-800";
        break;
      default:
        bgColor = "bg-gray-100 text-gray-800";
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}
      >
        {status}
      </span>
    );
  };

  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  const toggleDashboard = () => {
    setIsDashboardVisible((prevState) => !prevState);
  };

  return (
    <>
      <Dashboard isVisible={isDashboardVisible} />
      <Navbar onToggleDashboard={toggleDashboard} />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto mt-25">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Technology</h1>
            <button
              onClick={() => setShowAddTechModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Add New Technology
            </button>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Technologies
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(data).map((tech) => (
                <div
                  key={tech}
                  className={`p-4 rounded-lg shadow cursor-pointer transition-all ${
                    selectedTech === tech
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-blue-50"
                  }`}
                  onClick={() => handleTechSelect(tech)}
                >
                  <div className="font-medium">{tech}</div>
                  <div className="text-sm mt-1">
                    {selectedTech === tech ? (
                      <span className="text-blue-100">
                        {countCompanies(tech)} companies
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        {countCompanies(tech)} companies
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Companies */}
          {selectedTech && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Companies working with {selectedTech}
                </h2>
                <button
                  className="ml-4 text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedTech(null)}
                >
                  ← Back to Technologies
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.keys(data[selectedTech].companies).map((company) => (
                  <div
                    key={company}
                    className={`p-4 rounded-lg shadow cursor-pointer transition-all ${
                      selectedCompany === company
                        ? "bg-indigo-600 text-white"
                        : "bg-white hover:bg-indigo-50"
                    }`}
                    onClick={() => handleCompanySelect(company)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{company}</div>
                      {selectedCompany !== company && (
                        <StatusBadge
                          status={data[selectedTech].companies[company].status}
                        />
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        {selectedCompany === company ? (
                          <span className="text-indigo-100">
                            {
                              Object.keys(
                                data[selectedTech].companies[company].projects
                              ).length
                            }{" "}
                            projects
                          </span>
                        ) : (
                          <span className="text-gray-500">
                            {
                              Object.keys(
                                data[selectedTech].companies[company].projects
                              ).length
                            }{" "}
                            projects
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleEditStatusClick(e, company)}
                        className={`text-xs py-1 px-2 rounded ${
                          selectedCompany === company
                            ? "bg-white text-indigo-600 hover:bg-gray-100"
                            : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                        }`}
                      >
                        Edit Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {selectedCompany && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Projects by {selectedCompany}
                </h2>
                <button
                  className="ml-4 text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedCompany(null)}
                >
                  ← Back to Companies
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(
                  data[selectedTech].companies[selectedCompany].projects
                ).map((project) => (
                  <div
                    key={project}
                    className={`p-6 rounded-lg shadow cursor-pointer transition-all ${
                      selectedProject === project
                        ? "bg-purple-600 text-white"
                        : "bg-white hover:bg-purple-50"
                    }`}
                    onClick={() => handleProjectSelect(project)}
                  >
                    <div className="font-medium text-lg mb-2">{project}</div>

                    <div className="mb-3">
                      <div
                        className={
                          selectedProject === project
                            ? "text-purple-100"
                            : "text-gray-600"
                        }
                      >
                        Issues:{" "}
                        {
                          Object.keys(
                            data[selectedTech].companies[selectedCompany]
                              .projects[project].issues
                          ).length
                        }
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">Customers:</div>
                      <ul
                        className={`text-sm ${
                          selectedProject === project
                            ? "text-purple-100"
                            : "text-gray-500"
                        }`}
                      >
                        {data[selectedTech].companies[selectedCompany].projects[
                          project
                        ].customers.map((customer) => (
                          <li key={customer}>{customer}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Issues */}
          {selectedProject && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Issues in {selectedProject}
                </h2>
                <button
                  className="ml-4 text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedProject(null)}
                >
                  ← Back to Projects
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(
                  data[selectedTech].companies[selectedCompany].projects[
                    selectedProject
                  ].issues
                ).map((issue) => (
                  <div
                    key={issue}
                    className={`p-4 rounded-lg shadow cursor-pointer transition-all ${
                      selectedIssue === issue
                        ? "bg-red-600 text-white"
                        : "bg-white hover:bg-red-50"
                    }`}
                    onClick={() => handleIssueSelect(issue)}
                  >
                    <div className="font-medium">{issue}</div>
                    <div className="text-sm mt-1">
                      {selectedIssue === issue ? (
                        <span className="text-red-100">
                          {
                            Object.keys(
                              data[selectedTech].companies[selectedCompany]
                                .projects[selectedProject].issues[issue].teams
                            ).length
                          }{" "}
                          teams assigned
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          {
                            Object.keys(
                              data[selectedTech].companies[selectedCompany]
                                .projects[selectedProject].issues[issue].teams
                            ).length
                          }{" "}
                          teams assigned
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Issue Details and Teams */}
          {selectedIssue && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Details for {selectedIssue}
                </h2>
                <button
                  className="ml-4 text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedIssue(null)}
                >
                  ← Back to Issues
                </button>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-medium text-lg mb-2">Description</h3>
                <p className="text-gray-700">
                  {
                    data[selectedTech].companies[selectedCompany].projects[
                      selectedProject
                    ].issues[selectedIssue].description
                  }
                </p>
              </div>

              <h3 className="text-lg font-medium mb-4">
                Teams Working on This Issue
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(
                  data[selectedTech].companies[selectedCompany].projects[
                    selectedProject
                  ].issues[selectedIssue].teams
                ).map((team) => (
                  <div
                    key={team}
                    className={`p-4 rounded-lg shadow cursor-pointer transition-all ${
                      selectedTeam === team
                        ? "bg-green-600 text-white"
                        : "bg-white hover:bg-green-50"
                    }`}
                    onClick={() => handleTeamSelect(team)}
                  >
                    <div className="font-medium">{team}</div>
                    <div className="text-sm mt-1">
                      {selectedTeam === team ? (
                        <span className="text-green-100">
                          {
                            data[selectedTech].companies[selectedCompany]
                              .projects[selectedProject].issues[selectedIssue]
                              .teams[team].employees.length
                          }{" "}
                          employees
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          {
                            data[selectedTech].companies[selectedCompany]
                              .projects[selectedProject].issues[selectedIssue]
                              .teams[team].employees.length
                          }{" "}
                          employees
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Members */}
          {selectedTeam && (
            <div>
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Employees in {selectedTeam}
                </h2>
                <button
                  className="ml-4 text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedTeam(null)}
                >
                  ← Back to Teams
                </button>
              </div>
              <div className="bg-white rounded-lg shadow">
                <ul className="divide-y divide-gray-200">
                  {data[selectedTech].companies[selectedCompany].projects[
                    selectedProject
                  ].issues[selectedIssue].teams[selectedTeam].employees.map(
                    (employee) => (
                      <li key={employee} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 font-medium">
                              {employee
                                .split(" ")
                                .map((name) => name[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {employee}
                            </div>
                            <div className="text-sm text-gray-500">
                              Team Member
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Add Technology Modal */}
          {showAddTechModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-medium mb-4">Add New Technology</h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technology Name
                  </label>
                  <input
                    type="text"
                    value={newTechName}
                    onChange={(e) => setNewTechName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter technology name"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddTechModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTech}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Add Technology
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Status Modal */}
          {showEditStatusModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-medium mb-4">
                  Edit Company Status
                </h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status for {companyToEdit}
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="On Going">On Going</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Disconnected">Disconnected</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowEditStatusModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveStatus}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyModuleManager;
