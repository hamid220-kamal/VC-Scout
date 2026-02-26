export const getLists = () => {
    if (typeof window === 'undefined') return [];
    const lists = localStorage.getItem('vc_scout_lists');
    return lists ? JSON.parse(lists) : [];
};

export const saveList = (list) => {
    const lists = getLists();
    const newList = [...lists, { ...list, id: Date.now().toString() }];
    localStorage.setItem('vc_scout_lists', JSON.stringify(newList));
    return newList;
};

export const getSavedSearches = () => {
    if (typeof window === 'undefined') return [];
    const searches = localStorage.getItem('vc_scout_searches');
    return searches ? JSON.parse(searches) : [];
};

export const saveSearch = (search) => {
    const searches = getSavedSearches();
    const newSearches = [...searches, { ...search, id: Date.now().toString() }];
    localStorage.setItem('vc_scout_searches', JSON.stringify(newSearches));
    return newSearches;
};

export const getCachedEnrichment = (companyId) => {
    if (typeof window === 'undefined') return null;
    const cache = localStorage.getItem(`enrich_${companyId}`);
    return cache ? JSON.parse(cache) : null;
};

export const cacheEnrichment = (companyId, data) => {
    localStorage.setItem(`enrich_${companyId}`, JSON.stringify(data));
};

export const getNotes = (companyId) => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(`notes_${companyId}`) || '';
};

export const saveNote = (companyId, note) => {
    localStorage.setItem(`notes_${companyId}`, note);
};
