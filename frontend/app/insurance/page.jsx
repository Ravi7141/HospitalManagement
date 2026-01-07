'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MagicCard from '@/components/MagicCard';
import { insuranceAPI, patientAPI } from '@/lib/api';

export default function Insurance() {
    const [insurances, setInsurances] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewingInsurance, setViewingInsurance] = useState(null);
    const [editingInsurance, setEditingInsurance] = useState(null);
    const [formData, setFormData] = useState({
        patientId: '',
        policyNumber: '',
        provider: '',
        validUntil: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [insuranceRes, patientsRes] = await Promise.all([
                insuranceAPI.getAll(),
                patientAPI.getAll()
            ]);
            setInsurances(insuranceRes.data);
            setPatients(patientsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatDateShort = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-US');
    };

    const getValidityStatus = (validUntil) => {
        if (!validUntil) return 'pending';
        const now = new Date();
        const expiry = new Date(validUntil);
        if (expiry < now) return 'expired';
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        if (expiry - now < thirtyDays) return 'expiring';
        return 'active';
    };

    const handleView = (insurance) => {
        setViewingInsurance(insurance);
        setShowViewModal(true);
    };

    const handleAdd = () => {
        setEditingInsurance(null);
        setFormData({ patientId: '', policyNumber: '', provider: '', validUntil: '' });
        setShowModal(true);
    };

    const handleEdit = (insurance) => {
        setEditingInsurance(insurance);
        setFormData({
            patientId: insurance.patient?.id || '',
            policyNumber: insurance.policyNumber,
            provider: insurance.provider,
            validUntil: insurance.validUntil || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this insurance record?')) {
            try {
                await insuranceAPI.delete(id);
                fetchData();
            } catch (error) {
                console.error('Error deleting insurance:', error);
                alert('Failed to delete insurance');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { policyNumber: formData.policyNumber, provider: formData.provider, validUntil: formData.validUntil };
            if (editingInsurance) {
                await insuranceAPI.update(editingInsurance.id, payload);
            } else {
                await insuranceAPI.create(formData.patientId, payload);
            }
            setShowModal(false);
            fetchData();
        } catch (error) {
            console.error('Error saving insurance:', error);
            alert('Failed to save insurance');
        }
    };

    if (loading) {
        return (
            <>
                <Header title="Insurance" />
                <div className="page-content">
                    <div className="loading"><div className="spinner"></div></div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header title="Insurance" />
            <div className="page-content">
                <div className="page-title">
                    <h2>Insurance Management</h2>
                    <button className="btn-primary" onClick={handleAdd}>+ Add Insurance</button>
                </div>

                <MagicCard className="magic-dashboard-card" gradientColor="#8b5cf6">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Patient</th>
                                    <th>Policy Number</th>
                                    <th>Provider</th>
                                    <th>Valid Until</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {insurances.map((insurance) => (
                                    <tr key={insurance.id}>
                                        <td>{insurance.id}</td>
                                        <td>{insurance.patient?.name || 'N/A'}</td>
                                        <td>{insurance.policyNumber}</td>
                                        <td>{insurance.provider}</td>
                                        <td>{formatDateShort(insurance.validUntil)}</td>
                                        <td>
                                            <span className={`status-badge ${getValidityStatus(insurance.validUntil)}`}>
                                                {getValidityStatus(insurance.validUntil).charAt(0).toUpperCase() + getValidityStatus(insurance.validUntil).slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn view" title="View Details" onClick={() => handleView(insurance)}>👁</button>
                                                <button className="action-btn edit" title="Edit" onClick={() => handleEdit(insurance)}>✏️</button>
                                                <button className="action-btn delete" title="Delete" onClick={() => handleDelete(insurance.id)}>🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {insurances.length === 0 && (
                                    <tr><td colSpan="7" style={{ textAlign: 'center' }}>No insurance records found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </MagicCard>
            </div>

            {/* View Details Modal */}
            {
                showViewModal && viewingInsurance && (
                    <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
                        <div className="modal detail-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Insurance Details</h2>
                                <button className="modal-close" onClick={() => setShowViewModal(false)}>×</button>
                            </div>
                            <div className="detail-content">
                                <div className="detail-row">
                                    <span className="detail-label">ID:</span>
                                    <span className="detail-value">{viewingInsurance.id}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Patient:</span>
                                    <span className="detail-value">{viewingInsurance.patient?.name || 'N/A'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Policy Number:</span>
                                    <span className="detail-value">{viewingInsurance.policyNumber}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Provider:</span>
                                    <span className="detail-value">{viewingInsurance.provider}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Valid Until:</span>
                                    <span className="detail-value">{formatDate(viewingInsurance.validUntil)}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Status:</span>
                                    <span className="detail-value">
                                        <span className={`status-badge ${getValidityStatus(viewingInsurance.validUntil)}`}>
                                            {getValidityStatus(viewingInsurance.validUntil).charAt(0).toUpperCase() + getValidityStatus(viewingInsurance.validUntil).slice(1)}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="form-actions" style={{ marginTop: '20px' }}>
                                <button className="btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
                                <button className="btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingInsurance); }}>Edit Insurance</button>
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
                                <h2>{editingInsurance ? 'Edit Insurance' : 'Add Insurance'}</h2>
                                <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                {!editingInsurance && (
                                    <div className="form-group">
                                        <label>Patient</label>
                                        <select value={formData.patientId} onChange={(e) => setFormData({ ...formData, patientId: e.target.value })} required>
                                            <option value="">Select Patient</option>
                                            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                        </select>
                                    </div>
                                )}
                                <div className="form-group">
                                    <label>Policy Number</label>
                                    <input type="text" value={formData.policyNumber} onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })} required placeholder="e.g., POL-12345" />
                                </div>
                                <div className="form-group">
                                    <label>Provider</label>
                                    <input type="text" value={formData.provider} onChange={(e) => setFormData({ ...formData, provider: e.target.value })} required placeholder="e.g., Blue Cross, Aetna" />
                                </div>
                                <div className="form-group">
                                    <label>Valid Until</label>
                                    <input type="date" value={formData.validUntil} onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })} required />
                                </div>
                                <div className="form-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn-primary">{editingInsurance ? 'Update' : 'Add'} Insurance</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
}
