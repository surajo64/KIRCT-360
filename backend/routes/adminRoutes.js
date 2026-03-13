import express from 'express';
import upload from '../middlewares/multer.js'; // Assuming you have a configured multer middleware
import {
    applyInternship,
    getInternships,
    updateInternshipStatus,
    applyJob,
    getJobApplications,
    updateJobStatus,
    addNews,
    getNews,
    deleteNews,
    updateNews,
    addJobVacancy,
    getJobVacancies,
    deleteJobVacancy,
    updateJobVacancy
} from '../controllers/adminController.js';

const adminRouter = express.Router();

// Public Routes (Application Submission)
adminRouter.post('/apply', upload.single('file'), applyInternship);
adminRouter.post('/applyJob', upload.single('cv'), applyJob);
adminRouter.get('/get-job-vacancies', getJobVacancies);

// Admin Routes (Management) - Add auth middleware here if needed (e.g. protectAdmin)
adminRouter.get('/get-internships', getInternships);
adminRouter.post('/internships/:id/status', updateInternshipStatus); // Using POST as per frontend implementation
adminRouter.get('/applications', getJobApplications);
adminRouter.post('/applications/:id/status', updateJobStatus);

// News Routes
adminRouter.post('/add-news', upload.array('images', 10), addNews);
adminRouter.get('/getNews', getNews);
adminRouter.post('/delete-news', deleteNews);
adminRouter.post('/update-news', upload.array('images', 10), updateNews);

// Job Vacancy Routes
adminRouter.post('/add-job-vacancy', addJobVacancy);
adminRouter.post('/delete-job-vacancy', deleteJobVacancy);
adminRouter.post('/update-job-vacancy', updateJobVacancy);

export default adminRouter;
