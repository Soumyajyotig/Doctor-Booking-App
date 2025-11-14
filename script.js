// Data Structure with Real Doctor Names - FINAL VERSION
const doctors = [
    {
        id: 1,
        name: "Dr. Anup Biswas",
        specialty: "Uro-Surgeon (Urology)",
        phone: "79086 82632",
        email: "anup4cnmc@gmail.com",
        nextSerialNumber: 1,
        appointmentsToday: []
    },
    {
        id: 2,
        name: "Dr. Washim Mollah",
        specialty: "Uro-Surgeon, Endo-Urologist",
        phone: "99330 52297",
        email: "wmollah1988@gmail.com",
        nextSerialNumber: 1,
        appointmentsToday: []
    },
    {
        id: 3,
        name: "Dr. Prodip Sarkar",
        specialty: "Dermatologist, Cosmetologist",
        phone: "9933586116",
        email: "dr.prodipsarkar1964@gmail.com",
        nextSerialNumber: 1,
        appointmentsToday: []
    },
    {
        id: 4,
        name: "Dr. Reshmi Thakur",
        specialty: "Gynaecologist & Obstetrician",
        nextSerialNumber: 1,
        appointmentsToday: []
    },
    {
        id: 5,
        name: "Dr. Debabrata Som",
        specialty: "Orthopaedic Surgeon",
        nextSerialNumber: 1,
        appointmentsToday: []
    },
    {
        id: 6,
        name: "Dr. Subhasis Chatterjee",
        specialty: "MD (Neuro)",
        nextSerialNumber: 1,
        appointmentsToday: []
    },
    {
        id: 7,
        name: "Dr. Arkapratim Chowdhury",
        specialty: "MBBS, KOLI, CCEDM Physician",
        nextSerialNumber: 1,
        appointmentsToday: []
    },
    {
        id: 8,
        name: "Dr. Avishek Mallik",
        specialty: "Orthopedics & Orthopaedics Surgeon",
        nextSerialNumber: 1,
        appointmentsToday: []
    },
    {
        id: 9,
        name: "Dr. Soumen Saha",
        specialty: "MBBS, DTHI (Gold Medal)",
        nextSerialNumber: 1,
        appointmentsToday: []
    },
    {
        id: 10,
        name: "Dr. Dipon Maschatak",
        specialty: "MBBS, MD (PMR) - Rheumatologist",
        nextSerialNumber: 1,
        appointmentsToday: []
    },
    {
        id: 11,
        name: "Dr. Santosh Kumar Ghaley",
        specialty: "MBBS, ICPL, DM - Cardiologist",
        nextSerialNumber: 1,
        appointmentsToday: []
    },
    {
        id: 12,
        name: "Dr. Akash Jaiswal",
        specialty: "MBBs, MD (Medicine), Hepatology and Gastroenterology Fellow",
        registration: "Member of American College of Gastroenterology",
        nextSerialNumber: 1,
        appointmentsToday: []
    }
];

let allAppointments = [];
let currentFlow = 'selecting_doctor';
let selectedDoctor = null;
let patientData = {};

document.addEventListener('DOMContentLoaded', () => {
    showDoctorSelection();
});

function showDoctorSelection() {
    const interactionArea = document.getElementById('interactionArea');
    interactionArea.innerHTML = '';
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';
    doctors.forEach(doctor => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `${doctor.name}<br><small>${doctor.specialty}</small>`;
        btn.onclick = () => selectDoctor(doctor);
        optionsDiv.appendChild(btn);
    });
    interactionArea.appendChild(optionsDiv);
    currentFlow = 'selecting_doctor';
}

function selectDoctor(doctor) {
    selectedDoctor = doctor;
    addUserMessage(`Selected: ${doctor.name}`);
    addBotMessage(`Great! You've selected ${doctor.name} (${doctor.specialty}).`);
    setTimeout(() => {
        addBotMessage('Now, please enter your details to complete the booking.');
        showPatientDetailsForm();
    }, 500);
}

function showPatientDetailsForm() {
    const interactionArea = document.getElementById('interactionArea');
    interactionArea.innerHTML = `
        <div class="form-group">
            <label>Full Name:</label>
            <input type="text" id="patientName" placeholder="Enter your full name">
        </div>
        <div class="form-group">
            <label>Phone Number:</label>
            <input type="tel" id="patientPhone" placeholder="Enter your phone number (10 digits)">
        </div>
        <button class="submit-btn" onclick="confirmAndBookAppointment()">Book Appointment</button>
    `;
    currentFlow = 'entering_details';
}

function confirmAndBookAppointment() {
    const nameInput = document.getElementById('patientName');
    const phoneInput = document.getElementById('patientPhone');
    if (!nameInput.value.trim() || !phoneInput.value.trim()) {
        alert('Please fill in all fields!');
        return;
    }
    patientData = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim()
    };
    addUserMessage(`Name: ${patientData.name}, Phone: ${patientData.phone}`);
    const appointment = bookAppointment();
    displayAppointmentConfirmation(appointment);
    updateAdminDashboard();
}

function bookAppointment() {
    const serialNumber = String(selectedDoctor.nextSerialNumber).padStart(3, '0');
    const appointment = {
        id: Date.now(),
        serialNumber: `#${serialNumber}`,
        doctorName: selectedDoctor.name,
        doctorSpecialty: selectedDoctor.specialty,
        patientName: patientData.name,
        patientPhone: patientData.phone,
        bookingDate: new Date().toLocaleDateString('en-IN'),
        bookingTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        status: "Confirmed",
        remindersSent: [],
        lastReminderSent: null
    };
    selectedDoctor.nextSerialNumber++;
    selectedDoctor.appointmentsToday.push(appointment);
    allAppointments.push(appointment);
    return appointment;
}

function displayAppointmentConfirmation(appointment) {
    const chatContainer = document.getElementById('chatContainer');
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'message confirmation';
    confirmationDiv.innerHTML = `
        <div class="message-content">
            <strong>✅ Appointment Confirmed!</strong><br><br>
            <strong>Serial Number:</strong> <span style="font-size: 18px; font-weight: bold;">${appointment.serialNumber}</span><br>
            <strong>Doctor:</strong> ${appointment.doctorName}<br>
            <strong>Specialty:</strong> ${appointment.doctorSpecialty}<br>
            <strong>Patient:</strong> ${appointment.patientName}<br>
            <strong>Booked:</strong> ${appointment.bookingDate} at ${appointment.bookingTime}<br><br>
            <em>Please arrive at the clinic and wait for your serial number to be called.</em>
        </div>
    `;
    chatContainer.appendChild(confirmationDiv);
    const interactionArea = document.getElementById('interactionArea');
    interactionArea.innerHTML = `<button class="submit-btn" onclick="resetBookingFlow()">Book Another Appointment</button>`;
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function resetBookingFlow() {
    selectedDoctor = null;
    patientData = {};
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.innerHTML = `
        <div class="message bot">
            <div class="message-content">
                👋 Welcome! Let me help you book an appointment.
            </div>
        </div>
        <div class="message bot">
            <div class="message-content">
                Please select a doctor:
            </div>
        </div>
    `;
    showDoctorSelection();
}

function addUserMessage(text) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addBotMessage(text) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function updateAdminDashboard() {
    document.getElementById('totalAppointments').textContent = allAppointments.length;
    const calledCount = allAppointments.filter(a => a.status === 'Called').length;
    const cancelledCount = allAppointments.filter(a => a.status === 'Cancelled').length;
    const remindersSentCount = allAppointments.filter(a => a.remindersSent.length > 0).length;
    document.getElementById('calledCount').textContent = calledCount;
    document.getElementById('cancelledCount').textContent = cancelledCount;
    document.getElementById('reminderCount').textContent = remindersSentCount;
    const appointmentList = document.getElementById('appointmentList');
    if (allAppointments.length === 0) {
        appointmentList.innerHTML = '<div class="empty-state"><p>No appointments yet.</p></div>';
        return;
    }
    appointmentList.innerHTML = '';
    allAppointments.forEach(appointment => {
        const card = document.createElement('div');
        card.className = 'appointment-card';
        const statusClass = `status-${appointment.status.toLowerCase()}`;
        let reminderBadges = '';
        if (appointment.remindersSent.length > 0) {
            reminderBadges = '<div class="reminder-badges">';
            appointment.remindersSent.forEach(reminder => {
                reminderBadges += `<span class="reminder-sent-badge">📱 Sent: ${reminder.time}</span>`;
            });
            reminderBadges += '</div>';
        }
        card.innerHTML = `
            <div class="card-header">
                <div class="serial-badge">${appointment.serialNumber}</div>
                ${reminderBadges}
            </div>
            <div class="appointment-info">
                <p><strong>Doctor:</strong> ${appointment.doctorName} (${appointment.doctorSpecialty})</p>
                <p><strong>Patient:</strong> ${appointment.patientName}</p>
                <p><strong>Phone:</strong> <a href="https://wa.me/${appointment.patientPhone.replace(/\D/g, '')}" target="_blank" class="whatsapp-link">${appointment.patientPhone}</a></p>
                <p><strong>Booked:</strong> ${appointment.bookingDate} at ${appointment.bookingTime}</p>
                <p><strong>Status:</strong> <span class="${statusClass}">${appointment.status}</span></p>
                ${appointment.remindersSent.length > 0 ? `<p><strong>Reminders Sent:</strong> ${appointment.remindersSent.length}</p>` : ''}
            </div>
            <div class="appointment-actions">
                <button class="action-btn call-btn" onclick="callPatient(${appointment.id})">Call Patient</button>
                <button class="action-btn reminder-btn" onclick="openReminderModal(${appointment.id})">📱 Send Reminder</button>
                <button class="action-btn cancel-btn" onclick="cancelAppointment(${appointment.id})">Cancel</button>
            </div>
        `;
        appointmentList.appendChild(card);
    });
}

function openReminderModal(appointmentId) {
    const appointment = allAppointments.find(a => a.id === appointmentId);
    if (!appointment || appointment.status === 'Cancelled') {
        alert('Cannot send reminder to cancelled appointment');
        return;
    }
    const modal = document.createElement('div');
    modal.className = 'reminder-modal-overlay';
    modal.id = `modal-${appointmentId}`;
    const modalContent = document.createElement('div');
    modalContent.className = 'reminder-modal';
    const reminderMessages = [
        `Hello ${appointment.patientName}, your appointment with ${appointment.doctorName} is scheduled today. Serial Number: ${appointment.serialNumber}. Please arrive 10 minutes early.`,
        `Reminder: Your appointment with ${appointment.doctorName} (${appointment.doctorSpecialty}) is coming up. Serial: ${appointment.serialNumber}. See you soon!`,
        `Hi ${appointment.patientName}, this is a friendly reminder about your appointment with Dr. ${appointment.doctorName}. Please arrive on time.`,
        `Your appointment details - Doctor: ${appointment.doctorName}, Serial: ${appointment.serialNumber}. Please call if you need to reschedule.`
    ];
    let messageOptions = '';
    reminderMessages.forEach((msg, index) => {
        messageOptions += `
            <div class="reminder-option">
                <p>${msg}</p>
                <button class="send-reminder-btn" onclick="sendReminderMessage(${appointmentId}, '${msg.replace(/'/g, "\\'")}', '${index + 1}')">Send This</button>
            </div>
        `;
    });
    modalContent.innerHTML = `
        <div class="modal-header">
            <h3>Send Reminder to ${appointment.patientName}</h3>
            <button class="modal-close" onclick="closeReminderModal(${appointmentId})">✕</button>
        </div>
        <div class="modal-body">
            <p class="modal-subtitle">Select a message or customize:</p>
            ${messageOptions}
            <div class="custom-message-section">
                <label><strong>Or Send Custom Message:</strong></label>
                <textarea id="customMessage-${appointmentId}" placeholder="Enter your custom reminder message..." class="custom-message-input"></textarea>
                <button class="send-reminder-btn custom-btn" onclick="sendCustomReminder(${appointmentId})">Send Custom Message</button>
            </div>
        </div>
    `;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function closeReminderModal(appointmentId) {
    const modal = document.getElementById(`modal-${appointmentId}`);
    if (modal) {
        modal.remove();
    }
}

function sendReminderMessage(appointmentId, message, templateId) {
    const appointment = allAppointments.find(a => a.id === appointmentId);
    if (!appointment) return;
    const now = new Date();
    const timeStamp = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    appointment.remindersSent.push({
        message: message,
        time: timeStamp,
        template: templateId,
        sentAt: now
    });
    appointment.lastReminderSent = now;
    closeReminderModal(appointmentId);
    alert(`✅ Reminder sent to ${appointment.patientName}!\n\nMessage:\n"${message}"\n\nPhone: ${appointment.patientPhone}`);
    updateAdminDashboard();
}

function sendCustomReminder(appointmentId) {
    const customMessageTextarea = document.getElementById(`customMessage-${appointmentId}`);
    const customMessage = customMessageTextarea.value.trim();
    if (!customMessage) {
        alert('Please enter a message');
        return;
    }
    if (customMessage.length > 500) {
        alert('Message is too long. Maximum 500 characters.');
        return;
    }
    sendReminderMessage(appointmentId, customMessage, 'custom');
}

function callPatient(appointmentId) {
    const appointment = allAppointments.find(a => a.id === appointmentId);
    if (appointment && appointment.status !== 'Cancelled') {
        appointment.status = 'Called';
        updateAdminDashboard();
        alert(`Called patient: ${appointment.patientName} (Serial: ${appointment.serialNumber})\n\nPhone: ${appointment.patientPhone}`);
    }
}

function cancelAppointment(appointmentId) {
    const appointment = allAppointments.find(a => a.id === appointmentId);
    if (appointment && appointment.status !== 'Cancelled') {
        if (confirm(`Cancel appointment ${appointment.serialNumber} for ${appointment.patientName}?`)) {
            appointment.status = 'Cancelled';
            updateAdminDashboard();
            alert(`Appointment ${appointment.serialNumber} has been cancelled.`);
        }
    }
}