const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let doctors = [
  { id: 1, name: "Dr. Smith", specialization: "Cardiology", experience: 10, contact: "smith@example.com" },
  { id: 2, name: "Dr. Johnson", specialization: "Dermatology", experience: 8, contact: "johnson@example.com" },
  { id: 3, name: "Dr. Williams", specialization: "Neurology", experience: 15, contact: "williams@example.com" },
];

let appointments = [];


app.get('/doctors', (req, res) => {
  res.json(doctors);
});


app.get('/doctors/:id', (req, res) => {
  const doctor = doctors.find((d) => d.id === parseInt(req.params.id));
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ message: "Doctor not found" });
  }
});


app.post('/doctors', (req, res) => {
  const { name, specialization, experience, contact } = req.body;
  if (name && specialization && experience && contact) {
    const newDoctor = {
      id: doctors.length + 1,
      name,
      specialization,
      experience,
      contact,
    };
    doctors.push(newDoctor);
    res.status(201).json(newDoctor);
  } else {
    res.status(400).json({ message: "All fields are required" });
  }
});


app.get('/appointments', (req, res) => {
  res.json(appointments);
});


app.post('/appointments', (req, res) => {
  const { doctorId, date, time } = req.body;
  const doctor = doctors.find((d) => d.id === doctorId);
  if (doctor) {
    const appointment = { id: appointments.length + 1, doctor: doctor.name, date, time };
    appointments.push(appointment);
    res.status(201).json(appointment);
  } else {
    res.status(400).json({ message: "Invalid doctor ID" });
  }
});


app.delete('/appointments/:id', (req, res) => {
  const appointmentId = parseInt(req.params.id);
  appointments = appointments.filter((a) => a.id !== appointmentId);
  res.status(200).json({ message: "Appointment deleted" });
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
