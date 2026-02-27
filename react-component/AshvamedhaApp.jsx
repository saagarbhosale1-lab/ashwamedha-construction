import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import configData from './data.json';

// --- MAIN COMPONENT ---
export default function AshvamedhaApp() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-900 text-gray-100 font-sans relative">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/thank-you" element={<ThankYouPage />} />
                </Routes>
                <FloatingActionButtons />
            </div>
        </Router>
    );
}

// --- NAVBAR ---
function Navbar() {
    return (
        <nav className="bg-gray-800 border-b border-yellow-600/30 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-white tracking-widest uppercase">Ashvamedha</span>
                    <span className="text-xs text-yellow-500 tracking-[0.2em] font-medium -mt-1 uppercase">Construction</span>
                </div>
                <div className="hidden md:flex space-x-8">
                    <a href="#projects" className="text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-yellow-500 transition">Projects</a>
                    <a href="#compliance" className="text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-yellow-500 transition">Compliance</a>
                    <a href="#downloads" className="text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-yellow-500 transition">Downloads</a>
                    <a href="#contact" className="text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-yellow-500 transition">Contact</a>
                </div>
            </div>
        </nav>
    );
}

// --- HOME PAGE ---
function HomePage() {
    const [data, setData] = useState({ categories: [], projects: [], documents: [] });

    useEffect(() => {
        // Simulate fetching data from the local JSON config
        setData(configData);
    }, []);

    return (
        <main className="pb-24">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1541888082470-fa9c6613303c?auto=format&fit=crop&w=1920&q=80"
                    alt="Heavy machinery"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight">
                        Building the <span className="text-yellow-500">Future</span><br />Preserving the Past
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 font-light">
                        Premier Civil & Electrical Contractors in Maharashtra.
                    </p>
                    <a href="#contact" className="inline-block bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded uppercase tracking-wider transition">
                        Request a Quote
                    </a>
                </div>
            </section>

            {/* Project Gallery */}
            <ProjectGallery categories={data.categories} projects={data.projects} />

            {/* Electrical Compliance Card */}
            <ElectricalCompliance />

            {/* Downloads Section */}
            <DownloadsSection documents={data.documents} />

            {/* Contact Form */}
            <ContactSection />
        </main>
    );
}

// --- PROJECT GALLERY ---
function ProjectGallery({ categories, projects }) {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section id="projects" className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white uppercase tracking-wider">Our Showcase</h2>
                    <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4"></div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveFilter('All')}
                        className={`px-4 py-2 border-b-2 text-sm font-bold uppercase transition-colors ${activeFilter === 'All' ? 'border-yellow-500 text-yellow-500' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-4 py-2 border-b-2 text-sm font-bold uppercase transition-colors ${activeFilter === cat ? 'border-yellow-500 text-yellow-500' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map(project => (
                        <div key={project.id} className="group relative overflow-hidden rounded bg-gray-900 border border-gray-700 hover:border-yellow-500/50 transition">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80"></div>
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-2 block">{project.category}</span>
                                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                                <p className="text-sm text-gray-400 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    {project.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- ELECTRICAL COMPLIANCE ---
function ElectricalCompliance() {
    return (
        <section id="compliance" className="py-20 bg-gray-900 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-600/5 rounded-full blur-3xl mix-blend-screen"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-800 border border-gray-700/60 rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-yellow-400 to-yellow-600"></div>

                    <div className="md:flex items-center gap-8">
                        <div className="md:w-1/3 mb-8 md:mb-0">
                            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center border-2 border-yellow-500/30 mb-6">
                                <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wide">Electrical Compliance</h2>
                            <p className="text-yellow-600 font-semibold text-sm mt-1 tracking-widest uppercase">Certified Standards</p>
                        </div>

                        <div className="md:w-2/3 space-y-6">
                            <p className="text-gray-300 leading-relaxed">
                                We design and execute electrical infrastructures that exceed regional safety blueprints. Our team ensures 100% compliance with local statutory bodies prior to handover.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gray-900 p-4 rounded border border-gray-700 flex flex-col">
                                    <span className="text-yellow-500 font-bold mb-2 uppercase text-sm tracking-wider">MSEB Approved</span>
                                    <span className="text-gray-400 text-sm">Maharashtra State Electricity Board grid synchronization and transformer approvals handled turnkey.</span>
                                </div>
                                <div className="bg-gray-900 p-4 rounded border border-gray-700 flex flex-col">
                                    <span className="text-yellow-500 font-bold mb-2 uppercase text-sm tracking-wider">PWD Standards</span>
                                    <span className="text-gray-400 text-sm">Public Works Department scheduled rates and safety IS codes maintained across all wiring & grounding.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- DOWNLOADS SECTION ---
function DownloadsSection({ documents }) {
    const handleDownloadTrack = (docTitle) => {
        // Mock Analytics Tracking
        console.log(`[Analytics] Tracked download click for: ${docTitle}`);
        // In production: gtag('event', 'download', { document: docTitle });
    };

    return (
        <section id="downloads" className="py-20 bg-gray-800 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white uppercase tracking-wider">Resources & Certifications</h2>
                    <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {documents.map(doc => (
                        <a
                            key={doc.id}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleDownloadTrack(doc.title)}
                            className="flex items-center bg-gray-900 border border-gray-700 hover:border-yellow-500 p-6 rounded transition group w-full sm:w-[350px]"
                        >
                            <div className="w-12 h-12 bg-gray-800 group-hover:bg-yellow-500/10 rounded flex items-center justify-center mr-4 transition text-yellow-500">
                                {doc.type === 'ISO' ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                )}
                            </div>
                            <div className="flex-1">
                                <span className="text-xs text-gray-400 uppercase tracking-widest">{doc.type}</span>
                                <h4 className="text-gray-200 font-semibold group-hover:text-white transition">{doc.title}</h4>
                            </div>
                            <svg className="w-5 h-5 text-gray-600 group-hover:text-yellow-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- CONTACT FORM ---
const ContactSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Name is too short!')
        .max(50, 'Name is too long!')
        .required('Full Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone Number is required'),
    inquiryType: Yup.string()
        .required('Please select an inquiry type'),
    message: Yup.string()
        .min(10, 'Message is too short!')
        .required('Message is required')
});

function ContactSection() {
    const navigate = useNavigate();

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        // Mock API call
        setTimeout(() => {
            console.log('Form data submitted:', values);
            setSubmitting(false);
            resetForm();
            navigate('/thank-you');
        }, 1000);
    };

    return (
        <section id="contact" className="py-20 bg-gray-900 border-t border-yellow-600/20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white uppercase tracking-wider">Start Your Project</h2>
                    <p className="text-gray-400 mt-4">Connect with our engineering experts for a detailed consultation.</p>
                </div>

                <div className="bg-gray-800 p-8 rounded border border-gray-700 shadow-xl">
                    <Formik
                        initialValues={{ fullName: '', email: '', phone: '', inquiryType: '', message: '' }}
                        validationSchema={ContactSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="space-y-6">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">Full Name</label>
                                        <Field
                                            type="text"
                                            name="fullName"
                                            className={`w-full bg-gray-900 border ${errors.fullName && touched.fullName ? 'border-red-500' : 'border-gray-700'} rounded px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition`}
                                            placeholder="John Doe"
                                        />
                                        <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">Email Address</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            className={`w-full bg-gray-900 border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-700'} rounded px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition`}
                                            placeholder="john@company.com"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">Phone Number</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-3 text-gray-500">+91</span>
                                            <Field
                                                type="text"
                                                name="phone"
                                                className={`w-full bg-gray-900 border ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-700'} rounded px-4 py-3 pl-12 text-white focus:outline-none focus:border-yellow-500 transition`}
                                                placeholder="9876543210"
                                            />
                                        </div>
                                        <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">Inquiry Type</label>
                                        <Field
                                            as="select"
                                            name="inquiryType"
                                            className={`w-full bg-gray-900 border ${errors.inquiryType && touched.inquiryType ? 'border-red-500' : 'border-gray-700'} rounded px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition`}
                                        >
                                            <option value="" disabled>Select Sector</option>
                                            <option value="residential">Residential Build</option>
                                            <option value="commercial">Commercial/Turnkey</option>
                                            <option value="electrical">Electrical Contracting</option>
                                            <option value="infrastructure">Public Infrastructure</option>
                                        </Field>
                                        <ErrorMessage name="inquiryType" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">Project Details</label>
                                    <Field
                                        as="textarea"
                                        name="message"
                                        rows="4"
                                        className={`w-full bg-gray-900 border ${errors.message && touched.message ? 'border-red-500' : 'border-gray-700'} rounded px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition`}
                                        placeholder="Provide a brief overview of your requirements..."
                                    />
                                    <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-700 disabled:text-gray-500 text-gray-900 font-bold px-8 py-3 rounded uppercase tracking-wider transition flex items-center"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
}

// --- FLOATING ACTION BUTTONS ---
function FloatingActionButtons() {
    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
            <a
                href="tel:+919876543210"
                className="w-14 h-14 bg-gray-800 border border-yellow-500/50 text-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-500 hover:text-gray-900 transition-all hover:scale-110"
                title="Call Us Now"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </a>
            <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#1ebd5a] transition-all hover:scale-110"
                title="WhatsApp Us"
            >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.004 0C5.378 0 0 5.378 0 12.004c0 2.14.566 4.194 1.637 5.987L.207 23.4l5.586-1.465a12.04 12.04 0 006.21 1.705c6.627 0 12.004-5.378 12.004-12.004C24.008 5.378 18.631 0 12.004 0zm0 19.954c-1.801 0-3.535-.485-5.074-1.397l-.364-.216-3.763.987.994-3.666-.237-.376A10.057 10.057 0 011.96 12.004c0-5.541 4.51-10.05 10.044-10.05 5.534 0 10.044 4.51 10.044 10.05 0 5.54-4.51 10.05-10.044 10.05zm5.515-7.534c-.302-.15-1.787-.882-2.064-.984-.277-.101-.478-.15-.68.151-.202.301-.78 1.056-.957 1.258-.176.202-.353.226-.655.075-.302-.15-1.275-.47-2.428-1.5-.898-.802-1.503-1.792-1.68-2.094-.176-.302-.019-.465.132-.616.136-.135.302-.352.453-.528.15-.176.202-.302.302-.503.101-.202.05-.377-.025-.528-.075-.15-.68-1.643-.93-2.251-.246-.593-.497-.512-.68-.521-.176-.009-.378-.01-.58-.01a1.11 1.11 0 00-.806.377c-.277.301-1.058 1.033-1.058 2.518 0 1.485 1.083 2.92 1.234 3.12.15.202 2.126 3.246 5.15 4.551.72.311 1.28.497 1.718.635.722.23 1.38.197 1.898.12.58-.088 1.787-.73 2.038-1.434.252-.704.252-1.308.176-1.434-.075-.126-.277-.202-.58-.352z" />
                </svg>
            </a>
        </div>
    );
}

// --- THANK YOU PAGE ---
function ThankYouPage() {
    const navigate = useNavigate();

    return (
        <main className="h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-600/5 rounded-full blur-3xl mix-blend-screen"></div>

            <div className="text-center px-4 z-10">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border-2 border-yellow-500 mx-auto mb-6">
                    <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-tight">Request Received</h1>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                    Thank you for reaching out to Ashvamedha Construction. Our engineering division will review your details and contact you within 24 hours.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 font-bold px-8 py-3 rounded uppercase tracking-wider transition"
                >
                    Return Home
                </button>
            </div>
        </main>
    );
}
