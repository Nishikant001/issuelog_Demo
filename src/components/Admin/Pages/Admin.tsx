import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle,
  Edit,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import Navbar from "../Component/Navbar";
import Dashboard from "../Component/Dashboard";


export default function AdminDashboard() {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Acme Corp",
      email: "admin@acmecorp.com",
      customerLimit: 50,
      currentCustomers: 42,
      pendingRequests: [
        {
          id: 1,
          requestType: "increaseLimit",
          requestedLimit: 75,
          status: "pending",
        },
      ],
    },
    {
      id: 2,
      name: "Globex Inc",
      email: "admin@globex.com",
      customerLimit: 100,
      currentCustomers: 98,
      pendingRequests: [],
    },
    {
      id: 3,
      name: "Wayne Enterprises",
      email: "admin@wayne.com",
      customerLimit: 200,
      currentCustomers: 145,
      pendingRequests: [
        {
          id: 2,
          requestType: "emailAccess",
          emails: ["sales@wayne.com", "support@wayne.com"],
          status: "pending",
        },
      ],
    },
  ]);

  const [activeTab, setActiveTab] = useState("companies");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    customerLimit: 50,
    licenseType: "basic",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);

  // License tier options
  const licenseTiers = [
    { id: "basic", name: "Basic", defaultLimit: 50, price: "$99/month" },
    {
      id: "professional",
      name: "Professional",
      defaultLimit: 200,
      price: "$299/month",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      defaultLimit: 500,
      price: "$799/month",
    },
    {
      id: "custom",
      name: "Custom",
      defaultLimit: null,
      price: "Custom pricing",
    },
  ];

  // Filter companies based on search term
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count pending requests
  const pendingRequestsCount = companies.reduce(
    (sum, company) =>
      sum +
      company.pendingRequests.filter((req) => req.status === "pending").length,
    0
  );

  function handleApproveRequest(companyId, requestId) {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) => {
        if (company.id === companyId) {
          const updatedRequests = company.pendingRequests.map((req) => {
            if (req.id === requestId) {
              // If it's a limit increase request
              if (req.requestType === "increaseLimit") {
                return { ...req, status: "approved" };
              }
              // If it's an email access request
              else if (req.requestType === "emailAccess") {
                return { ...req, status: "approved" };
              }
              return req;
            }
            return req;
          });

          // Apply the approved changes
          let updatedCompany = { ...company, pendingRequests: updatedRequests };
          const request = company.pendingRequests.find(
            (r) => r.id === requestId
          );

          if (request && request.requestType === "increaseLimit") {
            updatedCompany.customerLimit = request.requestedLimit;
          }

          return updatedCompany;
        }
        return company;
      })
    );

    addNotification("Request approved successfully");
  }

  function handleRejectRequest(companyId, requestId) {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) => {
        if (company.id === companyId) {
          const updatedRequests = company.pendingRequests.map((req) => {
            if (req.id === requestId) {
              return { ...req, status: "rejected" };
            }
            return req;
          });
          return { ...company, pendingRequests: updatedRequests };
        }
        return company;
      })
    );

    addNotification("Request rejected");
  }

  function handleEditCompany(company) {
    setEditFormData({
      id: company.id,
      name: company.name,
      email: company.email,
      customerLimit: company.customerLimit,
    });
    setIsEditModalOpen(true);
  }

  function handleSaveEdit() {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === editFormData.id
          ? { ...company, ...editFormData }
          : company
      )
    );
    setIsEditModalOpen(false);
    addNotification(`Company "${editFormData.name}" updated successfully`);
  }

  function handleAddCompanyOpen() {
    setAddFormData({
      name: "",
      email: "",
      customerLimit: 50,
      licenseType: "basic",
    });
    setIsAddModalOpen(true);
  }

  function handleAddCompany() {
    if (!addFormData.name || !addFormData.email) {
      addNotification("Company name and email are required", "error");
      return;
    }

    const newCompany = {
      id: Date.now(),
      name: addFormData.name,
      email: addFormData.email,
      customerLimit: addFormData.customerLimit,
      currentCustomers: 0,
      licenseType: addFormData.licenseType,
      pendingRequests: [],
    };

    setCompanies((prev) => [...prev, newCompany]);
    setIsAddModalOpen(false);
    addNotification(`Company "${addFormData.name}" added successfully`);
  }

  function handleLicenseTierChange(tierId) {
    const selectedTier = licenseTiers.find((tier) => tier.id === tierId);

    setAddFormData((prev) => ({
      ...prev,
      licenseType: tierId,
      customerLimit:
        tierId === "custom" ? prev.customerLimit : selectedTier.defaultLimit,
    }));
  }

  function addNotification(message, type = "success") {
    const newNotification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((n) => n.id !== newNotification.id)
      );
    }, 5000);
  }
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  const toggleDashboard = () => {
    setIsDashboardVisible((prevState) => !prevState);
  };

  return (
    <>
      <Dashboard isVisible={isDashboardVisible} />
      <Navbar onToggleDashboard={toggleDashboard} />
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    LicenseAdmin
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700">Admin Dashboard</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-md bg-blue-100 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Companies
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {companies.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-md bg-green-100 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Active Companies
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      companies.filter(
                        (c) => c.currentCustomers < c.customerLimit
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-md bg-yellow-100 text-yellow-600">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Pending Requests
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {pendingRequestsCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("companies")}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "companies"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Companies
              </button>
              <button
                onClick={() => setActiveTab("requests")}
                className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === "requests"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pending Requests
                {pendingRequestsCount > 0 && (
                  <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                    {pendingRequestsCount}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Companies Tab */}
          {activeTab === "companies" && (
            <div className="mt-6">
              <div className="flex justify-between mb-6">
                <div className="relative w-64">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="bg-blue-600 px-4 py-2 rounded-md text-white flex items-center"
                  onClick={handleAddCompanyOpen}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Company
                </button>
              </div>

              {/* Companies Table */}
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Company
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Customer Limit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Current Customers
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Pending Requests
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCompanies.map((company) => (
                      <tr key={company.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {company.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {company.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {company.customerLimit}
                          </div>
                          {company.licenseType && (
                            <div className="text-xs text-gray-500">
                              {licenseTiers.find(
                                (t) => t.id === company.licenseType
                              )?.name || "Custom"}{" "}
                              Plan
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Users className="h-4 w-4 mr-1 text-gray-400" />
                            {company.currentCustomers}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {company.currentCustomers < company.customerLimit ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Limit Reached
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {company.pendingRequests.filter(
                            (req) => req.status === "pending"
                          ).length > 0 ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {
                                company.pendingRequests.filter(
                                  (req) => req.status === "pending"
                                ).length
                              }{" "}
                              Pending
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500">None</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditCompany(company)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setSelectedCompany(company)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pending Requests Tab */}
          {activeTab === "requests" && (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Pending Requests
              </h2>

              {companies.some((c) =>
                c.pendingRequests.some((r) => r.status === "pending")
              ) ? (
                <div className="space-y-6">
                  {companies.map(
                    (company) =>
                      company.pendingRequests.filter(
                        (req) => req.status === "pending"
                      ).length > 0 && (
                        <div
                          key={company.id}
                          className="bg-white shadow overflow-hidden rounded-lg"
                        >
                          <div className="px-4 py-5 sm:px-6 flex justify-between">
                            <div>
                              <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {company.name}
                              </h3>
                              <p className="max-w-2xl text-sm text-gray-500">
                                {company.email}
                              </p>
                            </div>
                            <div>
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                Current Limit: {company.customerLimit}
                              </span>
                            </div>
                          </div>
                          <div className="border-t border-gray-200">
                            <div className="divide-y divide-gray-200">
                              {company.pendingRequests
                                .filter((req) => req.status === "pending")
                                .map((request) => (
                                  <div
                                    key={request.id}
                                    className="px-4 py-5 sm:px-6"
                                  >
                                    {request.requestType ===
                                      "increaseLimit" && (
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <p className="text-sm font-medium text-gray-900">
                                            Customer Limit Increase Request
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            Current: {company.customerLimit} →
                                            Requested: {request.requestedLimit}
                                          </p>
                                        </div>
                                        <div className="flex space-x-3">
                                          <button
                                            onClick={() =>
                                              handleRejectRequest(
                                                company.id,
                                                request.id
                                              )
                                            }
                                            className="bg-white text-red-500 border border-red-300 px-3 py-1 rounded flex items-center text-sm"
                                          >
                                            <X className="h-4 w-4 mr-1" />
                                            Reject
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleApproveRequest(
                                                company.id,
                                                request.id
                                              )
                                            }
                                            className="bg-green-600 text-white px-3 py-1 rounded flex items-center text-sm"
                                          >
                                            <CheckCircle className="h-4 w-4 mr-1" />
                                            Approve
                                          </button>
                                        </div>
                                      </div>
                                    )}

                                    {request.requestType === "emailAccess" && (
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <p className="text-sm font-medium text-gray-900">
                                            Email Access Request
                                          </p>
                                          <div className="mt-1">
                                            {request.emails.map(
                                              (email, index) => (
                                                <span
                                                  key={index}
                                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mr-2"
                                                >
                                                  {email}
                                                </span>
                                              )
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex space-x-3">
                                          <button
                                            onClick={() =>
                                              handleRejectRequest(
                                                company.id,
                                                request.id
                                              )
                                            }
                                            className="bg-white text-red-500 border border-red-300 px-3 py-1 rounded flex items-center text-sm"
                                          >
                                            <X className="h-4 w-4 mr-1" />
                                            Reject
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleApproveRequest(
                                                company.id,
                                                request.id
                                              )
                                            }
                                            className="bg-green-600 text-white px-3 py-1 rounded flex items-center text-sm"
                                          >
                                            <CheckCircle className="h-4 w-4 mr-1" />
                                            Approve
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              ) : (
                <div className="bg-white p-6 text-center rounded-lg shadow">
                  <p className="text-gray-500">
                    No pending requests at this time.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Company Detail Modal */}
          {selectedCompany && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedCompany.name} Details
                  </h3>
                  <button
                    onClick={() => setSelectedCompany(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="px-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-gray-500">
                        Company Information
                      </h4>
                      <p className="mt-2 text-sm text-gray-900">
                        <span className="font-medium">Email:</span>{" "}
                        {selectedCompany.email}
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        <span className="font-medium">Customer Limit:</span>{" "}
                        {selectedCompany.customerLimit}
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        <span className="font-medium">Current Customers:</span>{" "}
                        {selectedCompany.currentCustomers}
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        <span className="font-medium">Status:</span>
                        {selectedCompany.currentCustomers <
                        selectedCompany.customerLimit ? (
                          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            Limit Reached
                          </span>
                        )}
                      </p>
                      {selectedCompany.licenseType && (
                        <p className="mt-1 text-sm text-gray-900">
                          <span className="font-medium">License Plan:</span>
                          <span className="ml-1">
                            {licenseTiers.find(
                              (t) => t.id === selectedCompany.licenseType
                            )?.name || "Custom"}
                          </span>
                        </p>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500">License Usage</h4>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">
                            {selectedCompany.currentCustomers} of{" "}
                            {selectedCompany.customerLimit} customers
                          </span>
                          <span className="text-gray-700">
                            {Math.round(
                              (selectedCompany.currentCustomers /
                                selectedCompany.customerLimit) *
                                100
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              selectedCompany.currentCustomers /
                                selectedCompany.customerLimit >
                              0.9
                                ? "bg-red-500"
                                : "bg-blue-500"
                            }`}
                            style={`{ width: ${Math.min(
                              100,
                              (selectedCompany.currentCustomers /
                                selectedCompany.customerLimit) *
                                100
                            )}% }`}
                          ></div>
                        </div>
                        {selectedCompany.currentCustomers >=
                          selectedCompany.customerLimit && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Company has reached customer limit
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Request History */}
                  <div className="mt-6">
                    <h4 className="text-sm text-gray-500 mb-2">
                      Request History
                    </h4>
                    {selectedCompany.pendingRequests.length > 0 ? (
                      <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {selectedCompany.pendingRequests.map((request) => (
                          <div key={request.id} className="p-4">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {request.requestType === "increaseLimit"
                                    ? "Customer Limit Increase"
                                    : "Email Access"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {`request.requestType === 'increaseLimit' 
                                  ? Requested: ${
                                    request.requestedLimit
                                  } (Current: ${selectedCompany.customerLimit})
                                  : Emails: ${request.emails.join(", ")}
                                `}
                                </p>
                              </div>
                              <div>
                                <span
                                  className={`px-2 py-0.5 text-xs rounded-full ${
                                    request.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : request.status === "approved"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {request.status.charAt(0).toUpperCase() +
                                    request.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No request history
                      </p>
                    )}
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={() => setSelectedCompany(null)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Company Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    Edit Company
                  </h3>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={editFormData.name || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={editFormData.email || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="customerLimit"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Customer Limit
                      </label>
                      <input
                        type="number"
                        id="customerLimit"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={editFormData.customerLimit || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            customerLimit: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Company Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    Add New Company
                  </h3>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={addFormData.name}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="companyEmail"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="companyEmail"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={addFormData.email}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="licenseTier"
                        className="block text-sm font-medium text-gray-700"
                      >
                        License Tier
                      </label>
                      <select
                        id="licenseTier"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={addFormData.licenseType}
                        onChange={(e) =>
                          handleLicenseTierChange(e.target.value)
                        }
                      >
                        {licenseTiers.map((tier) => (
                          <option key={tier.id} value={tier.id}>
                            {tier.name} - {tier.price}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="customerLimit"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Customer Limit
                      </label>
                      <input
                        type="number"
                        id="customerLimit"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={addFormData.customerLimit}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            customerLimit: parseInt(e.target.value),
                          })
                        }
                        disabled={addFormData.licenseType !== "custom"}
                      />
                      {addFormData.licenseType !== "custom" && (
                        <p className="mt-1 text-xs text-gray-500">
                          Customer limit is predefined for this license tier.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCompany}
                    className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Add Company
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          <div className="fixed bottom-0 right-0 p-6 space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 rounded-lg shadow-lg flex items-center justify-between ${
                  notification.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
                style={{ minWidth: "300px" }}
              >
                <div className="flex items-center">
                  {notification.type === "success" ? (
                    <CheckCircle className="h-5 w-5 mr-3" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-3" />
                  )}
                  <span>{notification.message}</span>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) =>
                      prev.filter((n) => n.id !== notification.id)
                    )
                  }
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
