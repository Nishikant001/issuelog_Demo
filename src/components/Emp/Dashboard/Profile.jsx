import { useState } from 'react';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, CheckCircle, AlertCircle, Edit2, Save, Upload } from 'lucide-react';

// Sample employee data
const initialEmployeeData = {
  empId: "EMP12345",
  name: "Alex Morgan",
  position: "Senior Developer",
  department: "Engineering",
  joinDate: "2020-05-15",
  performance: {
    currentRating: 4.2,
    history: [
      { month: 'Jan', rating: 3.8 },
      { month: 'Feb', rating: 3.9 },
      { month: 'Mar', rating: 4.0 },
      { month: 'Apr', rating: 4.1 },
      { month: 'May', rating: 4.2 },
    ]
  },
  taskMetrics: {
    assigned: 42,
    completed: 35,
    pending: 7
  },
  issues: [
    { month: 'Jan', assigned: 15, completed: 12, pending: 3 },
    { month: 'Feb', assigned: 18, completed: 15, pending: 3 },
    { month: 'Mar', assigned: 22, completed: 19, pending: 3 },
    { month: 'Apr', assigned: 20, completed: 18, pending: 2 },
    { month: 'May', assigned: 25, completed: 21, pending: 4 }
  ]
};

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState(initialEmployeeData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(initialEmployeeData);
  const [profileImage, setProfileImage] = useState("/api/placeholder/150/150");

  const handleEdit = () => {
    setIsEditing(true);
    setEditedEmployee({...employee});
  };

  const handleSave = () => {
    setEmployee(editedEmployee);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({
      ...editedEmployee,
      [name]: value
    });
  };

  const handleImageUpload = () => {
    // In a real app, this would trigger a file upload
    // For this demo, we'll just use a different placeholder
    setProfileImage(`/api/placeholder/150/150?text=Updated`);
  };

  // Calculate performance metrics
  const calculatePerformanceClass = (rating) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 3.5) return "text-blue-600";
    if (rating >= 2.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Employee Profile Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employee Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <img 
                  src={profileImage} 
                  alt="Employee" 
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <button 
                  onClick={handleImageUpload}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full"
                >
                  <Upload size={16} />
                </button>
              </div>
              
              {!isEditing ? (
                <div className="text-center">
                  <h2 className="text-xl font-bold">{employee.name}</h2>
                  <p className="text-gray-600">{employee.position}</p>
                  <p className="text-gray-500 text-sm">{employee.department}</p>
                </div>
              ) : (
                <div className="text-center w-full mt-2">
                  <input
                    type="text"
                    name="name"
                    value={editedEmployee.name}
                    onChange={handleChange}
                    className="block w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    name="position"
                    value={editedEmployee.position}
                    onChange={handleChange}
                    className="block w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    name="department"
                    value={editedEmployee.department}
                    onChange={handleChange}
                    className="block w-full p-2 border rounded"
                  />
                </div>
              )}
            </div>
            
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between py-2">
                <span className="font-medium">Employee ID:</span>
                <span className="text-gray-600">{employee.empId}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Join Date:</span>
                <span className="text-gray-600">{employee.joinDate}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Current Rating:</span>
                <span className={calculatePerformanceClass(employee.performance.currentRating)}>
                  {employee.performance.currentRating}/5.0
                </span>
              </div>
            </div>
            
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center"
              >
                <Edit2 size={16} className="mr-2" /> Edit Profile
              </button>
            ) : (
              <div className="flex mt-6 gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 text-white py-2 rounded flex items-center justify-center"
                >
                  <Save size={16} className="mr-2" /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-400 text-white py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          
          {/* Performance Graph */}
          <div className="bg-white rounded-lg shadow-md p-6 col-span-2">
            <h2 className="text-xl font-bold mb-4">Performance Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={employee.performance.history}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#3b82f6" 
                    activeDot={{ r: 8 }} 
                    name="Rating" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Issue Metrics Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
            <h2 className="text-xl font-bold mb-4">Current Task Summary</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Clock className="mx-auto text-blue-600 mb-2" />
                <p className="text-gray-600 text-sm">Assigned</p>
                <p className="text-2xl font-bold text-blue-600">{employee.taskMetrics.assigned}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <CheckCircle className="mx-auto text-green-600 mb-2" />
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-600">{employee.taskMetrics.completed}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <AlertCircle className="mx-auto text-yellow-600 mb-2" />
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{employee.taskMetrics.pending}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 mb-2">Completion Rate</h3>
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-green-500"
                  style={{ width: `${(employee.taskMetrics.completed / employee.taskMetrics.assigned) * 100}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-600 mt-1">
                {Math.round((employee.taskMetrics.completed / employee.taskMetrics.assigned) * 100)}%
              </p>
            </div>
          </div>
          
          {/* Issues Trend */}
          <div className="bg-white rounded-lg shadow-md p-6 col-span-2">
            <h2 className="text-xl font-bold mb-4">Issues Tracking</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={employee.issues}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="assigned" name="Assigned" fill="#3b82f6" />
                  <Bar dataKey="completed" name="Completed" fill="#10b981" />
                  <Bar dataKey="pending" name="Pending" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}