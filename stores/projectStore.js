import { defineStore } from 'pinia';

export const useProjectStore = defineStore('project', {
  state: () => ({
    imageUrl: null,
    title: null,
    imagePageUrl: null,
    technologies: null,
    vercelUrl: null,
    githubUrl: null,
    logoUrl: null,
    year: null,
    category: null,
    description: null
  }),
  actions: {
    setProjectProps(projectData) {
      this.imageUrl = projectData.imageURL;
      this.title = projectData.title;
      this.imagePageUrl = projectData.imagePageUrl;
      this.technologies = projectData.technologies;
      this.vercelUrl = projectData.vercelUrl;
      this.githubUrl = projectData.githubUrl;
      this.logoUrl = projectData.logoUrl;
      this.year = projectData.year;
      this.category = projectData.category;
      this.description = projectData.description;
    }
  },
  persist: true
});
