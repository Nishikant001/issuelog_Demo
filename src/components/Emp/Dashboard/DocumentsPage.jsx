import React from 'react'
import { 
    
    FileText
  
  } from 'lucide-react';
// Documents Component
const DocumentsPage = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Document Library</h2>
          <div className="flex space-x-3">
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md">Filter</button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">Upload</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Employee Handbook', type: 'PDF', size: '2.4 MB', modified: 'Oct 15, 2025' },
            { name: 'Project Requirements', type: 'DOCX', size: '1.8 MB', modified: 'Oct 10, 2025' },
            { name: 'Financial Report Q3', type: 'XLSX', size: '3.2 MB', modified: 'Oct 5, 2025' },
            { name: 'Brand Guidelines', type: 'PDF', size: '4.5 MB', modified: 'Sep 28, 2025' },
            { name: 'Marketing Strategy', type: 'PPTX', size: '6.2 MB', modified: 'Sep 25, 2025' },
            { name: 'Product Roadmap', type: 'PDF', size: '1.5 MB', modified: 'Sep 20, 2025' }
          ].map((doc, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded ${
                  doc.type === 'PDF' ? 'bg-red-100 text-red-600' :
                  doc.type === 'DOCX' ? 'bg-blue-100 text-blue-600' :
                  doc.type === 'XLSX' ? 'bg-green-100 text-green-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  <FileText size={18} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                  <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Modified: {doc.modified}</span>
                <button className="text-blue-600 hover:text-blue-800">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  

export default DocumentsPage
