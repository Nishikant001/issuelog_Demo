import { useState } from 'react';
import { Plus, Upload } from 'lucide-react';

export function AddNewIssueButton({ onAddIssue }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issueData, setIssueData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    reporter: '',
    screenshot: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIssueData(prev => ({
        ...prev,
        screenshot: file
      }));
      
      // Create a preview URL for the image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert screenshot to a data URL if it exists
    if (issueData.screenshot && previewUrl) {
      const issueWithScreenshot = {
        ...issueData,
        screenshot: previewUrl
      };
      onAddIssue(issueWithScreenshot);
    } else {
      onAddIssue(issueData);
    }
    
    // Reset form and close modal
    setIssueData({
      title: '',
      description: '',
      priority: 'medium',
      reporter: '',
      screenshot: null
    });
    setPreviewUrl(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
      >
        <Plus size={16} />
        <span>New Issue</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Issue</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={issueData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={issueData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  name="priority"
                  value={issueData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reported By</label>
                <input
                  type="text"
                  name="reporter"
                  value={issueData.reporter}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter reporter name"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Screenshot</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {previewUrl ? (
                      <div className="w-full h-full p-2 flex items-center justify-center">
                        <img src={previewUrl} alt="Screenshot preview" className="max-h-full object-contain" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-5">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Click to upload screenshot</p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {previewUrl && (
                  <button 
                    type="button"
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                    onClick={() => {
                      setPreviewUrl(null);
                      setIssueData(prev => ({ ...prev, screenshot: null }));
                    }}
                  >
                    Remove image
                  </button>
                )}
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}