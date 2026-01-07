'use client';

import Link from 'next/link';
import Aurora from '@/components/Aurora';
import './landing.css';

export default function LandingPage() {
    return (
        <div className="landing-container">
            {/* Aurora Background */}
            <Aurora
                colorStops={["#3B82F6", "#8B5CF6", "#EC4899"]}
                blend={0.6}
                amplitude={1.2}
                speed={0.4}
            />

            {/* Overlay for better contrast */}
            <div className="aurora-overlay"></div>

            {/* Navigation */}
            <nav className="landing-nav">
                <div className="nav-logo">
                    <span className="logo-icon">🏥</span>
                    <span className="logo-text">MediCare</span>
                </div>
                <div className="nav-actions">
                    <Link href="/login" className="nav-btn nav-btn-outline">
                        Login
                    </Link>
                    <Link href="/register" className="nav-btn nav-btn-primary">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        Modern Healthcare Management
                    </div>
                    <h1 className="hero-title">
                        Transform Your
                        <span className="gradient-text"> Hospital Management</span>
                        <br />Experience
                    </h1>
                    <p className="hero-subtitle">
                        Streamline patient care, doctor scheduling, and hospital operations
                        with our comprehensive management system. Built for modern healthcare.
                    </p>
                    <div className="hero-actions">
                        <Link href="/login" className="hero-btn hero-btn-primary">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                <polyline points="10 17 15 12 10 7" />
                                <line x1="15" y1="12" x2="3" y2="12" />
                            </svg>
                            Login to Dashboard
                        </Link>
                        <Link href="/register" className="hero-btn hero-btn-secondary">
                            Create Account
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-number">10K+</span>
                        <span className="stat-label">Patients Managed</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Doctors</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">50+</span>
                        <span className="stat-label">Departments</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">99.9%</span>
                        <span className="stat-label">Uptime</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Everything You Need</h2>
                <p className="section-subtitle">Comprehensive tools to manage every aspect of your hospital</p>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon blue">👥</div>
                        <h3>Patient Management</h3>
                        <p>Track patient records, medical history, and appointments seamlessly.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon pink">👨‍⚕️</div>
                        <h3>Doctor Scheduling</h3>
                        <p>Manage doctor availability, specializations, and department assignments.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon green">📅</div>
                        <h3>Appointment Booking</h3>
                        <p>Easy-to-use appointment system for patients and staff.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon purple">🏢</div>
                        <h3>Department Control</h3>
                        <p>Organize and manage hospital departments efficiently.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon orange">🛡️</div>
                        <h3>Insurance Tracking</h3>
                        <p>Handle patient insurance claims and coverage information.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon cyan">📊</div>
                        <h3>Analytics Dashboard</h3>
                        <p>Real-time insights and reports for better decision making.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-card">
                    <h2>Ready to Get Started?</h2>
                    <p>Join thousands of healthcare professionals using MediCare HMS</p>
                    <Link href="/register" className="cta-btn">
                        Start Free Today
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <span className="logo-icon">🏥</span>
                        <span>MediCare HMS</span>
                    </div>
                    <p>© 2026 MediCare Hospital Management System. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
