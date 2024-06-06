export default class JobsModel {
  jobs = [
    {
      id: 1,
      job_title: "CodingNinjas",
      tech: "SDE",
      location: "Gurugram, HR IND Remote",
      pay: "14-20",
      applyTill: "24-4-2021",
      applicants: 0,
      openings: 3,
      skill_set: "React ,node ,express, mongo ,git",
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
    {
      id: 2,
      job_title: "Google",
      tech: "SRE",
      location: "Mountain View, CA, USA",
      pay: "12-20",
      applyTill: "30-6-2021",
      applicants: 0,
      openings: 12,
      skill_set: "Java, Python, C++, JavaScript",
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
  ];

  getAllJobs = () => {
    return this.jobs;
  };

  static add(newApplicant) {
    jobs.push(newApplicant);
  }

  getJobById(id) {
    return this.jobs.find((job) => job.id === parseInt(id));
  }

 
  applyForJob(jobId) {
    const jobIndex = this.jobs.findIndex(job => job.id === parseInt(jobId));
    const job = new JobsModel.jobs[jobIndex].id
    console.log("job", job)
    if (job !== -1) {
      this.jobs[job].applicants += 1;
       return job
    }
    return false;
  }
 
}
