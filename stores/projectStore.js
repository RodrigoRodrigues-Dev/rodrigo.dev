import { defineStore } from 'pinia';

export const useProjectStore = defineStore('project', {
  state: () => ({
    image: null,
    name: null,
    vercelURL: null,
    githubURL: null,
    logoURL: null,
    year: null,
    category: null,
    description: null
  }),
  actions: {
    setProjectProps(prop) {
      this.image = prop.imageURL;
      this.name = prop.name;
      this.vercelURL = prop.vercelUrl;
      this.githubURL = prop.githubUrl;
      this.logoURL = prop.logoUrl;
      this.year = prop.year;
      this.category = prop.category;
      this.description = prop.description;
    }
  },
  persist: true
});
