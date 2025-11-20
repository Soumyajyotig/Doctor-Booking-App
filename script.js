// DOCTOR BOOKING APP - ALL 10 BUGS FIXED
// Complete Script with All 12 Doctors

const doctors = [
    {id:1,name:"Dr. Anup Biswas",specialty:"Uro-Surgeon (Urology)",phone:"79086 82632",email:"anup4cnmc@gmail.com",availableDays:["Monday","Wednesday","Friday"],visitingTime:"10:00 AM",nextSerialNumber:1,appointmentsToday:[],appointmentsCompleted:0,appointmentsCancelled:0,isOnLeave:false,unavailableReason:null},
    {id:2,name:"Dr. Washim Mollah",specialty:"Uro-Surgeon, Endo-Urologist",phone:"99330 52297",email:"wmollah1988@gmail.com",availableDays:["Tuesday","Thursday","Saturday"],visitingTime:"11:30 AM",nextSerialNumber:1,appointmentsToday:[],appointmentsCompleted:0,appointmentsCancelled:0,isOnLeave:false,unavailableReason:null},
    {id:3,name:"Dr. Prodip Sarkar",specialty:"Dermatologist, Cosmetologist",phone:"9933586116",email:"dr.prodipsarkar1964@gmail.com",availableDays:["Monday","Wednesday","Friday"],visitingTime:"2:00 PM",nextSerialNumber:1,appointmentsToday:[],appointmentsCompleted:0,appointmentsCancelled:0,isOnLeave:false,unavailableReason:null},
    {id:4,name:"Dr. Reshmi Thakur",specialty:"Gynaecologist & Obstetrician",availableDays:["Tuesday","Thursday","Saturday"],visitingTime:"3:00 PM",nextSerialNumber:1,appointmentsToday:[],appointmentsCompleted:0,appointmentsCancelled:0,isOnLeave:false,unavailableReason:null},
    {id:5,name:"Dr. Debabrata Som",specialty:"Orthopaedic Surgeon",availableDays:["Monday","Wednesday","Friday"],visitingTime:"11:00 AM",nextSerialNumber:1,appointmentsToday:[],appointmentsCompleted:0,appointmentsCancelled:0,isOnLeave:false,unavailableReason:null},
    {id:6,name:"Dr. Subhasis Chatterjee",specialty:"MD (Neuro)",availableDays:["Tuesday","Thursday"],visitingTime:"10:30 AM",nextSerialNumber:1,appointmentsToday:[],appointmentsCompleted:0,appointmentsCancelled:0,isOnLeave:false,unavailableReason:null},
    {id:7,name:"Dr. Arkapratim Chowdhury",specialty:"MBBS, KOLI, CCEDM Physician",availableDays:["Monday","Wednesday","Saturday"],visitingTime:"9:30 AM",nextSerialNumber:1,appointmentsToday:[],appointmentsCompleted:0,appointmentsCancelled:0,isOnLeave:false,unavailableReason:null},
    {id:8,name:"Dr. Avishek Mallik",specialty:"Orthopedics & Orthopaedics Surgeon",availableDays:["Tuesday","Friday","Saturday"],visitingTime:"1:00 PM",nextSerialNumber:1,appointmentsToday:[],appointmentsCompleted:0,appointmentsCancelled:0,isOnLeave:false,unavailableReason:null},
    {id:9,name:"Dr. Soumen Saha",specialty:"MBBS, DTHI (Gold Medal)",availableDays:["Monday","Thursday","Saturday"],visitingTime:"12:00 PM",nextSerialNumber:1,appointmentsToday:[],appointmentsCompleted:0,appointmentsCancelled:0,isOnLeave:false,unavailableReason:null},
    {id:10,name:"Dr. Dipon Maschatak",specialty:"MBBS, MD (PMR) - Rheumatologist",availableDays:["Wednesday","Friday"],visitingTime:"4:00 PM",nextSerialNumber:1,appointmentsToday:[],appointmentsCompleted:0,appointmentsCancelled:0,isOnLeave:false,unavailableReason:null},
    {id:11,name:"Dr. Santosh Kumar Ghaley",specialty:"MBBS, ICPL, DM - Cardiologist",availableDays:["Monday","Tuesday","Friday"],visitingTime:"8:30 AM",nextSerialNumber:1,appointmentsToday:[],appointmentsCompleted:0,appointmentsCancelled:0,isOnLeave:false,unavailableReason:null},
    {id:12,name:"Dr. Akash Jaiswal",specialty:"MBBS, MD (Medicine), Hepatology and Gastroenterology Fellow",availableDays:["Monday","Thursday","Saturday"],visitingTime:"9:00 AM",nextSerialNumber:1,appointmentsToday:[],appointmentsCompleted:0,appointmentsCancelled:0,isOnLeave:false,unavailableReason:null}
];

let allAppointments=[];
let currentFlow='selecting_doctor';
let selectedDoctor=null;
let patientData={};
let globalNotification=null;

function getTodayDayName(){return new Date().toLocaleDateString('en-US',{weekday:'long'})}
function isDoctorAvailableToday(doctor){return doctor.availableDays.includes(getTodayDayName())&&!doctor.isOnLeave}
function getBookingDisplayDate(){return"Today"}

function showDoctorSelection(){
const interactionArea=document.getElementById('interactionArea');
if(!interactionArea)return;
interactionArea.innerHTML='';
const todayDay=getTodayDayName();
const availableDoctors=doctors.filter(isDoctorAvailableToday);
const optionsDiv=document.createElement('div');
optionsDiv.className='options';
if(availableDoctors.length===0){
const noDoctor=document.createElement('div');
noDoctor.className='no-doctors';
noDoctor.innerHTML='<p>❌ No doctors available on '+todayDay+'. Please check back on another day.</p>';
optionsDiv.appendChild(noDoctor);
}else{
availableDoctors.forEach(doctor=>{
const btn=document.createElement('button');
btn.className='option-btn';
btn.innerHTML=`${doctor.name}<br><small>${doctor.specialty}</small><br><small><strong>⏰ Visiting Time: ${doctor.visitingTime}</strong></small>`;
btn.onclick=()=>selectDoctor(doctor);
optionsDiv.appendChild(btn);
});
}
interactionArea.appendChild(optionsDiv);
if(globalNotification){
const notifDiv=document.createElement('div');
notifDiv.className='global-notification';
notifDiv.innerHTML=`<strong>⚠️ ${globalNotification}</strong>`;
interactionArea.appendChild(notifDiv);
}
currentFlow='selecting_doctor';
}

function selectDoctor(doctor){
if(doctor.isOnLeave){
alert(`❌ ${doctor.name} is on leave. Please select another doctor.`);
return;
}
selectedDoctor=doctor;
addUserMessage(`Selected: ${doctor.name}`);
addBotMessage(`Great! You've selected ${doctor.name} (${doctor.specialty}).`);
addBotMessage(`Doctor will be available at ${doctor.visitingTime}.`);
setTimeout(()=>{
addBotMessage('Now, please enter your details to complete the booking.');
showPatientDetailsForm();
},500);
}

function showPatientDetailsForm(){
const interactionArea=document.getElementById('interactionArea');
if(!interactionArea)return;
interactionArea.innerHTML=`
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
currentFlow='entering_details';
}

function confirmAndBookAppointment(){
const nameInput=document.getElementById('patientName');
const phoneInput=document.getElementById('patientPhone');
if(!nameInput.value.trim()||!phoneInput.value.trim()){
alert('Please fill in all fields!');
return;
}
const existingAppointment=allAppointments.find(
a=>a.patientPhone===phoneInput.value.trim()&&
a.doctorName===selectedDoctor.name&&
a.status!=='Cancelled'&&
a.status!=='Completed'
);
if(existingAppointment){
alert(`❌ You already have an active appointment with ${selectedDoctor.name}.\n\nSerial: ${existingAppointment.serialNumber}\n\nOne booking per person per doctor allowed!`);
return;
}
patientData={
name:nameInput.value.trim(),
phone:phoneInput.value.trim()
};
addUserMessage(`Name: ${patientData.name}, Phone: ${patientData.phone}`);
const appointment=bookAppointment();
displayAppointmentConfirmation(appointment);
updateAdminDashboard();
renderPerDoctorStats();
}

function bookAppointment(){
const serialNumber=String(selectedDoctor.nextSerialNumber).padStart(3,'0');
const appointment={
id:Date.now(),
serialNumber:`#${serialNumber}`,
doctorName:selectedDoctor.name,
doctorSpecialty:selectedDoctor.specialty,
doctorVisitingTime:selectedDoctor.visitingTime,
patientName:patientData.name,
patientPhone:patientData.phone,
bookingDate:new Date().toLocaleDateString('en-IN'),
bookingDisplayDate:getBookingDisplayDate(),
bookingTime:new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:true}),
status:"Confirmed",
remindersSent:[],
lastReminderSent:null
};
selectedDoctor.nextSerialNumber++;
selectedDoctor.appointmentsToday.push(appointment);
allAppointments.push(appointment);
return appointment;
}

function displayAppointmentConfirmation(appointment){
const chatContainer=document.getElementById('chatContainer');
if(!chatContainer)return;
const confirmationDiv=document.createElement('div');
confirmationDiv.className='message confirmation';
confirmationDiv.innerHTML=`
<div class="message-content">
<strong>✅ Appointment Confirmed!</strong><br><br>
<strong>Serial Number:</strong> <span style="font-size: 18px; font-weight: bold;">${appointment.serialNumber}</span><br>
<strong>Doctor:</strong> ${appointment.doctorName}<br>
<strong>Specialty:</strong> ${appointment.doctorSpecialty}<br>
<strong>Visiting Time:</strong> ${appointment.doctorVisitingTime}<br>
<strong>Patient:</strong> ${appointment.patientName}<br>
<strong>Booking Date:</strong> ${appointment.bookingDisplayDate} at ${appointment.bookingTime}<br><br>
<em>Please arrive at the clinic at ${appointment.doctorVisitingTime} and wait for your serial number to be called.</em>
</div>
`;
chatContainer.appendChild(confirmationDiv);
const interactionArea=document.getElementById('interactionArea');
if(interactionArea){
interactionArea.innerHTML='<button class="submit-btn" onclick="resetBookingFlow()">Book Another Appointment</button>';
}
chatContainer.scrollTop=chatContainer.scrollHeight;
}

function resetBookingFlow(){
selectedDoctor=null;
patientData={};
const chatContainer=document.getElementById('chatContainer');
if(!chatContainer)return;
chatContainer.innerHTML=`
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

function addUserMessage(text){
const chatContainer=document.getElementById('chatContainer');
if(!chatContainer)return;
const messageDiv=document.createElement('div');
messageDiv.className='message user';
messageDiv.innerHTML=`<div class="message-content">${text}</div>`;
chatContainer.appendChild(messageDiv);
chatContainer.scrollTop=chatContainer.scrollHeight;
}

function addBotMessage(text){
const chatContainer=document.getElementById('chatContainer');
if(!chatContainer)return;
const messageDiv=document.createElement('div');
messageDiv.className='message bot';
messageDiv.innerHTML=`<div class="message-content">${text}</div>`;
chatContainer.appendChild(messageDiv);
chatContainer.scrollTop=chatContainer.scrollHeight;
}
