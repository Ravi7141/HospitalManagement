'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { departmentAPI } from '@/lib/api';

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [formData, setFormData] = useState({ name: '' });

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await departmentAPI.getAll();
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        } finally {
            setLoading(false);
        }
    };

    const getDepartmentDescription = (name) => {
        const descriptions = {
            'Cardiology': 'Heart and cardiovascular system care',
            'Neurology': 'Brain and nervous system disorders',
            'Orthopedics': 'Musculoskeletal system injuries',
            'Pediatrics': 'Medical care for infants and children',
            'Dermatology': 'Skin, hair, and nail conditions',
            'Oncology': 'Cancer diagnosis and treatment',
            'Emergency': '24/7 emergency medical care',
            'Radiology': 'Medical imaging and diagnosis'
        };
        return descriptions[name] || 'Medical department';
    };

    const handleAdd = () => {
        setEditingDepartment(null);
        setFormData({ name: '' });
        setShowModal(true);
    };

    const handleEdit = (department) => {
        setEditingDepartment(department);
        setFormData({ name: department.name });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            try {
                await departmentAPI.delete(id);
                fetchDepartments();
            } catch (error) {
                console.error('Error deleting department:', error);
                alert('Failed to delete department');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDepartment) {
                await departmentAPI.update(editingDepartment.id, formData);
            } else {
                await departmentAPI.create(formData);
            }
            setShowModal(false);
            fetchDepartments();
        } catch (error) {
            console.error('Error saving department:', error);
            alert('Failed to save department');
        }
    };

    if (loading) {
        return (
            <>
                <Header title="Departments" />
                <div className="page-content">
                    <div className="loading"><div className="spinner"></div></div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header title="Departments" />
            <div className="page-content">
                <div className="page-title">
                    <h2>Department Management</h2>
                    <button className="btn-primary" onClick={handleAdd}>+ Add Department</button>
                </div>

                <div className="cards-grid">
                    {departments.map((department) => (
                        <div key={department.id} className="department-card">
                            <div className="department-icon">🏥</div>
                            <h3 className="department-name">{department.name}</h3>
                            <p className="department-desc">{getDepartmentDescription(department.name)}</p>
                            {department.HeadDoctor && (
                                <p className="department-info"><strong>Head Doctor:</strong> {department.HeadDoctor.name}</p>
                            )}
                            <p className="department-info"><strong>Doctors:</strong> {department.doctors?.length || 0}</p>
                            <div className="department-footer">
                                <span></span>
                                <div className="action-buttons">
                                    <button className="action-btn view" title="View">👁</button>
                                    <button className="action-btn edit" title="Edit" onClick={() => handleEdit(department)}>✏️</button>
                                    <button className="action-btn delete" title="Delete" onClick={() => handleDelete(department.id)}>🗑️</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {departments.length === 0 && (
                        <div className="empty-state"><p>No departments found</p></div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingDepartment ? 'Edit Department' : 'Add Department'}</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="e.g., Cardiology, Neurology" />
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">{editingDepartment ? 'Update' : 'Add'} Department</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
