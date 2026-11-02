import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { symptomService } from '../services/symptomService';
import { researchService } from '../services/researchService';
import { appointmentService } from '../services/appointmentService';
import HealthOverviewCard from '../components/dashboard/HealthOverviewCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentSymptomsWidget from '../components/dashboard/RecentSymptomsWidget';
import AiInsightsWidget from '../components/dashboard/AiInsightsWidget';
import UpcomingAppointmentsWidget from '../components/dashboard/UpcomingAppointmentsWidget';
import ResearchFeedWidget from '../components/dashboard/ResearchFeedWidget';
import SymptomFormModal from '../components/symptoms/SymptomFormModal';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';

export const Dashboard = () => {
  const { user } = useAuth();
  const [symptoms, setSymptoms] = useState([]);
  const [researchPapers, setResearchPapers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [symptomModalOpen, setSymptomModalOpen] = useState(false);

  const loadDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const [symData, resData, aptData] = await Promise.all([
        symptomService.getSymptoms(),
        researchService.getResearchPapers(),
        appointmentService.getAppointments()
      ]);
      setSymptoms(symData || []);
      setResearchPapers(resData || []);
      setAppointments(aptData || []);
    } catch (err) {
      console.error('Dashboard data load error:', err);
      setError('Unable to fetch live health dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleSaveSymptom = async (formData, editingId) => {
    if (editingId) {
      await symptomService.updateSymptom(editingId, formData);
    } else {
      await symptomService.addSymptom(formData);
    }
    await loadDashboardData();
  };

  const avgSeverity = symptoms.length > 0 
    ? (symptoms.reduce((acc, s) => acc + (s.severity || 5), 0) / symptoms.length).toFixed(1)
    : '6.8';

  if (loading) {
    return <LoadingState message="Connecting to Vericove health portal..." rows={4} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadDashboardData} />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* 1. Health Overview Banner */}
      <HealthOverviewCard
        user={user}
        symptomCount={symptoms.length}
        averageSeverity={avgSeverity}
        upcomingAppointmentCount={appointments.filter(a => a.status === 'Confirmed').length}
        savedResearchCount={researchService.getSavedPaperIds().length}
      />

      {/* 2. Quick Actions Row */}
      <QuickActions onOpenSymptomModal={() => setSymptomModalOpen(true)} />

      {/* 3. Primary Grid: Symptoms & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentSymptomsWidget 
          symptoms={symptoms} 
          onOpenModal={() => setSymptomModalOpen(true)} 
        />
        <AiInsightsWidget />
      </div>

      {/* 4. Secondary Grid: Appointments & Research Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingAppointmentsWidget appointments={appointments} />
        <ResearchFeedWidget papers={researchPapers} />
      </div>

      {/* 5. Medical Disclaimer Footer */}
      <MedicalDisclaimer />

      {/* Modal for Logging Symptom */}
      <SymptomFormModal
        isOpen={symptomModalOpen}
        onClose={() => setSymptomModalOpen(false)}
        onSave={handleSaveSymptom}
      />

    </div>
  );
};

export default Dashboard;
