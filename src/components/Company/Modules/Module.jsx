import { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit, Check, X, ChevronDown, ChevronUp, 
  Users, AlertCircle, Layers, Code, Database, BarChart
} from 'lucide-react';

// Toast notification component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center z-50 max-w-md animate-fade-in
      ${type === 'error' ? 'bg-red-50 border-l-4 border-red-500 text-red-700' : 
       type === 'success' ? 'bg-green-50 border-l-4 border-green-500 text-green-700' : 
       'bg-blue-50 border-l-4 border-blue-500 text-blue-700'}`}>
      {type === 'error' && <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />}
      {type === 'success' && <Check className="h-5 w-5 mr-3 flex-shrink-0" />}
      <p className="text-sm flex-grow">{message}</p>
      <button 
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-600"
      >
        <X size={16} />
      </button>
    </div>
  );
};

// TeamModal component (enhanced version)
const TeamModal = ({ isOpen, onClose, onSave, team, usedLeadIds }) => {
  const [formData, setFormData] = useState({ name: '', lead: '', memberCount: 0 });
  const [error, setError] = useState(null);
  const isEditing = !!team;

  useEffect(() => {
    if (team) {
      setFormData({
        id: team.id,
        name: team.name,
        lead: team.lead,
        memberCount: team.memberCount || 0
      });
      setError(null);
    } else {
      setFormData({ name: '', lead: '', memberCount: 0 });
      setError(null);
    }
  }, [team, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate team lead ID (employee ID) isn't already used
    if (!isEditing && usedLeadIds.includes(formData.lead)) {
      setError("This team lead ID is already assigned to another team.");
      return;
    }
    
    // If editing and ID changed, check if new ID is already used elsewhere
    if (isEditing && team.lead !== formData.lead && usedLeadIds.includes(formData.lead)) {
      setError("This team lead ID is already assigned to another team.");
      return;
    }
    
    onSave({
      ...formData,
      id: formData.id || Date.now(),
      memberCount: parseInt(formData.memberCount, 10) || 0
    });
    
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? 'Edit Team' : 'Add New Team'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md flex items-start">
            <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="teamName">
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              placeholder="Enter team name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="teamLead">
              Team Lead ID
            </label>
            <input
              id="teamLead"
              type="text"
              placeholder="Enter employee ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={formData.lead}
              onChange={(e) => setFormData({...formData, lead: e.target.value})}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Employee ID must be unique across all teams
            </p>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="memberCount">
              Team Size
            </label>
            <input
              id="memberCount"
              type="number"
              min="0"
              placeholder="Number of team members"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={formData.memberCount}
              onChange={(e) => setFormData({...formData, memberCount: e.target.value})}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
            >
              {isEditing ? <><Check size={18} className="mr-1" /> Update</> : <><Plus size={18} className="mr-1" /> Add</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Confirmation Modal for deletions
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center"
          >
            <Trash2 size={18} className="mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Technology card component
const TechnologyCard = ({ tech, onEdit, onDelete, children }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg">
      <div className="p-4 sm:p-5 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center">
          <div className="bg-blue-50 p-2 rounded-lg mr-4">
            <Layers className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{tech.name}</h3>
        </div>
        
        <div className="flex items-center">
          <button
            className="mr-2 text-blue-600 hover:text-blue-800 transition-colors p-1"
            onClick={() => onEdit(tech.id)}
            title="Edit Technology"
          >
            <Edit size={18} />
          </button>
          <button
            className="mr-2 text-red-600 hover:text-red-800 transition-colors p-1"
            onClick={() => onDelete(tech.id)}
            title="Delete Technology"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 p-1 rounded-md hover:bg-gray-100 transition-colors"
            title={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 sm:p-5">
          {children}
        </div>
      )}
    </div>
  );
};

// Module card component
const ModuleCard = ({ module, tech, onEdit, onDelete, children }) => {
  const [expanded, setExpanded] = useState(false);
  
  const getModuleIcon = (moduleName) => {
    const name = moduleName.toLowerCase();
    if (name.includes('front') || name.includes('ui') || name.includes('ux')) {
      return <Code className="h-5 w-5 text-indigo-600" />;
    } else if (name.includes('back') || name.includes('api') || name.includes('data')) {
      return <Database className="h-5 w-5 text-indigo-600" />;
    } else if (name.includes('fi') || name.includes('finance') || name.includes('accounting')) {
      return <BarChart className="h-5 w-5 text-indigo-600" />;
    } else {
      return <Layers className="h-5 w-5 text-indigo-600" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:shadow-sm">
      <div className="p-3 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-white">
        <div className="flex items-center">
          <div className="bg-indigo-50 p-1.5 rounded-md mr-3">
            {getModuleIcon(module.name)}
          </div>
          <h4 className="font-medium text-gray-800">{module.name}</h4>
          <div className="ml-3 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full">
            {module.teams.length} {module.teams.length === 1 ? 'team' : 'teams'}
          </div>
        </div>
        
        <div className="flex items-center">
          <button
            className="mr-1 text-indigo-600 hover:text-indigo-800 transition-colors p-1"
            onClick={() => onEdit(tech.id, module.id)}
            title="Edit Module"
          >
            <Edit size={16} />
          </button>
          <button
            className="mr-1 text-red-600 hover:text-red-800 transition-colors p-1"
            onClick={() => onDelete(tech.id, module.id)}
            title="Delete Module"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 p-1 rounded-md hover:bg-indigo-100 transition-colors"
            title={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-3 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

// Main Component for Technology Management
export default function TechnologyManagement() {
  // Initial data for one company
  const initialCompanyData = {
    id: 1,
    name: "Tech Solutions Inc",
    technologies: [
      {
        id: 1,
        name: 'SAP',
        modules: [
          { 
            id: 1, 
            name: 'FI', 
            teams: [
              { id: 101, name: 'Finance Team', lead: 'EMP001', memberCount: 5 },
              { id: 102, name: 'Accounting Team', lead: 'EMP002', memberCount: 3 }
            ] 
          },
          { 
            id: 2, 
            name: 'SD', 
            teams: [
              { id: 103, name: 'Sales Team', lead: 'EMP003', memberCount: 7 },
              { id: 104, name: 'Distribution Team', lead: 'EMP004', memberCount: 4 }
            ] 
          },
          { 
            id: 3, 
            name: 'MM', 
            teams: [
              { id: 105, name: 'Materials Management Team', lead: 'EMP005', memberCount: 6 }
            ] 
          }
        ]
      },
      {
        id: 2,
        name: 'Web Application',
        modules: [
          { 
            id: 1, 
            name: 'Frontend', 
            teams: [
              { id: 106, name: 'UI Team', lead: 'EMP006', memberCount: 4 },
              { id: 107, name: 'UX Team', lead: 'EMP007', memberCount: 3 }
            ] 
          },
          { 
            id: 2, 
            name: 'Backend', 
            teams: [
              { id: 108, name: 'API Team', lead: 'EMP008', memberCount: 5 },
              { id: 109, name: 'Database Team', lead: 'EMP009', memberCount: 3 }
            ] 
          }
        ]
      }
    ]
  };

  // State variables
  const [companyData, setCompanyData] = useState(initialCompanyData);
  const [newTech, setNewTech] = useState({ name: '' });
  const [newModule, setNewModule] = useState({ techId: null, name: '' });
  const [editingTech, setEditingTech] = useState(null);
  const [editingModule, setEditingModule] = useState(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [currentTeamData, setCurrentTeamData] = useState(null);
  const [currentModuleId, setCurrentModuleId] = useState(null);
  const [currentTechId, setCurrentTechId] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  
  // Get all used team lead IDs for validation
  const getAllUsedLeadIds = (excludeTeamId = null) => {
    const usedIds = [];
    
    companyData.technologies.forEach(tech => {
      tech.modules.forEach(module => {
        module.teams.forEach(team => {
          // If we're editing a team, exclude its own ID from the check
          if (team.id !== excludeTeamId) {
            usedIds.push(team.lead);
          }
        });
      });
    });
    
    return usedIds;
  };

  useEffect(() => {
    // Load company data from local storage if available
    const savedData = localStorage.getItem('companyTechData');
    if (savedData) {
      setCompanyData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Save company data to local storage whenever it changes
    localStorage.setItem('companyTechData', JSON.stringify(companyData));
  }, [companyData]);

  // Show toast notification
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Close toast notification
  const closeToast = () => {
    setToast(null);
  };

  // Add a new technology
  const addTechnology = () => {
    if (newTech.name.trim() === '') return;
    
    const newTechObj = {
      id: Date.now(),
      name: newTech.name,
      modules: []
    };
    
    setCompanyData({
      ...companyData,
      technologies: [...companyData.technologies, newTechObj]
    });
    
    setNewTech({ name: '' });
    showToast(`${newTech.name} technology added successfully`, 'success');
  };

  // Confirm technology deletion
  const confirmDeleteTechnology = (techId) => {
    const tech = companyData.technologies.find(t => t.id === techId);
    setConfirmDialog({
      title: 'Delete Technology',
      message: `Are you sure you want to delete "${tech.name}"? This will also delete all its modules and teams.`,
      onConfirm: () => deleteTechnology(techId)
    });
  };

  // Delete a technology
  const deleteTechnology = (techId) => {
    const tech = companyData.technologies.find(t => t.id === techId);
    setCompanyData({
      ...companyData,
      technologies: companyData.technologies.filter(t => t.id !== techId)
    });
    showToast(`${tech.name} technology deleted`, 'info');
  };

  // Start editing technology
  const startEditTechnology = (techId) => {
    const tech = companyData.technologies.find(t => t.id === techId);
    setEditingTech({ id: techId, name: tech.name });
  };

  // Cancel editing technology
  const cancelEditTechnology = () => {
    setEditingTech(null);
  };

  // Save edited technology
  const saveEditTechnology = () => {
    if (editingTech.name.trim() === '') return;
    
    setCompanyData({
      ...companyData,
      technologies: companyData.technologies.map(tech => 
        tech.id === editingTech.id ? { ...tech, name: editingTech.name } : tech
      )
    });
    
    showToast('Technology updated successfully', 'success');
    setEditingTech(null);
  };

  // Add a new module to a technology
  const addModule = (techId) => {
    if (newModule.name.trim() === '') return;
    
    const newModuleObj = {
      id: Date.now(),
      name: newModule.name,
      teams: []
    };
    
    setCompanyData({
      ...companyData,
      technologies: companyData.technologies.map(tech =>
        tech.id === techId ?
          { ...tech, modules: [...tech.modules, newModuleObj] } :
          tech
      )
    });
    
    showToast(`${newModule.name} module added successfully`, 'success');
    setNewModule({ techId: null, name: '' });
  };

  // Confirm module deletion
  const confirmDeleteModule = (techId, moduleId) => {
    const tech = companyData.technologies.find(t => t.id === techId);
    const module = tech.modules.find(m => m.id === moduleId);
    setConfirmDialog({
      title: 'Delete Module',
      message: `Are you sure you want to delete "${module.name}" module? This will also delete all its teams.`,
      onConfirm: () => deleteModule(techId, moduleId)
    });
  };

  // Delete a module
  const deleteModule = (techId, moduleId) => {
    const tech = companyData.technologies.find(t => t.id === techId);
    const module = tech.modules.find(m => m.id === moduleId);
    
    setCompanyData({
      ...companyData,
      technologies: companyData.technologies.map(tech =>
        tech.id === techId ?
          { ...tech, modules: tech.modules.filter(m => m.id !== moduleId) } :
          tech
      )
    });
    
    showToast(`${module.name} module deleted`, 'info');
  };

  // Start editing module
  const startEditModule = (techId, moduleId) => {
    const tech = companyData.technologies.find(t => t.id === techId);
    const module = tech.modules.find(m => m.id === moduleId);
    setEditingModule({ techId, moduleId, name: module.name });
  };

  // Cancel editing module
  const cancelEditModule = () => {
    setEditingModule(null);
  };

  // Save edited module
  const saveEditModule = () => {
    if (editingModule.name.trim() === '') return;
    
    setCompanyData({
      ...companyData,
      technologies: companyData.technologies.map(tech =>
        tech.id === editingModule.techId ?
          { 
            ...tech, 
            modules: tech.modules.map(module =>
              module.id === editingModule.moduleId ?
                { ...module, name: editingModule.name } :
                module
            )
          } :
          tech
      )
    });
    
    showToast('Module updated successfully', 'success');
    setEditingModule(null);
  };

  // Open team modal for adding a new team
  const openAddTeamModal = (techId, moduleId) => {
    setCurrentTeamData(null);
    setCurrentModuleId(moduleId);
    setCurrentTechId(techId);
    setIsTeamModalOpen(true);
  };

  // Open team modal for editing an existing team
  const openEditTeamModal = (techId, moduleId, team) => {
    setCurrentTeamData(team);
    setCurrentModuleId(moduleId);
    setCurrentTechId(techId);
    setIsTeamModalOpen(true);
  };

  // Save team (add new or update existing)
  const saveTeam = (teamData) => {
    const techId = currentTechId;
    const moduleId = currentModuleId;
    
    if (teamData.id && currentTeamData) {
      // Update existing team
      setCompanyData({
        ...companyData,
        technologies: companyData.technologies.map(tech =>
          tech.id === techId ?
            { 
              ...tech, 
              modules: tech.modules.map(module =>
                module.id === moduleId ?
                  { 
                    ...module, 
                    teams: module.teams.map(team =>
                      team.id === teamData.id ? teamData : team
                    )
                  } :
                  module
              )
            } :
            tech
        )
      });
      
      showToast(`${teamData.name} team updated successfully`, 'success');
    } else {
      // Add new team
      setCompanyData({
        ...companyData,
        technologies: companyData.technologies.map(tech =>
          tech.id === techId ?
            { 
              ...tech, 
              modules: tech.modules.map(module =>
                module.id === moduleId ?
                  { 
                    ...module, 
                    teams: [...module.teams, teamData]
                  } :
                  module
              )
            } :
            tech
        )
      });
      
      showToast(`${teamData.name} team added successfully`, 'success');
    }
    
    setIsTeamModalOpen(false);
  };

  // Confirm team deletion
  const confirmDeleteTeam = (techId, moduleId, teamId) => {
    const tech = companyData.technologies.find(t => t.id === techId);
    const module = tech.modules.find(m => m.id === moduleId);
    const team = module.teams.find(t => t.id === teamId);
    
    setConfirmDialog({
      title: 'Delete Team',
      message: `Are you sure you want to delete "${team.name}" team?`,
      onConfirm: () => deleteTeam(techId, moduleId, teamId)
    });
  };

  // Delete a team
  const deleteTeam = (techId, moduleId, teamId) => {
    const tech = companyData.technologies.find(t => t.id === techId);
    const module = tech.modules.find(m => m.id === moduleId);
    const team = module.teams.find(t => t.id === teamId);
    
    setCompanyData({
      ...companyData,
      technologies: companyData.technologies.map(tech =>
        tech.id === techId ?
          { 
            ...tech, 
            modules: tech.modules.map(module =>
              module.id === moduleId ?
                { 
                  ...module, 
                  teams: module.teams.filter(t => t.id !== teamId)
                } :
                module
            )
          } :
          tech
      )
    });
    
    showToast(`${team.name} team deleted`, 'info');
  };

  // Calculate some stats
  const stats = {
    technologies: companyData.technologies.length,
    modules: companyData.technologies.reduce((acc, tech) => acc + tech.modules.length, 0),
    teams: companyData.technologies.reduce((acc, tech) => 
      acc + tech.modules.reduce((macc, module) => macc + module.teams.length, 0), 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header & Dashboard */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="  px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-blue-600 rounded-lg p-2 mr-3">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{companyData.name}</h1>
                <p className="text-sm text-gray-500">Technology Management Portal</p>
              </div>
            </div>
            <div className="flex space-x-2 text-sm text-gray-600">
              <div className="bg-blue-50 rounded-lg px-3 py-1.5 flex items-center">
                <span className="font-medium text-blue-700 mr-1">{stats.technologies}</span> Technologies
              </div>
              <div className="bg-indigo-50 rounded-lg px-3 py-1.5 flex items-center">
                <span className="font-medium text-indigo-700 mr-1">{stats.modules}</span> Modules
              </div>
              <div className="bg-purple-50 rounded-lg px-3 py-1.5 flex items-center">
                <span className="font-medium text-purple-700 mr-1">{stats.teams}</span> Teams
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="  px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Technology Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Technology</h2>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Technology Name (e.g. SAP, Adobe, Web Application)"
              value={newTech.name}
              onChange={(e) => setNewTech({ name: e.target.value })}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center"
              onClick={addTechnology}
            >
              <Plus size={18} className="mr-1" /> Add Technology
            </button>
          </div>
        </div>

        {/* Technologies Section */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Technologies</h2>
        
        {companyData.technologies.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Layers size={48} className="text-gray-300 mb-3" />
              <p className="text-lg">No technologies added yet</p>
              <p className="text-sm mt-1">Start by adding your first technology using the form above</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {companyData.technologies.map(tech => (
              <TechnologyCard 
                key={tech.id} 
                tech={tech} 
                onEdit={startEditTechnology}
                onDelete={confirmDeleteTechnology}
              >
                {/* Technology Editing Form */}
                {editingTech && editingTech.id === tech.id ? (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-3">Edit Technology</h4>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="flex-grow px-3 py-2 border border-blue-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={editingTech.name}
                        onChange={(e) => setEditingTech({...editingTech, name: e.target.value})}
                      />
                      <button
                        className="bg-blue-600 text-white px-3 py-2 rounded-r-none rounded-l-none border-l-0 border border-blue-600 hover:bg-blue-700 transition-colors flex items-center"
                        onClick={saveEditTechnology}
                      >
                        <Check size={16} className="mr-1" /> Save
                      </button>
                      <button
                        className="bg-gray-100 text-gray-700 px-3 py-2 rounded-l-none rounded-r-lg border border-gray-300 hover:bg-gray-200 transition-colors flex items-center"
                        onClick={cancelEditTechnology}
                      >
                        <X size={16} className="mr-1" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : null}
                
                {/* Add Module Section */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Add New Module</h4>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Module Name (e.g. Frontend, Backend, FI, MM)"
                      value={newModule.techId === tech.id ? newModule.name : ''}
                      onChange={(e) => setNewModule({ techId: tech.id, name: e.target.value })}
                    />
                    <button
                      className="bg-indigo-600 text-white px-3 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors flex items-center"
                      onClick={() => addModule(tech.id)}
                    >
                      <Plus size={16} className="mr-1" /> Add Module
                    </button>
                  </div>
                </div>
                
                {/* Modules List */}
                {tech.modules.length === 0 ? (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No modules added yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tech.modules.map(module => (
                      <ModuleCard 
                        key={module.id} 
                        module={module} 
                        tech={tech}
                        onEdit={startEditModule}
                        onDelete={confirmDeleteModule}
                      >
                        {/* Module Editing Form */}
                        {editingModule && editingModule.techId === tech.id && editingModule.moduleId === module.id ? (
                          <div className="mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                            <h5 className="font-medium text-indigo-800 mb-2">Edit Module</h5>
                            <div className="flex items-center">
                              <input
                                type="text"
                                className="flex-grow px-3 py-1.5 border border-indigo-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={editingModule.name}
                                onChange={(e) => setEditingModule({...editingModule, name: e.target.value})}
                              />
                              <button
                                className="bg-indigo-600 text-white px-3 py-1.5 rounded-r-none rounded-l-none border-l-0 border border-indigo-600 hover:bg-indigo-700 transition-colors flex items-center"
                                onClick={saveEditModule}
                              >
                                <Check size={16} className="mr-1" /> Save
                              </button>
                              <button
                                className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-l-none rounded-r-lg border border-gray-300 hover:bg-gray-200 transition-colors flex items-center"
                                onClick={cancelEditModule}
                              >
                                <X size={16} className="mr-1" /> Cancel
                              </button>
                            </div>
                          </div>
                        ) : null}
                        
                        {/* Teams Section */}
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <h5 className="font-medium text-gray-700">Teams</h5>
                            <button
                              className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm hover:bg-purple-200 transition-colors flex items-center"
                              onClick={() => openAddTeamModal(tech.id, module.id)}
                            >
                              <Plus size={14} className="mr-1" /> Add Team
                            </button>
                          </div>
                          
                          {module.teams.length === 0 ? (
                            <div className="text-center p-3 bg-gray-50 rounded-lg text-sm">
                              <p className="text-gray-500">No teams assigned yet</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {module.teams.map(team => (
                                <div key={team.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                                  <div className="flex items-center">
                                    <div className="bg-purple-100 p-1.5 rounded-md mr-3">
                                      <Users className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <div>
                                      <h6 className="font-medium text-gray-800">{team.name}</h6>
                                      <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                        <span className="mr-2">Lead: {team.lead}</span>
                                        <span>{team.memberCount} members</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex">
                                    <button
                                      className="text-purple-600 hover:text-purple-800 transition-colors p-1 mr-1"
                                      onClick={() => openEditTeamModal(tech.id, module.id, team)}
                                      title="Edit Team"
                                    >
                                      <Edit size={16} />
                                    </button>
                                    <button
                                      className="text-red-600 hover:text-red-800 transition-colors p-1"
                                      onClick={() => confirmDeleteTeam(tech.id, module.id, team.id)}
                                      title="Delete Team"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </ModuleCard>
                    ))}
                  </div>
                )}
              </TechnologyCard>
            ))}
          </div>
        )}
      </main>
      
      {/* Team Modal */}
      <TeamModal 
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onSave={saveTeam}
        team={currentTeamData}
        usedLeadIds={getAllUsedLeadIds(currentTeamData?.id)}
      />
      
      {/* Confirmation Dialog */}
      {confirmDialog && (
        <ConfirmationModal
          isOpen={!!confirmDialog}
          onClose={() => setConfirmDialog(null)}
          onConfirm={confirmDialog.onConfirm}
          title={confirmDialog.title}
          message={confirmDialog.message}
        />
      )}
      
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
}