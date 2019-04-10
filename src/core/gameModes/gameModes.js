const gameModes = () => ([
    {id: 0, type: 'normal', title: '80s', slug: '80', apiSlug: '0'},
    {id: 1, type: 'normal', title: '90s', slug: '90', apiSlug: '1'},
    {id: 2, type: 'normal', title: '00s', slug: '00', apiSlug: '2'},
    {id: 3, type: 'normal', title: '10s', slug: '10', apiSlug: '3'},
    {id: 4, type: 'all', title: 'I can handle anything!', slug: 'all', apiSlug: ''}
]);

export const slugToApiSlug = slug => {
  const match = gameModes().find(mode => {
    return mode.slug === slug;
  });

  return match !== undefined && match.apiSlug;
}

export default gameModes;