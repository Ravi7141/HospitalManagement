'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MagicCard from '@/components/MagicCard';
import { doctorAPI } from '@/lib/api';

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewingDoctor, setViewingDoctor] = useState(null);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        specialization: ''
    });

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        filterDoctors();
    }, [doctors, searchTerm]);

    const fetchDoctors = async () => {
        try {
            const response = await doctorAPI.getAll();
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterDoctors = () => {
        let filtered = [...doctors];
        if (searchTerm) {
            filtered = filtered.filter(d =>
                d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (d.specialization && d.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        setFilteredDoctors(filtered);
    };

    const getInitials = (name) => {
        if (!name) return '??';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const handleView = (doctor) => {
        setViewingDoctor(doctor);
        setShowViewModal(true);
    };

    const handleAdd = () => {
        setEditingDoctor(null);
        setFormData({ name: '', email: '', specialization: '' });
        setShowModal(true);
    };

    const handleEdit = (doctor) => {
        setEditingDoctor(doctor);
        setFormData({
            name: doctor.name,
            email: doctor.email,
            specialization: doctor.specialization || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            try {
                await doctorAPI.delete(id);
                fetchDoctors();
            } catch (error) {
                console.error('Error deleting doctor:', error);
                alert('Failed to delete doctor');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDoctor) {
                await doctorAPI.update(editingDoctor.id, formData);
            } else {
                await doctorAPI.create(formData);
            }
            setShowModal(false);
            fetchDoctors();
        } catch (error) {
            console.error('Error saving doctor:', error);
            alert('Failed to save doctor');
        }
    };

    if (loading) {
        return (
            <>
                <Header title="Doctors" />
                <div className="page-content">
                    <div className="loading"><div className="spinner"></div></div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header title="Doctors" />
            <div className="page-content">
                <div className="page-title">
                    <h2>Doctor Management</h2>
                    <button className="btn-primary" onClick={handleAdd}>+ Add Doctor</button>
                </div>

                <div className="filters-row">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search doctors by name or specialization..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="cards-grid">
                    {filteredDoctors.map((doctor) => (
                        <MagicCard key={doctor.id} className="magic-doctor-card" gradientColor="#ec4899">
                            <div className="doctor-avatar">{getInitials(doctor.name)}</div>
                            <h3 className="doctor-name">Dr. {doctor.name}</h3>
                            {doctor.specialization && (
                                <>
                                    <span className="doctor-specialization-badge">{doctor.specialization}</span>
                                    <p className="doctor-specialization">{doctor.specialization}</p>
                                </>
                            )}
                            <div className="doctor-actions">
                                <button className="doctor-action-btn view" title="View Details" onClick={() => handleView(doctor)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </button>
                                <button className="doctor-action-btn edit" title="Edit" onClick={() => handleEdit(doctor)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </button>
                                <button className="doctor-action-btn delete" title="Delete" onClick={() => handleDelete(doctor.id)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                </button>
                            </div>
                        </MagicCard>
                    ))}
                    {filteredDoctors.length === 0 && (
                        <div className="empty-state"><p>No doctors found</p></div>
                    )}
                </div>
            </div>

            {/* View Details Modal */}
            {showViewModal && viewingDoctor && (
                <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
                    <div className="modal detail-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Doctor Details</h2>
                            <button className="modal-close" onClick={() => setShowViewModal(false)}>×</button>
                        </div>
                        <div className="detail-content">
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <div className="doctor-avatar" style={{ margin: '0 auto 10px', width: '80px', height: '80px', fontSize: '28px' }}>
                                    {getInitials(viewingDoctor.name)}
                                </div>
                                <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>Dr. {viewingDoctor.name}</h3>
                                {viewingDoctor.specialization && (
                                    <span className="doctor-specialization-badge">{viewingDoctor.specialization}</span>
                                )}
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">ID:</span>
                                <span className="detail-value">{viewingDoctor.id}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Email:</span>
                                <span className="detail-value">{viewingDoctor.email}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Specialization:</span>
                                <span className="detail-value">{viewingDoctor.specialization || '-'}</span>
                            </div>
                        </div>
                        <div className="form-actions" style={{ marginTop: '20px' }}>
                            <button className="btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
                            <button className="btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingDoctor); }}>Edit Doctor</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit/Add Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingDoctor ? 'Edit Doctor' : 'Add Doctor'}</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Specialization</label>
                                <input type="text" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} placeholder="e.g., Cardiology, Neurology" />
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">{editingDoctor ? 'Update' : 'Add'} Doctor</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
