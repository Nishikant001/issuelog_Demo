// data/initialData.js
export const initialCompanies = [
    {
      id: 1,
      name: 'Exelligent Solution',
      description: 'Global technology solutions provider',
      technologies: [
        {
          id: 101,
          name: 'SAP',
          description: 'Enterprise resource planning software',
          modules: [
            {
              id: 1001,
              name: 'FI',
              description: 'Financial Accounting',
              teams: [
                {
                  id: 10001,
                  name: 'Financial Core Team',
                  lead: 'John Doe',
                  memberCount: 8
                }
              ]
            },
            {
              id: 1002,
              name: 'SD',
              description: 'Sales and Distribution',
              teams: [
                {
                  id: 10002,
                  name: 'Sales Operations',
                  lead: 'Jane Smith',
                  memberCount: 6
                }
              ]
            }
          ]
        },
        {
          id: 102,
          name: 'Adobe',
          description: 'Creative and marketing solutions',
          modules: [
            {
              id: 1003,
              name: 'Creative Cloud',
              description: 'Suite of creative applications',
              teams: [
                {
                  id: 10003,
                  name: 'Design Team',
                  lead: 'Mike Johnson',
                  memberCount: 5
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Techgeering',
      description: 'software development',
      technologies: [
        {
          id: 103,
          name: 'Web Application',
          description: 'Custom web solutions',
          modules: [
            {
              id: 1004,
              name: 'Frontend',
              description: 'User interface development',
              teams: [
                {
                  id: 10004,
                  name: 'UI Team',
                  lead: 'Sarah Wilson',
                  memberCount: 4
                }
              ]
            },
            {
              id: 1005,
              name: 'Backend',
              description: 'Server-side development',
              teams: [
                {
                  id: 10005,
                  name: 'API Team',
                  lead: 'Robert Chen',
                  memberCount: 3
                }
              ]
            }
          ]
        }
      ]
    }
  ];