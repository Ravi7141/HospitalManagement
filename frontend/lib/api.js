import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Patient APIs
export const patientAPI = {
    getAll: () => api.get('/patients'),
    getById: (id) => api.get(`/patients/${id}`),
    create: (patient) => api.post('/patients', patient),
    update: (id, patient) => api.put(`/patients/${id}`, patient),
    delete: (id) => api.delete(`/patients/${id}`),
    getByBloodGroup: (group) => api.get(`/patients/blood-group/${group}`),
    getBloodGroupCount: () => api.get('/patients/count-by-blood-group'),
    getAppointments: (id) => api.get(`/patients/${id}/appointments`),
};

// Doctor APIs
export const doctorAPI = {
    getAll: () => api.get('/doctors'),
    getById: (id) => api.get(`/doctors/${id}`),
    create: (doctor) => api.post('/doctors', doctor),
    update: (id, doctor) => api.put(`/doctors/${id}`, doctor),
    delete: (id) => api.delete(`/doctors/${id}`),
    getBySpecialization: (name) => api.get(`/doctors/specialization/${name}`),
    getAppointments: (id) => api.get(`/doctors/${id}/appointments`),
    getByDepartment: (deptId) => api.get(`/doctors/department/${deptId}`),
};

// Department APIs
export const departmentAPI = {
    getAll: () => api.get('/departments'),
    getById: (id) => api.get(`/departments/${id}`),
    create: (department) => api.post('/departments', department),
    update: (id, department) => api.put(`/departments/${id}`, department),
    delete: (id) => api.delete(`/departments/${id}`),
    getDoctors: (id) => api.get(`/departments/${id}/doctors`),
    getHeadDoctor: (id) => api.get(`/departments/${id}/head-doctor`),
};

// Appointment APIs
export const appointmentAPI = {
    getAll: () => api.get('/appointments'),
    getById: (id) => api.get(`/appointments/${id}`),
    create: (appointment) => api.post('/appointments', appointment),
    update: (id, appointment) => api.put(`/appointments/${id}`, appointment),
    delete: (id) => api.delete(`/appointments/${id}`),
    getByPatient: (patientId) => api.get(`/appointments/patient/${patientId}`),
    getByDoctor: (doctorId) => api.get(`/appointments/doctor/${doctorId}`),
};

// Insurance APIs
export const insuranceAPI = {
    getAll: () => api.get('/insurance'),
    getById: (id) => api.get(`/insurance/${id}`),
    create: (patientId, insurance) => api.post(`/insurance/${patientId}`, insurance),
    update: (id, insurance) => api.put(`/insurance/${id}`, insurance),
    delete: (id) => api.delete(`/insurance/${id}`),
    getByProvider: (name) => api.get(`/insurance/provider/${name}`),
    getByPatient: (patientId) => api.get(`/insurance/patient/${patientId}`),
};

// Auth APIs
export const authAPI = {
    register: (user) => api.post('/auth/register', user),
    login: (credentials) => api.post('/auth/login', credentials),
};

export default api;
