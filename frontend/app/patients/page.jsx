'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MagicCard from '@/components/MagicCard';
import { patientAPI } from '@/lib/api';

const BLOOD_GROUPS = [
    'A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE',
    'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE'
];

export default function Patients() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [bloodGroupFilter, setBloodGroupFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewingPatient, setViewingPatient] = useState(null);
    const [editingPatient, setEditingPatient] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birthDate: '',
        gender: 'MALE',
        bloodGroup: 'O_POSITIVE'
    });

    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(() => {
        filterPatients();
    }, [patients, searchTerm, bloodGroupFilter]);

    const fetchPatients = async () => {
        try {
            const response = await patientAPI.getAll();
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterPatients = () => {
        let filtered = [...patients];

        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (bloodGroupFilter) {
            filtered = filtered.filter(p => p.bloodGroup === bloodGroupFilter);
        }

        setFilteredPatients(filtered);
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

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const handleView = (patient) => {
        setViewingPatient(patient);
        setShowViewModal(true);
    };

    const handleAdd = () => {
        setEditingPatient(null);
        setFormData({
            name: '',
            email: '',
            birthDate: '',
            gender: 'MALE',
            bloodGroup: 'O_POSITIVE'
        });
        setShowModal(true);
    };

    const handleEdit = (patient) => {
        setEditingPatient(patient);
        setFormData({
            name: patient.name,
            email: patient.email,
            birthDate: patient.birthDate || '',
            gender: patient.gender || 'MALE',
            bloodGroup: patient.bloodGroup || 'O_POSITIVE'
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await patientAPI.delete(id);
                fetchPatients();
            } catch (error) {
                console.error('Error deleting patient:', error);
                alert('Failed to delete patient');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPatient) {
                await patientAPI.update(editingPatient.id, formData);
            } else {
                await patientAPI.create(formData);
            }
            setShowModal(false);
            fetchPatients();
        } catch (error) {
            console.error('Error saving patient:', error);
            alert('Failed to save patient');
        }
    };

    if (loading) {
        return (
            <>
                <Header title="Patients" />
                <div className="page-content">
                    <div className="loading"><div className="spinner"></div></div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header title="Patients" />
            <div className="page-content">
                <div className="page-title">
                    <h2>Patient Management</h2>
                    <button className="btn-primary" onClick={handleAdd}>
                        + Add Patient
                    </button>
                </div>

                <div className="filters-row">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="filter-select"
                        value={bloodGroupFilter}
                        onChange={(e) => setBloodGroupFilter(e.target.value)}
                    >
                        <option value="">All Blood Groups</option>
                        {BLOOD_GROUPS.map(bg => (
                            <option key={bg} value={bg}>{formatBloodGroup(bg)}</option>
                        ))}
                    </select>
                </div>

                <MagicCard className="magic-dashboard-card" gradientColor="#3b82f6">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Blood Group</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatients.map((patient) => (
                                    <tr key={patient.id}>
                                        <td>{patient.id}</td>
                                        <td>{patient.name}</td>
                                        <td>{calculateAge(patient.birthDate)}</td>
                                        <td>{patient.gender || '-'}</td>
                                        <td>{formatBloodGroup(patient.bloodGroup)}</td>
                                        <td><a href={`mailto:${patient.email}`} className="phone-link">{patient.email}</a></td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn view" title="View Details" onClick={() => handleView(patient)}>👁</button>
                                                <button className="action-btn edit" title="Edit" onClick={() => handleEdit(patient)}>✏️</button>
                                                <button className="action-btn delete" title="Delete" onClick={() => handleDelete(patient.id)}>🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredPatients.length === 0 && (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center' }}>No patients found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </MagicCard>
            </div>

            {/* View Details Modal */}
            {
                showViewModal && viewingPatient && (
                    <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
                        <div className="modal detail-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Patient Details</h2>
                                <button className="modal-close" onClick={() => setShowViewModal(false)}>×</button>
                            </div>
                            <div className="detail-content">
                                <div className="detail-row">
                                    <span className="detail-label">ID:</span>
                                    <span className="detail-value">{viewingPatient.id}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Name:</span>
                                    <span className="detail-value">{viewingPatient.name}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Email:</span>
                                    <span className="detail-value">{viewingPatient.email}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Birth Date:</span>
                                    <span className="detail-value">{formatDate(viewingPatient.birthDate)}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Age:</span>
                                    <span className="detail-value">{calculateAge(viewingPatient.birthDate)} years</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Gender:</span>
                                    <span className="detail-value">{viewingPatient.gender || '-'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Blood Group:</span>
                                    <span className="detail-value">{formatBloodGroup(viewingPatient.bloodGroup)}</span>
                                </div>
                            </div>
                            <div className="form-actions" style={{ marginTop: '20px' }}>
                                <button className="btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
                                <button className="btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingPatient); }}>Edit Patient</button>
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
                                <h2>{editingPatient ? 'Edit Patient' : 'Add Patient'}</h2>
                                <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Birth Date</label>
                                    <input
                                        type="date"
                                        value={formData.birthDate}
                                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    >
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Blood Group</label>
                                    <select
                                        value={formData.bloodGroup}
                                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                                    >
                                        {BLOOD_GROUPS.map(bg => (
                                            <option key={bg} value={bg}>{formatBloodGroup(bg)}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary">
                                        {editingPatient ? 'Update' : 'Add'} Patient
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
}
