import { useState } from 'react';
import { 
  Bell, User, Moon, Sun, Search, 
  Menu, X, Settings, Home, 
  Users, Folder, LogOut, ChevronDown,
  Upload, Download, Shield, Clock,
  MoreHorizontal, ExternalLink, Check
} from 'lucide-react';

export default function MinimalistAdminSettings() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('appearance');
  
  // Theme colors
  const bg = darkMode ? 'bg-zinc-900' : 'bg-white';
  const textColor = darkMode ? 'text-zinc-100' : 'text-zinc-900';
  const mutedText = darkMode ? 'text-zinc-400' : 'text-zinc-500';
  const cardBg = darkMode ? 'bg-zinc-800' : 'bg-zinc-50';
  const borderColor = darkMode ? 'border-zinc-700' : 'border-zinc-200';
  const accentColor = 'bg-teal-700';
  const accentHover = 'hover:bg-teal-600';
  const inputBg = darkMode ? 'bg-zinc-700' : 'bg-zinc-100';
  const inputFocus = darkMode ? 'focus:ring-violet-500' : 'focus:ring-violet-400';
  
  return (
    <div className={`min-h-screen ${bg} ${textColor} font-sans antialiased`}>
      
      {/* Main Content */}
      <div className={` min-h-screen flex flex-col`}>
        {/* Header */}
        
        
        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">Settings</h1>
                  <p className={`mt-1 ${mutedText}`}>Manage your preferences and account settings</p>
                </div>
                <button className={`px-4 py-2 rounded-lg ${accentColor} ${accentHover} text-white text-sm font-medium`}>
                  Save Changes
                </button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex items-center space-x-6 mb-8 overflow-x-auto pb-2">
              {[
                { id: 'profile', name: 'Profile' },
                { id: 'appearance', name: 'Appearance' },
                { id: 'notifications', name: 'Notifications' },
                { id: 'security', name: 'Security' },
                { id: 'integrations', name: 'Integrations' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-1 font-medium text-sm border-b-2 transition-colors ${
                    selectedTab === tab.id
                      ? `border-violet-500 ${darkMode ? 'text-violet-400' : 'text-violet-500'}`
                      : `border-transparent ${mutedText} hover:${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            
            {/* Settings Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Settings Area */}
              <div className="lg:col-span-8 space-y-6">
                {/* Theme Settings Card */}
                <div className={`rounded-xl overflow-hidden ${cardBg} border ${borderColor}`}>
                  <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700">
                    <h2 className="font-medium">Theme Settings</h2>
                    <div className="flex items-center">
                      <span className={`text-xs ${mutedText} mr-2`}>Auto-save</span>
                      <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${accentColor}`}>
                        <Check size={12} className="text-white" />
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Theme Selection */}
                    <div className="mb-8">
                      <label className={`block mb-2 text-sm font-medium ${mutedText}`}>
                        Color Theme
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          onClick={() => setDarkMode(false)}
                          className={`relative p-4 rounded-lg border-2 cursor-pointer ${
                            !darkMode 
                              ? 'border-violet-500' 
                              : `${borderColor} hover:border-zinc-500`
                          }`}
                        >
                          <div className="bg-white rounded-md h-16 mb-3 shadow-sm flex items-center justify-center">
                            <div className="w-8 h-8 rounded-md bg-teal-500"></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Light</span>
                            {!darkMode && (
                              <span className={`h-5 w-5 rounded-full ${accentColor} flex items-center justify-center`}>
                                <Check size={12} className="text-white" />
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div 
                          onClick={() => setDarkMode(true)}
                          className={`relative p-4 rounded-lg border-2 cursor-pointer ${
                            darkMode 
                              ? 'border-violet-500' 
                              : `${borderColor} hover:border-zinc-300`
                          }`}
                        >
                          <div className="bg-zinc-900 rounded-md h-16 mb-3 shadow-sm flex items-center justify-center">
                            <div className="w-8 h-8 rounded-md bg-teal-500"></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Dark</span>
                            {darkMode && (
                              <span className={`h-5 w-5 rounded-full ${accentColor} flex items-center justify-center`}>
                                <Check size={12} className="text-white" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Custom Accent Colors */}
                    <div>
                      <label className={`block mb-2 text-sm font-medium ${mutedText}`}>
                        Accent Color
                      </label>
                      <div className="flex space-x-3">
                        {['bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'].map((color, index) => (
                          <button 
                            key={index}
                            className={`h-8 w-8 rounded-full ${color} ${index === 0 ? 'ring-2 ring-offset-2 ring-violet-500 ring-offset-zinc-800' : ''}`}
                          ></button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Font Settings */}
                <div className={`rounded-xl overflow-hidden ${cardBg} border ${borderColor}`}>
                  <div className="px-6 py-4 border-b border-zinc-700">
                    <h2 className="font-medium">Typography</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Font Size */}
                      <div>
                        <label className={`block mb-2 text-sm font-medium ${mutedText}`}>
                          Font Size
                        </label>
                        <select className={`w-full rounded-lg text-sm ${inputBg} border ${borderColor} px-3 py-2 appearance-none ${textColor}`}>
                          <option>Small</option>
                          <option selected>Medium (Default)</option>
                          <option>Large</option>
                          <option>Extra Large</option>
                        </select>
                      </div>
                      
                      {/* Font Family */}
                      <div>
                        <label className={`block mb-2 text-sm font-medium ${mutedText}`}>
                          Font Family
                        </label>
                        <select className={`w-full rounded-lg text-sm ${inputBg} border ${borderColor} px-3 py-2 appearance-none ${textColor}`}>
                          <option selected>System Default</option>
                          <option>Sans Serif</option>
                          <option>Serif</option>
                          <option>Monospace</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Layout Options */}
                <div className={`rounded-xl overflow-hidden ${cardBg} border ${borderColor}`}>
                  <div className="px-6 py-4 border-b border-zinc-700">
                    <h2 className="font-medium">Layout Options</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {/* Content Density */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Compact Mode</h3>
                        <p className={`text-xs ${mutedText} mt-1`}>Reduce spacing between elements</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className={`w-11 h-6 rounded-full peer ${
                          darkMode ? 'bg-zinc-700' : 'bg-zinc-300'
                        } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500`}></div>
                      </label>
                    </div>
                    
                    {/* Reduced Motion */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Reduced Motion</h3>
                        <p className={`text-xs ${mutedText} mt-1`}>Minimize animations and transitions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className={`w-11 h-6 rounded-full peer ${
                          darkMode ? 'bg-zinc-700' : 'bg-zinc-300'
                        } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500`}></div>
                      </label>
                    </div>
                    
                    {/* Sidebar Behavior */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Auto-collapse Sidebar</h3>
                        <p className={`text-xs ${mutedText} mt-1`}>Automatically hide sidebar on small screens</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className={`w-11 h-6 rounded-full peer ${
                          darkMode ? 'bg-zinc-700' : 'bg-zinc-300'
                        } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500`}></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                {/* Preview Card */}
                <div className={`rounded-xl overflow-hidden ${cardBg} border ${borderColor}`}>
                  <div className="px-6 py-4 border-b border-zinc-700">
                    <h2 className="font-medium">Preview</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className={`overflow-hidden rounded-lg border ${borderColor} ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
                      {/* Mock Header */}
                      <div className={`h-6 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'} flex items-center px-2`}>
                        <div className="flex space-x-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                      
                      {/* Mock Content */}
                      <div className="p-4">
                        <div className="h-3 w-24 bg-teal-500 rounded-full mb-2"></div>
                        <div className="h-2 w-32 bg-zinc-600 rounded-full mb-3"></div>
                        <div className="h-2 w-full bg-zinc-600 rounded-full mb-1.5"></div>
                        <div className="h-2 w-5/6 bg-zinc-600 rounded-full mb-1.5"></div>
                        <div className="h-2 w-3/4 bg-zinc-600 rounded-full mb-3"></div>
                        <div className="h-6 w-1/2 bg-teal-500 rounded-md mt-2 mx-auto"></div>
                      </div>
                    </div>
                    <p className={`text-xs ${mutedText} text-center mt-3`}>Theme preview</p>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className={`rounded-xl overflow-hidden ${cardBg} border ${borderColor}`}>
                  <div className="px-6 py-4 border-b border-zinc-700">
                    <h2 className="font-medium">Quick Actions</h2>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-1">
                      {[
                        { name: 'Export Settings', icon: <Download size={14} /> },
                        { name: 'Import Settings', icon: <Upload size={14} /> },
                        { name: 'Reset to Defaults', icon: <Clock size={14} /> },
                        { name: 'Security Options', icon: <Shield size={14} /> }
                      ].map((action, index) => (
                        <button 
                          key={index}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                            darkMode ? 'hover:bg-zinc-700' : 'hover:bg-zinc-200'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="mr-2">{action.icon}</span>
                            <span>{action.name}</span>
                          </div>
                          <ChevronDown size={14} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className={`rounded-xl overflow-hidden ${cardBg} border ${borderColor}`}>
                  <div className="px-6 py-4 border-b border-zinc-700 flex items-center justify-between">
                    <h2 className="font-medium">Recent Activity</h2>
                    <button className={`text-xs ${
                      darkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-500 hover:text-violet-600'
                    }`}>
                      View All
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-3">
                      {[
                        { action: 'Changed theme to Dark Mode', time: '2 hours ago' },
                        { action: 'Updated profile information', time: 'Yesterday' },
                        { action: 'Enabled two-factor authentication', time: '3 days ago' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start py-2">
                          <div className="mt-0.5">
                            <div className={`h-2 w-2 rounded-full ${accentColor}`}></div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm">{item.action}</p>
                            <p className={`text-xs ${mutedText}`}>{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Help & Resources */}
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-zinc-800/50' : 'bg-zinc-100/80'
                } border border-dashed ${borderColor}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Help & Resources</h3>
                    <MoreHorizontal size={16} className={mutedText} />
                  </div>
                  <p className={`text-xs ${mutedText} mb-3`}>
                    Need help with your settings? Check our documentation.
                  </p>
                  <a 
                    href="#" 
                    className={`text-xs flex items-center ${
                      darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-500 hover:text-teal-600'
                    }`}
                  >
                    View Documentation
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}