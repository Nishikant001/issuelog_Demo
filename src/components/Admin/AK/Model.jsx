// App.jsx - Main application component
import React, { useState } from "react";
// import Sidebar from './Sidebar';
import Header from "./Header";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import TechnologyModal from "./TechnologyModal";
import ModuleModal from "./ModuleModal";
import TeamModal from "./TeamModal";
import { initialCompanies } from "./data/initialData";
import Navbar from "../Component/Navbar";
import Dashboard from "../Component/Dashboard";

const Model = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const handleSelectCompany = (companyId) => {
    const company = companies.find((c) => c.id === companyId);
    setSelectedCompany(company);
    setSelectedTech(null);
    setSelectedModule(null);
  };

  const handleAddCompany = (newCompany) => {
    const updatedCompanies = [
      ...companies,
      { ...newCompany, id: Date.now(), technologies: [] },
    ];
    setCompanies(updatedCompanies);
  };

  const handleUpdateCompany = (updatedCompany) => {
    const updatedCompanies = companies.map((company) =>
      company.id === updatedCompany.id ? updatedCompany : company
    );
    setCompanies(updatedCompanies);
    setSelectedCompany(updatedCompany);
  };

  const handleDeleteCompany = (companyId) => {
    const updatedCompanies = companies.filter(
      (company) => company.id !== companyId
    );
    setCompanies(updatedCompanies);
    if (selectedCompany?.id === companyId) {
      setSelectedCompany(null);
    }
  };

  const handleAddTechnology = (technology) => {
    if (!selectedCompany) return;

    const updatedCompany = {
      ...selectedCompany,
      technologies: [
        ...selectedCompany.technologies,
        { ...technology, id: Date.now(), modules: [] },
      ],
    };

    handleUpdateCompany(updatedCompany);
    setIsTechModalOpen(false);
  };

  const handleUpdateTechnology = (updatedTech) => {
    if (!selectedCompany) return;

    const updatedTechnologies = selectedCompany.technologies.map((tech) =>
      tech.id === updatedTech.id ? updatedTech : tech
    );

    const updatedCompany = {
      ...selectedCompany,
      technologies: updatedTechnologies,
    };

    handleUpdateCompany(updatedCompany);
    setSelectedTech(updatedTech);
  };

  const handleDeleteTechnology = (techId) => {
    if (!selectedCompany) return;

    const updatedTechnologies = selectedCompany.technologies.filter(
      (tech) => tech.id !== techId
    );

    const updatedCompany = {
      ...selectedCompany,
      technologies: updatedTechnologies,
    };

    handleUpdateCompany(updatedCompany);
    if (selectedTech?.id === techId) {
      setSelectedTech(null);
      setSelectedModule(null);
    }
  };

  const handleAddModule = (module) => {
    if (!selectedCompany || !selectedTech) return;

    const updatedTech = {
      ...selectedTech,
      modules: [
        ...selectedTech.modules,
        { ...module, id: Date.now(), teams: [] },
      ],
    };

    handleUpdateTechnology(updatedTech);
    setIsModuleModalOpen(false);
  };

  const handleUpdateModule = (updatedModule) => {
    if (!selectedCompany || !selectedTech) return;

    const updatedModules = selectedTech.modules.map((module) =>
      module.id === updatedModule.id ? updatedModule : module
    );

    const updatedTech = {
      ...selectedTech,
      modules: updatedModules,
    };

    handleUpdateTechnology(updatedTech);
    setSelectedModule(updatedModule);
  };

  const handleDeleteModule = (moduleId) => {
    if (!selectedCompany || !selectedTech) return;

    const updatedModules = selectedTech.modules.filter(
      (module) => module.id !== moduleId
    );

    const updatedTech = {
      ...selectedTech,
      modules: updatedModules,
    };

    handleUpdateTechnology(updatedTech);
    if (selectedModule?.id === moduleId) {
      setSelectedModule(null);
    }
  };

  const handleAddTeam = (team) => {
    if (!selectedCompany || !selectedTech || !selectedModule) return;

    const updatedModule = {
      ...selectedModule,
      teams: [...selectedModule.teams, { ...team, id: Date.now() }],
    };

    handleUpdateModule(updatedModule);
    setIsTeamModalOpen(false);
  };

  const handleUpdateTeam = (updatedTeam) => {
    if (!selectedCompany || !selectedTech || !selectedModule) return;

    const updatedTeams = selectedModule.teams.map((team) =>
      team.id === updatedTeam.id ? updatedTeam : team
    );

    const updatedModule = {
      ...selectedModule,
      teams: updatedTeams,
    };

    handleUpdateModule(updatedModule);
  };

  const handleDeleteTeam = (teamId) => {
    if (!selectedCompany || !selectedTech || !selectedModule) return;

    const updatedTeams = selectedModule.teams.filter(
      (team) => team.id !== teamId
    );

    const updatedModule = {
      ...selectedModule,
      teams: updatedTeams,
    };

    handleUpdateModule(updatedModule);
  };

  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  const toggleDashboard = () => {
    setIsDashboardVisible((prevState) => !prevState);
  };

  return (
    <>
      <Dashboard isVisible={isDashboardVisible} />
      <Navbar onToggleDashboard={toggleDashboard} />
      <div className="flex h-screen bg-gray-200 ">
        {/* <Sidebar /> */}
        <div className="flex-1 flex flex-col overflow-hidden mt-20">
          {/* <Header /> */}
          <div className="flex flex-1 overflow-hidden">
            <CompanyList
              companies={companies}
              selectedCompanyId={selectedCompany?.id}
              onSelectCompany={handleSelectCompany}
              onAddCompany={handleAddCompany}
              onUpdateCompany={handleUpdateCompany}
              onDeleteCompany={handleDeleteCompany}
            />
            {selectedCompany && (
              <CompanyDetail
                company={selectedCompany}
                selectedTechId={selectedTech?.id}
                selectedModuleId={selectedModule?.id}
                onSelectTech={setSelectedTech}
                onSelectModule={setSelectedModule}
                onAddTech={() => setIsTechModalOpen(true)}
                onEditTech={(tech) => {
                  setSelectedTech(tech);
                  setIsTechModalOpen(true);
                }}
                onDeleteTech={handleDeleteTechnology}
                onAddModule={() => setIsModuleModalOpen(true)}
                onEditModule={(module) => {
                  setSelectedModule(module);
                  setIsModuleModalOpen(true);
                }}
                onDeleteModule={handleDeleteModule}
                onAddTeam={() => setIsTeamModalOpen(true)}
                onEditTeam={(team) => {
                  // Set the selected team and open modal
                  setIsTeamModalOpen(true);
                }}
                onDeleteTeam={handleDeleteTeam}
              />
            )}
          </div>
        </div>

        {/* Modals */}
        <TechnologyModal
          isOpen={isTechModalOpen}
          onClose={() => setIsTechModalOpen(false)}
          onSave={handleAddTechnology}
          technology={selectedTech}
        />

        <ModuleModal
          isOpen={isModuleModalOpen}
          onClose={() => setIsModuleModalOpen(false)}
          onSave={handleAddModule}
          module={selectedModule}
        />

        <TeamModal
          isOpen={isTeamModalOpen}
          onClose={() => setIsTeamModalOpen(false)}
          onSave={handleAddTeam}
          team={selectedModule?.teams?.find(
            (t) => t.id === selectedModule?.selectedTeamId
          )}
        />
      </div>
    </>
  );
};

export default Model;
