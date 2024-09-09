import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Importing pages
import Homepage from './pages/homepage';
import InterviewSheet from './pages/interviewSheet';
import CommitmentSheet from './pages/commitmentSheet';
import EoiForm from './pages/eoiForm';
import AllTrainingPayments from './pages/allTrainingPayments';
import MeetingPayments from './pages/meetingPayments';
import Memberapplication from './pages/memberapplication';
import RenewalPayment from './pages/renewalPayment';
import RenewalPaymentWithLateFee from './pages/renewalPaymentWithLateFee';
import NewMemberPayment from './pages/newMemberPayment';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/member-application" element={<Memberapplication />} />
        <Route path="/interview-sheet" element={<InterviewSheet />} />
        <Route path="/commitment-sheet" element={<CommitmentSheet />} />
        <Route path="/eoi-form" element={<EoiForm />} />
        <Route path="/all-training-payments" element={<AllTrainingPayments />} />
        <Route path="/meeting-payment" element={<MeetingPayments />} />
        <Route path="/new-member-payment" element={<NewMemberPayment />} />
        <Route path="/renewal-payment" element={<RenewalPayment />} />
        <Route path="/renewal-payment-with-late-fee" element={<RenewalPaymentWithLateFee />} />
      </Routes>
    </Router>
  );
}

export default App;
