# 🧠 EduGenie – AI-Powered Interactive Learning Assistant

EduGenie is an AI-driven web platform that helps students learn faster and better by generating structured notes, quizzes, and study plans for any topic. Powered by the google/flan-t5-large model optimized with OpenVINO™, EduGenie delivers fast and intelligent content creation tailored for student needs.

🎬 [Demo Video](https://drive.google.com/file/d/1diFHVzrDdstS-Mz5gfH70ao4iHssBldr/view?usp=drive_link)

📽️ Demo: Watch how EduGenie generates notes and quizzes instantly!

---

##  Features

Summary Note Generation using FLAN-T5 large model + OpenVINO (Structured, Simple & Topic-Wise)  
Auto-Generated MCQ Quizzes from the Topic  
7-Day Smart Study Plan Generation  
Voice Input Support (Speech-to-Text for Topic Input)  
Notes Export to PDF  
User Authentication with Login/Register  
Mobile-Responsive UI Built with React  
Optimized Inference with OpenVINO for Fast Results

---

##  Technologies Used

🔹 React.js (Frontend)  
🔹 FastAPI with OpenVINO (Backend AI Inference)  
🔹 google/flan-t5-large via HuggingFace  
🔹 Pyngrok (for exposing local backend)  
🔹 SpeechRecognition API for Voice Input  
🔹 jsPDF for PDF Export  
🔹 OpenVINO Toolkit from Intel for model acceleration

---
##  How It Works
🗣️ Enter or Speak a Topic

🧠 AI generates structured notes using FLAN-T5 + OpenVINO

📝 Notes and  quizzes appear instantly

🧭 Optionally generate a study plan for 7 days

📥 Export content as PDF

---

##  Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Ashwini728/edugenie.git
cd edugenie
```


2. Run the Backend (in one terminal):

```bash
cd backend
python main.py
```

3. Run the Frontend (in another terminal):

```bash
cd frontend
npm install
npm start
```

---

##  Project Summary

###  Outcomes

🔹 AI notes generated in under **1.5 seconds** using FLAN-T5 + OpenVINO  
 🔹 Quiz generation accuracy over **90%** across major topics  
 🔹 7-day study planner tailored to each user input  
 🔹 Real-time voice-to-text + PDF export features working seamlessly  

###  Limitations

 🔸 Currently only supports **MCQ** format for quizzes  
 🔸 No database or user history tracking implemented   
 🔸 Internet connection is required for AI inference and API calls  

###  Future Scope

 💡 Add **multilingual support** for notes and quizzes  
 💡 Integrate cloud-based **user authentication and history** tracking  
 💡 Extend quiz types: **true/false, short answers, explanations**  

---

##  Team

  Anjitha Anil  
  Ashwini Anil  
  Anjali Thomas  
  Saintgits Group of Institutions, Kerala  
  Supported by Intel® Unnati AI Training Program  

---

> Built with 💡 + 💻 to empower learning with AI  
> **#MadeWithOpenVINO #AIForEducation #EduGenie**
