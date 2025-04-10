"use client"

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProS = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('dashboard');
    const [isDark, setIsDark] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState(3);
    const [isAvailable, setIsAvailable] = useState(true);
    
    // État pour les demandes de prise en charge
    const [patientRequests, setPatientRequests] = useState([
        { id: 1, name: 'Marie Dupont', age: 42, urgency: 'Moyenne', status: 'pending', timestamp: '2023-06-15T10:30:00' },
        { id: 2, name: 'Jean Martin', age: 65, urgency: 'Haute', status: 'pending', timestamp: '2023-06-15T09:45:00' },
        { id: 3, name: 'Sophie Leclerc', age: 28, urgency: 'Basse', status: 'pending', timestamp: '2023-06-15T11:15:00' },
    ]);
    
    // État pour les patients pris en charge
    const [acceptedPatients, setAcceptedPatients] = useState([
        { id: 4, name: 'Pierre Dubois', age: 55, urgency: 'Moyenne', status: 'accepted', timestamp: '2023-06-14T16:20:00' },
    ]);
    
    // Effet pour détecter si le mode sombre est activé
    useEffect(() => {
        const checkDarkMode = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            setIsDark(isDarkMode);
        };
        
        checkDarkMode();
        
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        
        return () => observer.disconnect();
    }, []);

    // Navigation item click handler
    const handleNavClick = (item) => {
        setActiveItem(item);
        setIsMobileMenuOpen(false);
        
        // Navigation logic
        switch(item) {
            case 'account':
                navigate('/AccountSettings');
                break;
            case 'help':
                navigate('/help');
                break;
            case 'logout':
                // Implement logout logic
                console.log('Logging out...');
                break;
            default:
                // Just update the active state for other items
                break;
        }
    };

    // Fonction pour changer le statut de disponibilité
    const toggleAvailability = () => {
        setIsAvailable(!isAvailable);
    };

    // Fonction pour accepter une demande de prise en charge
    const acceptPatient = (patientId) => {
        const updatedRequests = patientRequests.filter(patient => patient.id !== patientId);
        const acceptedPatient = patientRequests.find(patient => patient.id === patientId);
        
        if (acceptedPatient) {
            acceptedPatient.status = 'accepted';
            setPatientRequests(updatedRequests);
            setAcceptedPatients([...acceptedPatients, acceptedPatient]);
        }
    };

    // Fonction pour refuser une demande de prise en charge
    const declinePatient = (patientId) => {
        const updatedRequests = patientRequests.filter(patient => patient.id !== patientId);
        setPatientRequests(updatedRequests);
    };

    // Fonction pour annuler une prise en charge
    const cancelPatientCare = (patientId) => {
        const updatedAccepted = acceptedPatients.filter(patient => patient.id !== patientId);
        setAcceptedPatients(updatedAccepted);
    };

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Données pour les statistiques
    const stats = [
        { 
            label: 'Statut', 
            value: isAvailable ? 'Disponible' : 'Non disponible', 
            icon: 'activity', 
            color: isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600' 
        },
        { 
            label: 'Demandes en attente', 
            value: patientRequests.length, 
            icon: 'clock', 
            color: 'bg-blue-100 text-blue-600' 
        },
        { 
            label: 'Patients pris en charge', 
            value: acceptedPatients.length, 
            icon: 'users', 
            color: 'bg-purple-100 text-purple-600' 
        },
    ];

    // Fonction pour rendre une icône simple
    const renderIcon = (name) => {
        switch(name) {
            case 'user':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
            case 'settings':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
            case 'file-edit':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>;
            case 'history':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
            case 'help-circle':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
            case 'log-out':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
            case 'bell':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
            case 'activity':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
            case 'chevron-right':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;
            case 'menu':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
            case 'x':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
            case 'home':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
            case 'clock':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
            case 'users':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
            case 'check':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
            case 'x-circle':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
            default:
                return null;
        }
    };

    // Couleur du texte en mode sombre qui correspond au bg-gray-800
    const darkModeTextColor = "#1f2937"; // Équivalent à bg-gray-800

    return (
        <div className={`flex flex-col md:flex-row h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            {/* Mobile Header */}
            <div className={`md:hidden flex items-center justify-between p-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <div className="flex items-center">
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="mr-3"
                    >
                        {isMobileMenuOpen ? renderIcon('x') : renderIcon('menu')}
                    </button>
                    <h2 className="text-xl font-semibold">E-mergency Pro</h2>
                </div>
                <div className="flex items-center">
                    <button className="relative p-2">
                        {renderIcon('bell')}
                        {notifications > 0 && (
                            <span className="absolute top-1 right-1 bg-[#f05050] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {notifications}
                            </span>
                        )}
                    </button>
                    <div className="h-8 w-8 rounded-full bg-[#f05050] ml-3 flex items-center justify-center text-white font-medium">
                        DR
                    </div>
                </div>
            </div>

            {/* Vertical Menu - Desktop */}
            <div className={`hidden md:flex flex-col w-64 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg h-full`}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-[#f05050] flex items-center justify-center text-white font-bold mr-3">
                        E
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">E-mergency Pro</h2>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Portail Professionnel</p>
                    </div>
                </div>
                
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full bg-[#f05050] flex items-center justify-center text-white font-medium text-lg">
                            DR
                        </div>
                        <div>
                            <h3 className="font-medium">Dr. Richard Martin</h3>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cardiologue</p>
                        </div>
                    </div>
                </div>
                
                <nav className="flex-1 py-6 px-3">
                    <ul className="space-y-2">
                        <li>
                            <button 
                                onClick={() => handleNavClick('dashboard')}
                                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                    activeItem === 'dashboard' 
                                        ? 'bg-[#f05050] text-white shadow-md' 
                                        : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }`}
                            >
                                <span className="mr-3 h-5 w-5">{renderIcon('home')}</span>
                                <span className="font-medium">Tableau de bord</span>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleNavClick('patients')}
                                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                    activeItem === 'patients' 
                                        ? 'bg-[#f05050] text-white shadow-md' 
                                        : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }`}
                            >
                                <span className="mr-3 h-5 w-5">{renderIcon('users')}</span>
                                <span className="font-medium">Mes patients</span>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleNavClick('account')}
                                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                    activeItem === 'account' 
                                        ? 'bg-[#f05050] text-white shadow-md' 
                                        : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }`}
                            >
                                <span className="mr-3 h-5 w-5">{renderIcon('settings')}</span>
                                <span className="font-medium">Paramètres</span>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleNavClick('history')}
                                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                    activeItem === 'history' 
                                        ? 'bg-[#f05050] text-white shadow-md' 
                                        : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }`}
                            >
                                <span className="mr-3 h-5 w-5">{renderIcon('history')}</span>
                                <span className="font-medium">Historique</span>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleNavClick('help')}
                                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                    activeItem === 'help' 
                                        ? 'bg-[#f05050] text-white shadow-md' 
                                        : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                }`}
                            >
                                <span className="mr-3 h-5 w-5">{renderIcon('help-circle')}</span>
                                <span className="font-medium">Aide</span>
                            </button>
                        </li>
                    </ul>
                </nav>
                
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                        onClick={() => handleNavClick('logout')}
                        className={`w-full flex items-center justify-center px-4 py-3 rounded-lg ${
                            isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-all duration-200`}
                    >
                        <span className="mr-2 h-5 w-5">{renderIcon('log-out')}</span>
                        <span className="font-medium">Déconnexion</span>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu - Slide in */}
            {isMobileMenuOpen && (
                <div className={`md:hidden fixed inset-0 z-50 ${isDark ? 'bg-gray-900/80' : 'bg-black/50'}`} onClick={() => setIsMobileMenuOpen(false)}>
                    <div 
                        className={`w-64 h-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg transform transition-transform duration-300 ease-in-out`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-[#f05050] flex items-center justify-center text-white font-bold mr-2">
                                        E
                                    </div>
                                    <h2 className="text-lg font-bold">E-mergency Pro</h2>
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)}>
                                    {renderIcon('x')}
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-[#f05050] flex items-center justify-center text-white font-medium">
                                    DR
                                </div>
                                <div>
                                    <h3 className="font-medium">Dr. Richard Martin</h3>
                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cardiologue</p>
                                </div>
                            </div>
                        </div>
                        
                        <nav className="mt-4 px-3">
                            <ul className="space-y-2">
                                <li>
                                    <button 
                                        onClick={() => handleNavClick('dashboard')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeItem === 'dashboard' 
                                                ? 'bg-[#f05050] text-white shadow-md' 
                                                : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                    >
                                        <span className="mr-3 h-5 w-5">{renderIcon('home')}</span>
                                        <span className="font-medium">Tableau de bord</span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleNavClick('patients')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeItem === 'patients' 
                                                ? 'bg-[#f05050] text-white shadow-md' 
                                                : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                    >
                                        <span className="mr-3 h-5 w-5">{renderIcon('users')}</span>
                                        <span className="font-medium">Mes patients</span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleNavClick('account')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeItem === 'account' 
                                                ? 'bg-[#f05050] text-white shadow-md' 
                                                : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                    >
                                        <span className="mr-3 h-5 w-5">{renderIcon('settings')}</span>
                                        <span className="font-medium">Paramètres</span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleNavClick('history')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeItem === 'history' 
                                                ? 'bg-[#f05050] text-white shadow-md' 
                                                : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                    >
                                        <span className="mr-3 h-5 w-5">{renderIcon('history')}</span>
                                        <span className="font-medium">Historique</span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleNavClick('help')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeItem === 'help' 
                                                ? 'bg-[#f05050] text-white shadow-md' 
                                                : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                    >
                                        <span className="mr-3 h-5 w-5">{renderIcon('help-circle')}</span>
                                        <span className="font-medium">Aide</span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleNavClick('logout')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeItem === 'logout' 
                                                ? 'bg-[#f05050] text-white shadow-md' 
                                                : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                    >
                                        <span className="mr-3 h-5 w-5">{renderIcon('log-out')}</span>
                                        <span className="font-medium">Déconnexion</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
                        
            {/* Main Content - Modification du padding-top et suppression du header fixe */}
            <div className="flex-1 overflow-auto"> {/* Suppression du pt-16 */}
                {/* Desktop Header - Modification pour ne plus être fixe */}
                <div className={`hidden md:flex items-center justify-between p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold">Tableau de bord</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="relative p-2">
                            <span className="h-5 w-5">{renderIcon('bell')}</span>
                            {notifications > 0 && (
                                <span className="absolute top-1 right-1 bg-[#f05050] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {notifications}
                                </span>
                            )}
                        </button>
                        <div className="h-8 w-8 rounded-full bg-[#f05050] flex items-center justify-center text-white font-medium">
                            DR
                        </div>
                    </div>
                </div>
                
                <div className="p-6"> {/* Suppression de mt-10 */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-6">Bienvenue, Dr. Richard Martin</h2>
                        
                        {/* Bouton de disponibilité */}
                        <div className="mb-8 flex justify-center">
                            <button 
                                onClick={toggleAvailability}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center ${
                                    isAvailable 
                                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                                        : 'bg-red-500 hover:bg-red-600 text-white'
                                }`}
                            >
                                <span className="mr-2">
                                    {isAvailable ? 'Disponible' : 'Non disponible'}
                                </span>
                                <span className="h-5 w-5">
                                    {isAvailable ? renderIcon('check') : renderIcon('x-circle')}
                                </span>
                            </button>
                        </div>
                        
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div 
                                    key={index} 
                                    className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 flex items-center`}
                                >
                                    <div className={`${stat.color} p-4 rounded-full mr-5`}>
                                        <span className="h-6 w-6 block">{renderIcon(stat.icon)}</span>
                                    </div>
                                    <div>
                                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                                        <p className="font-semibold text-lg">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Demandes de prise en charge */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Demandes de prise en charge</h3>
                            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden`}>
                                {patientRequests.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className={`${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-600'} text-left`}>
                                                <tr>
                                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Patient</th>
                                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Âge</th>
                                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Urgence</th>
                                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Date</th>
                                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {patientRequests.map((patient) => (
                                                    <tr key={patient.id} className={`${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                                                    {patient.name.split(' ').map(n => n[0]).join('')}
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="font-medium">{patient.name}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{patient.age} ans</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                patient.urgency === 'Haute' 
                                                                    ? 'bg-red-100 text-red-800' 
                                                                    : patient.urgency === 'Moyenne'
                                                                        ? 'bg-yellow-100 text-yellow-800'
                                                                        : 'bg-green-100 text-green-800'
                                                            }`}>
                                                                {patient.urgency}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            {formatDate(patient.timestamp)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <div className="flex space-x-2">
                                                                <button 
                                                                    onClick={() => acceptPatient(patient.id)}
                                                                    className="text-green-600 hover:text-green-900 dark:hover:text-green-400"
                                                                    disabled={!isAvailable}
                                                                >
                                                                    Accepter
                                                                </button>
                                                                <button 
                                                                    onClick={() => declinePatient(patient.id)}
                                                                    className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                                                                >
                                                                    Refuser
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="p-6 text-center">
                                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Aucune demande de prise en charge en attente</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Patients pris en charge */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Patients pris en charge</h3>
                            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden`}>
                                {acceptedPatients.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className={`${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-600'} text-left`}>
                                                <tr>
                                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Patient</th>
                                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Âge</th>
                                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Urgence</th>
                                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Date</th>
                                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {acceptedPatients.map((patient) => (
                                                    <tr key={patient.id} className={`${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                                                                    {patient.name.split(' ').map(n => n[0]).join('')}
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="font-medium">{patient.name}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{patient.age} ans</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                patient.urgency === 'Haute' 
                                                                    ? 'bg-red-100 text-red-800' 
                                                                    : patient.urgency === 'Moyenne'
                                                                        ? 'bg-yellow-100 text-yellow-800'
                                                                        : 'bg-green-100 text-green-800'
                                                            }`}>
                                                                {patient.urgency}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            {formatDate(patient.timestamp)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button 
                                                                onClick={() => cancelPatientCare(patient.id)}
                                                                className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                                                            >
                                                                Annuler la prise en charge
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="p-6 text-center">
                                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Aucun patient pris en charge actuellement</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProS;