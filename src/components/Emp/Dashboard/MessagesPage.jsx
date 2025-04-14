import React, { useState } from 'react'

const MessagesPage = () => {
  const [activeTab, setActiveTab] = useState('direct'); // 'direct' or 'team'
  const [activeChat, setActiveChat] = useState(0);
  const [activeTeamChat, setActiveTeamChat] = useState(0);

  // Direct messages data
  const directChats = [
    { name: 'John Doe', message: 'Hey, about that project...', time: '10m', unread: 2 },
    { name: 'Mary Smith', message: 'Meeting rescheduled to 3PM', time: '1h', unread: 0 },
    { name: 'Robert Johnson', message: 'I sent you those files', time: '2h', unread: 0 },
    { name: 'Jane Williams', message: 'Need your approval ASAP', time: '5h', unread: 1 },
    { name: 'Alex Brown', message: 'Thanks for your help!', time: '1d', unread: 0 }
  ];

  // Team chats data
  const teamChats = [
    { 
      name: 'Project Alpha', 
      message: 'Alex: Updated the roadmap', 
      time: '5m', 
      unread: 3,
      members: ['Alex Brown', 'John Doe', 'Mary Smith', 'You']
    },
    { 
      name: 'Design Team', 
      message: 'Jane: Shared new mockups', 
      time: '2h', 
      unread: 0,
      members: ['Jane Williams', 'Robert Johnson', 'You']
    },
    { 
      name: 'Marketing', 
      message: 'Mary: Campaign stats are in', 
      time: '1d', 
      unread: 5,
      members: ['Mary Smith', 'Alex Brown', 'You']
    }
  ];

  // Messages for the current chat
  const messages = [
    { sender: 'them', message: 'Hey, about that project deadline. Can we push it back a week?', time: '10:30 AM' },
    { sender: 'me', message: 'I was actually going to ask about that. What\'s the reason for the delay?', time: '10:32 AM' },
    { sender: 'them', message: 'We need more time to finalize the design specs. The client just sent over some new requirements yesterday.', time: '10:33 AM' },
    { sender: 'me', message: 'I see. Let me check our timeline and get back to you.', time: '10:35 AM' },
    { sender: 'them', message: 'Thanks, I appreciate it!', time: '10:36 AM' }
  ];

  // Team chat messages
  const teamMessages = [
    { sender: 'Alex Brown', message: 'I updated the project roadmap with the new milestones', time: '9:30 AM' },
    { sender: 'Mary Smith', message: 'Looks good! Did you include the Q4 targets?', time: '9:45 AM' },
    { sender: 'John Doe', message: 'Yes, all the targets are there. We need to finalize the budget though.', time: '10:15 AM' },
    { sender: 'me', message: 'I\'ll work on the budget estimates today', time: '10:20 AM' },
    { sender: 'Alex Brown', message: 'Great! Let\'s review everything tomorrow morning.', time: '10:25 AM' }
  ];

  // Get current chat data
  const currentChat = activeTab === 'direct' 
    ? directChats[activeChat] 
    : teamChats[activeTeamChat];
  
  const currentMessages = activeTab === 'direct' ? messages : teamMessages;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex h-screen-minus-header">
        {/* Conversations list */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button 
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'direct' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('direct')}
            >
              Direct Messages
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'team' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('team')}
            >
              Team Chats
            </button>
          </div>

          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder={activeTab === 'direct' ? "Search messages..." : "Search team chats..."}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-y-auto flex-1">
            {activeTab === 'direct' ? (
              // Direct messages list
              directChats.map((chat, index) => (
                <div 
                  key={index} 
                  className={`flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    index === activeChat ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setActiveChat(index)}
                >
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                    {chat.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-medium text-gray-800 truncate">{chat.name}</p>
                      <p className="text-xs text-gray-500">{chat.time}</p>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{chat.message}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="ml-2 h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{chat.unread}</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              // Team chats list
              teamChats.map((chat, index) => (
                <div 
                  key={index} 
                  className={`flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    index === activeTeamChat ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setActiveTeamChat(index)}
                >
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                    {chat.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-medium text-gray-800 truncate">{chat.name}</p>
                      <p className="text-xs text-gray-500">{chat.time}</p>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{chat.message}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="ml-2 h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{chat.unread}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Add chat button */}
          <div className="p-3 border-t border-gray-200">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {activeTab === 'direct' ? 'New Message' : 'New Team Chat'}
            </button>
          </div>
        </div>
        
        {/* Current conversation */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {activeTab === 'direct' ? (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                    {currentChat.name.split(' ').map(n => n[0]).join('')}
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                    {currentChat.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{currentChat.name}</p>
                  {activeTab === 'direct' ? (
                    <p className="text-xs text-gray-500">Online</p>
                  ) : (
                    <p className="text-xs text-gray-500">{currentChat.members.length} members</p>
                  )}
                </div>
              </div>
              
              {/* Team info button (only for team chats) */}
              {activeTab === 'team' && (
                <div className="flex">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            {/* Team members (only for team chats) */}
            {activeTab === 'team' && (
              <div className="mt-3 flex -space-x-2 overflow-hidden">
                {currentChat.members.slice(0, 4).map((member, idx) => (
                  <div key={idx} className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border border-white">
                    {member === 'You' ? 'You' : member.split(' ').map(n => n[0]).join('')}
                  </div>
                ))}
                {currentChat.members.length > 4 && (
                  <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 border border-white">
                    +{currentChat.members.length - 4}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender !== 'me' && activeTab === 'team' && (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mr-2 self-end">
                    {typeof msg.sender === 'string' ? msg.sender.split(' ').map(n => n[0]).join('') : 'JD'}
                  </div>
                )}
                <div className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                  msg.sender === 'me' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                }`}>
                  {activeTab === 'team' && msg.sender !== 'me' && (
                    <p className="text-xs font-medium text-gray-600 mb-1">
                      {typeof msg.sender === 'string' ? msg.sender : 'John Doe'}
                    </p>
                  )}
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 text-right ${
                    msg.sender === 'me' ? 'text-blue-200' : 'text-gray-500'
                  }`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-gray-700 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input
                type="text"
                placeholder={activeTab === 'direct' 
                  ? "Type a message..." 
                  : `Message ${currentChat.name}...`}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="ml-2 p-2 bg-blue-600 text-white rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.407l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage