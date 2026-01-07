'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MagicCard from '@/components/MagicCard';
import { patientAPI, doctorAPI, departmentAPI, appointmentAPI } from '@/lib/api';

export default function Dashboard() {
    const [stats, setStats] = useState({
        patients: 0,
        doctors: 0,
        appointments: 0,
        departments: 0
    });
    const [recentPatients, setRecentPatients] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [patientsRes, doctorsRes, appointmentsRes, departmentsRes] = await Promise.all([
                patientAPI.getAll(),
                doctorAPI.getAll(),
                appointmentAPI.getAll(),
                departmentAPI.getAll()
            ]);

            setStats({
                patients: patientsRes.data.length,
                doctors: doctorsRes.data.length,
                appointments: appointmentsRes.data.length,
                departments: departmentsRes.data.length
            });

            setRecentPatients(patientsRes.data.slice(-5).reverse());
            setUpcomingAppointments(appointmentsRes.data.slice(0, 5));

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateAge = (birthDate) => {
        if (!birthDate) return '-';
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const formatBloodGroup = (bloodGroup) => {
        if (!bloodGroup) return '-';
        return bloodGroup.replace('_POSITIVE', '+').replace('_NEGATIVE', '-').replace('_', '');
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) return '-';
        const date = new Date(dateTime);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <>
                <Header title="Dashboard" />
                <div className="page-content">
                    <div className="loading"><div className="spinner"></div></div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header title="Dashboard" />
            <div className="page-content">
                <div className="stat-cards">
                    <MagicCard className="magic-stat-card" gradientColor="#3b82f6">
                        <div className="stat-card-icon blue">👥</div>
                        <div className="stat-card-info">
                            <h3>{stats.patients}</h3>
                            <p>Total Patients</p>
                        </div>
                    </MagicCard>
                    <MagicCard className="magic-stat-card" gradientColor="#ec4899">
                        <div className="stat-card-icon pink">👨‍⚕️</div>
                        <div className="stat-card-info">
                            <h3>{stats.doctors}</h3>
                            <p>Total Doctors</p>
                        </div>
                    </MagicCard>
                    <MagicCard className="magic-stat-card" gradientColor="#10b981">
                        <div className="stat-card-icon green">📅</div>
                        <div className="stat-card-info">
                            <h3>{stats.appointments}</h3>
                            <p>Today&apos;s Appointments</p>
                        </div>
                    </MagicCard>
                    <MagicCard className="magic-stat-card" gradientColor="#8b5cf6">
                        <div className="stat-card-icon purple">🏢</div>
                        <div className="stat-card-info">
                            <h3>{stats.departments}</h3>
                            <p>Departments</p>
                        </div>
                    </MagicCard>
                </div>

                <div className="dashboard-grid">
                    <MagicCard className="magic-dashboard-card" gradientColor="#3b82f6">
                        <div className="card-header">
                            <h3 className="card-title">Recent Patients</h3>
                            <a href="/patients" className="view-all-btn">View All</a>
                        </div>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Blood Group</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentPatients.map((patient) => (
                                        <tr key={patient.id}>
                                            <td>{patient.name}</td>
                                            <td>{calculateAge(patient.birthDate)}</td>
                                            <td>{formatBloodGroup(patient.bloodGroup)}</td>
                                            <td><span className="status-badge active">Active</span></td>
                                        </tr>
                                    ))}
                                    {recentPatients.length === 0 && (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center' }}>No patients found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </MagicCard>

                    <MagicCard className="magic-dashboard-card" gradientColor="#8b5cf6">
                        <div className="card-header">
                            <h3 className="card-title">Upcoming Appointments</h3>
                            <a href="/appointments" className="view-all-btn">View All</a>
                        </div>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Patient</th>
                                        <th>Doctor</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingAppointments.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td>{appointment.patient?.name || 'N/A'}</td>
                                            <td>{appointment.doctor?.name || 'N/A'}</td>
                                            <td>{formatDateTime(appointment.appointmentTime)}</td>
                                            <td><span className="status-badge scheduled">Scheduled</span></td>
                                        </tr>
                                    ))}
                                    {upcomingAppointments.length === 0 && (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center' }}>No appointments found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </MagicCard>
                </div>
            </div>
        </>
    );
}
