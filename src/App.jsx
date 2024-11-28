import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Importing pages
import Homepage from './pages/homepage';
import InterviewSheet from './pages/interviewSheet';
import CommitmentSheet from './pages/commitmentSheet';
import EoiForm from './pages/eoiForm';
import TrainingPayments from './pages/trainingPayments';
import MeetingPayments from './pages/meetingPayments';
import Memberapplication from './pages/memberapplication';
import RenewalPayment from './pages/renewalPayment';
import NewMemberPayment from './pages/newMemberPayment';
import VisitorsPayments from './pages/visitorsPayments';
import PaymentStatusPage from './pages/paymentStatusPage';
import ErrorPage from './pages/error-page';

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
        <Route path="/meeting-payment/:universal_link_id/:ulid/:payment_gateway" element={<MeetingPayments />} />
        <Route path="/new-member-payment/:universal_link_id/:ulid/:payment_gateway" element={<NewMemberPayment />} />
        <Route path="/renewal-payment/:universal_link_id/:ulid/:payment_gateway" element={<RenewalPayment />} />
        <Route path="/visitors-payment/:universal_link_id/:ulid/:payment_gateway" element={<VisitorsPayments/>} />
        <Route path="/payment-status/:order_id" element={<PaymentStatusPage/>}/>
        <Route path="/training-payments/:universal_link_id/:ulid/:payment_gateway" element={<TrainingPayments />} />
        <Route path="/event-payments/:universal_link_id/:ulid/:payment_gateway" element={<TrainingPayments />} />

        <Route path="/error-page" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
