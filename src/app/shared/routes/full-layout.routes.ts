import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'components',
    loadChildren: () => import('../../components/ui-components.module').then(m => m.UIComponentsModule)
  },
  {
    path: 'talentpool',
    loadChildren: () => import('../../talentpool/talentpool.module').then(m => m.TalentpoolModule)
  },
  {
    path: 'candidate',
    loadChildren: () => import('../../candidate/candidate.module').then(m => m.CandidateModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('../../jobs/jobs.module').then(m => m.JobsModule)
  },
  {
    path: 'client',
    loadChildren: () => import('../../client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'recruiter',
    loadChildren: () => import('../../recruiter/recruiter.module').then(m => m.RecruiterModule)
  },
  {
    path: 'vendor',
    loadChildren: () => import('../../vendor/vendor.module').then(m => m.VendorModule)
  },
  {
    path: 'email-template',
    loadChildren: () => import('../../email-template/email-template.module').then(m => m.EmailTemplateModule)
  },
  {
    path: 'job',
    loadChildren: () => import('../../job/job.module').then(m => m.JobModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  },
];
