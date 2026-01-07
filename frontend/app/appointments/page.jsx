'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MagicCard from '@/components/MagicCard';
import { appointmentAPI, patientAPI, doctorAPI } from '@/lib/api';

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewingAppointment, setViewingAppointment] = useState(null);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        appointmentTime: '',
        reason: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterAppointments();
    }, [appointments, activeTab]);

    const fetchData = async () => {
        try {
            const [appointmentsRes, patientsRes, doctorsRes] = await Promise.all([
                appointmentAPI.getAll(),
                patientAPI.getAll(),
                doctorAPI.getAll()
            ]);
            setAppointments(appointmentsRes.data);
            setPatients(patientsRes.data);
            setDoctors(doctorsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterAppointments = () => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let filtered = [...appointments];

        if (activeTab === 'today') {
            filtered = filtered.filter(apt => {
                const aptDate = new Date(apt.appointmentTime);
                return aptDate >= today && aptDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
            });
        } else if (activeTab === 'upcoming') {
            filtered = filtered.filter(apt => new Date(apt.appointmentTime) >= now);
        }
        setFilteredAppointments(filtered);
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) return '-';
        const date = new Date(dateTime);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + ' at ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const formatDateTimeShort = (dateTime) => {
        if (!dateTime) return '-';
        const date = new Date(dateTime);
        return date.toLocaleDateString('en-US') + ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const getStatus = (dateTime) => {
        return new Date(dateTime) < new Date() ? 'confirmed' : 'scheduled';
    };

    const handleView = (appointment) => {
        setViewingAppointment(appointment);
        setShowViewModal(true);
    };

    const handleAdd = () => {
        setEditingAppointment(null);
        setFormData({ patientId: patients[0]?.id || '', doctorId: doctors[0]?.id || '', appointmentTime: '', reason: '' });
        setShowModal(true);
    };

    const handleEdit = (appointment) => {
        setEditingAppointment(appointment);
        setFormData({
            patientId: appointment.patient?.id || '',
            doctorId: appointment.doctor?.id || '',
            appointmentTime: appointment.appointmentTime ? new Date(appointment.appointmentTime).toISOString().slice(0, 16) : '',
            reason: appointment.reason || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            try {
                await appointmentAPI.delete(id);
                fetchData();
            } catch (error) {
                console.error('Error deleting appointment:', error);
                alert('Failed to delete appointment');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                patient: { id: formData.patientId },
                doctor: { id: formData.doctorId },
                appointmentTime: formData.appointmentTime,
                reason: formData.reason
            };
            if (editingAppointment) {
                await appointmentAPI.update(editingAppointment.id, payload);
            } else {
                await appointmentAPI.create(payload);
            }
            setShowModal(false);
            fetchData();
        } catch (error) {
            console.error('Error saving appointment:', error);
            alert('Failed to save appointment');
        }
    };

    if (loading) {
        return (
            <>
                <Header title="Appointments" />
                <div className="page-content">
                    <div className="loading"><div className="spinner"></div></div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header title="Appointments" />
            <div className="page-content">
                <div className="page-title">
                    <h2>Appointment Management</h2>
                    <button className="btn-primary" onClick={handleAdd}>+ Book Appointment</button>
                </div>

                <div className="tabs">
                    <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Appointments</button>
                    <button className={`tab ${activeTab === 'today' ? 'active' : ''}`} onClick={() => setActiveTab('today')}>Today</button>
                    <button className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>Upcoming</button>
                </div>

                <MagicCard className="magic-dashboard-card" gradientColor="#10b981">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Patient</th>
                                    <th>Doctor</th>
                                    <th>Date & Time</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map((appointment) => (
                                    <tr key={appointment.id}>
                                        <td>{appointment.id}</td>
                                        <td>{appointment.patient?.name || 'N/A'}</td>
                                        <td>{appointment.doctor?.name || 'N/A'}</td>
                                        <td>{formatDateTimeShort(appointment.appointmentTime)}</td>
                                        <td>{appointment.reason || '-'}</td>
                                        <td>
                                            <span className={`status-badge ${getStatus(appointment.appointmentTime)}`}>
                                                {getStatus(appointment.appointmentTime).charAt(0).toUpperCase() + getStatus(appointment.appointmentTime).slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn view" title="View Details" onClick={() => handleView(appointment)}>👁</button>
                                                <button className="action-btn edit" title="Edit" onClick={() => handleEdit(appointment)}>✏️</button>
                                                <button className="action-btn delete" title="Delete" onClick={() => handleDelete(appointment.id)}>🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredAppointments.length === 0 && (
                                    <tr><td colSpan="7" style={{ textAlign: 'center' }}>No appointments found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </MagicCard>
            </div>

            {/* View Details Modal */}
            {
                showViewModal && viewingAppointment && (
                    <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
                        <div className="modal detail-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Appointment Details</h2>
                                <button className="modal-close" onClick={() => setShowViewModal(false)}>×</button>
                            </div>
                            <div className="detail-content">
                                <div className="detail-row">
                                    <span className="detail-label">ID:</span>
                                    <span className="detail-value">{viewingAppointment.id}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Patient:</span>
                                    <span className="detail-value">{viewingAppointment.patient?.name || 'N/A'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Doctor:</span>
                                    <span className="detail-value">{viewingAppointment.doctor?.name || 'N/A'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Specialization:</span>
                                    <span className="detail-value">{viewingAppointment.doctor?.specialization || '-'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Date & Time:</span>
                                    <span className="detail-value">{formatDateTime(viewingAppointment.appointmentTime)}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Reason:</span>
                                    <span className="detail-value">{viewingAppointment.reason || '-'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Status:</span>
                                    <span className="detail-value">
                                        <span className={`status-badge ${getStatus(viewingAppointment.appointmentTime)}`}>
                                            {getStatus(viewingAppointment.appointmentTime).charAt(0).toUpperCase() + getStatus(viewingAppointment.appointmentTime).slice(1)}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="form-actions" style={{ marginTop: '20px' }}>
                                <button className="btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
                                <button className="btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingAppointment); }}>Edit Appointment</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Edit/Add Modal */}
            {
                showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>{editingAppointment ? 'Edit Appointment' : 'Book Appointment'}</h2>
                                <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Patient</label>
                                    <select value={formData.patientId} onChange={(e) => setFormData({ ...formData, patientId: e.target.value })} required>
                                        <option value="">Select Patient</option>
                                        {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Doctor</label>
                                    <select value={formData.doctorId} onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })} required>
                                        <option value="">Select Doctor</option>
                                        {doctors.map(d => <option key={d.id} value={d.id}>{d.name} - {d.specialization || 'General'}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Date & Time</label>
                                    <input type="datetime-local" value={formData.appointmentTime} onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Reason</label>
                                    <textarea value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} rows="3" placeholder="Reason for appointment..." />
                                </div>
                                <div className="form-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn-primary">{editingAppointment ? 'Update' : 'Book'} Appointment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
}
