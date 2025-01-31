import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 text-xl font-semibold shadow-md">
          Practo Clone
        </header>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchDoctors />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const Login = () => {
  const [userType, setUserType] = useState("");

  const handleLogin = () => {
    if (userType === "user") {
      window.location.href = "/home";
    } else if (userType === "doctor") {
      window.location.href = "/doctor-profile";
    } else {
      alert("Please select a user type");
    }
  };

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <div className="space-y-4">
          <Button onClick={() => setUserType("user")}>Login as User</Button>
          <Button onClick={() => setUserType("doctor")}>Login as Doctor</Button>
          <Button className="w-full" onClick={handleLogin}>Continue</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const HomePage = () => (
  <div className="text-center space-y-4">
    <h1 className="text-2xl font-bold">Welcome to Practo Clone</h1>
    <div className="flex flex-col space-y-2">
      <Button onClick={() => (window.location.href = "/search")}>Search Doctors</Button>
      <Button onClick={() => (window.location.href = "/appointments")}>View Appointments</Button>
      <Button onClick={() => (window.location.href = "/profile")}>Your Profile</Button>
    </div>
  </div>
);

const SearchDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Search for Doctors</h2>
        <Input placeholder="Search by specialization or name" className="mb-4" />
        <Button className="w-full">Search</Button>
        <div className="space-y-4 mt-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-gray-100 p-4 rounded shadow cursor-pointer"
              onClick={() => (window.location.href = `/doctor/${doctor.id}`)}
            >
              <p><strong>Doctor Name:</strong> {doctor.name}</p>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Your Appointments</h2>
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded shadow">
              <p><strong>Doctor:</strong> {appointment.doctor}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const UserProfile = () => (
  <Card>
    <CardContent>
      <h2 className="text-xl font-bold mb-4">Your Profile</h2>
      <form className="space-y-4">
        <Input placeholder="Full Name" className="w-full" />
        <Input type="email" placeholder="Email Address" className="w-full" />
        <Textarea placeholder="Address" className="w-full" />
        <Button className="w-full">Save Profile</Button>
      </form>
    </CardContent>
  </Card>
);

const DoctorProfile = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleBooking = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/appointments", {
        doctorId: id,
        date: appointmentDate,
        time: appointmentTime,
      });

      if (response.data.success) {
        alert("Appointment booked successfully!");
        setAppointments((prev) => [
          ...prev,
          { doctor: `Dr. Example ${id}`, date: appointmentDate, time: appointmentTime },
        ]);
      } else {
        alert("Failed to book appointment. Try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred.");
    }
  };

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Doctor Profile</h2>
        <div className="space-y-4">
          <p><strong>Name:</strong> Dr. Example {id}</p>
          <p><strong>Specialization:</strong> Example Specialty</p>
          <p><strong>Experience:</strong> 10 years</p>
          <p><strong>Contact:</strong> example@example.com</p>
          <div className="space-y-2">
            <Input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full"
            />
            <Input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full"
            />
            <Button className="w-full" onClick={handleBooking}>
              Book Appointment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/payment", {
        amount,
      });

      if (response.data.success) {
        alert("Payment successful!");
        setPaymentSuccess(true);
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Make a Payment</h2>
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4"
        />
        <Button className="w-full" onClick={handlePayment}>
          Pay Now
        </Button>
        {paymentSuccess && <p className="text-green-600 mt-4">Payment successful!</p>}
      </CardContent>
    </Card>
  );
};

export default App;
