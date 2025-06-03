// In environment putting only the variables which are different in dev and prod, and which the client would change ocasionaly so we don't need to redeploy the app
export const environment = {
  production: false,
  apiUrl: 'https://localhost:44388/api',
  frontendUrl: 'http://localhost:4200',
  GoogleClientId: '794125630067-jlilggr1dchcb501lr3vdb8eg36184gu.apps.googleusercontent.com',
  companyName: 'Appointmentscheduler',
  primaryColor: '',
};
