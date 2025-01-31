Search Doctors Component

const [doctors, setDoctors] = useState([]);

useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get("/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  fetchDoctors();
}, []);

return (
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
);

Doctor Profile - Booking Appointment

const handleBooking = async () => {
  try {
    const response = await axiosInstance.post("/appointments", {
      doctorId: id,
      date: appointmentDate,
      time: appointmentTime,
    });

    if (response.data.success) {
      alert("Appointment booked successfully!");
    } else {
      alert("Failed to book appointment. Try again.");
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    alert("An error occurred.");
  }
}
