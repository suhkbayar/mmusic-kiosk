// example procider
export const cacheProvider = {
  get: (language: any, key: any) => {
    try {
      return ((JSON.parse(localStorage.getItem('translations') || '') || {})[key] || {})[language];
    } catch (error) {
      return null;
    }
  },
  set: (language: any, key: any, value: any) => {
    try {
      const existing = JSON.parse(localStorage.getItem('translations') || '') || {
        [key]: {},
      };
      existing[key] = { ...existing[key], [language]: value };
      localStorage.setItem('translations', JSON.stringify(existing));
    } catch (error) {
      return null;
    }
  },
};
