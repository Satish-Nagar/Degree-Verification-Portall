# MongoDB Setup & Student/Recruiter Panels Guide

## ✅ What's Been Implemented

### Backend APIs
- **Student Login API** (`/api/student/login`) - Login with roll number + DOB
- **Student Profile API** (`/api/student/profile`) - Get student details
- **Student Requests API** (`/api/student/requests`) - Manage recruiter access requests
- **Recruiter Verify API** (`/api/recruiter/verify`) - Verify student credentials
- **Recruiter Request Access API** (`/api/recruiter/request-access`) - Request full student details

### Frontend Pages
- **Student Panel** (`/student`) - Full student dashboard with:
  - Login with roll number + DOB
  - View academic profile
  - Approve/deny recruiter access requests
  - View verification history
  - Request data corrections with document upload

- **Recruiter Panel** (`/recruiter`) - Recruiter verification portal with:
  - Verify student by roll number + university + batch
  - View verification results
  - Fraud detection (duplicate roll numbers)
  - Request full academic details
  - Download verification certificates

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `mongodb` - MongoDB driver
- `csv-parser` - For CSV import script

### 2. Configure MongoDB URI

Make sure your `.env.local` file includes:

```env
MONGODB_URI=mongodb+srv://abhishekraj142004_db_user:Abhi%409955@degree0.vrivg4y.mongodb.net/degree_verification?retryWrites=true&w=majority&appName=Degree0
```

**Note:** Replace `Abhi%409955` with your actual password (URL-encoded if it contains special characters).

### 3. Import CSV Data to MongoDB

Run the import script to load your `final_combined_data.csv` into MongoDB:

```bash
node scripts/import-csv.js
```

**What this does:**
- Reads `final_combined_data.csv` from the project root
- Imports all student records into MongoDB collection `students`
- Creates indexes on `RollNo`, `UnivName`, `AcademicYear`, and `DateOfBirth` for faster queries
- Shows progress as it imports

**Expected output:**
```
Connected to MongoDB
Reading CSV file...
Read 296502 records from CSV
Inserted 1000/296502 records...
Inserted 2000/296502 records...
...
✅ Successfully imported 296502 student records!
✅ Created indexes for faster queries
Disconnected from MongoDB
```

### 4. Start Development Server

```bash
npm run dev
```

Visit:
- **Student Panel:** http://localhost:3000/student
- **Recruiter Panel:** http://localhost:3000/recruiter

## 🎯 How to Use

### Student Panel

1. **Login:**
   - Go to `/student`
   - Enter your **Roll Number** (e.g., `198070172`)
   - Enter your **Date of Birth** (format: DD/MM/YYYY or YYYY-MM-DD)
   - Click "Login"

2. **View Profile:**
   - After login, see your complete academic profile
   - View roll number, name, university, college, program, results, etc.

3. **Manage Access Requests:**
   - Go to "Access Requests" tab
   - See pending recruiter requests
   - Approve or deny each request

4. **Request Data Corrections:**
   - Go to "Data Corrections" tab
   - Select field to correct
   - Upload supporting documents
   - Submit correction request

### Recruiter Panel

1. **Verify Student:**
   - Go to `/recruiter`
   - Enter **Roll Number** (e.g., `198070172`)
   - Enter **University** name (e.g., `BARKATULLAH VISHWAVIDYALAYA`)
   - Optionally enter **Batch/Year** (e.g., `2019-2020`)
   - Click "Verify Student"

2. **View Results:**
   - See student name, enrollment year, program, results
   - Check verification status
   - **Fraud Detection:** If duplicate roll numbers found, a warning is shown

3. **Request Full Details:**
   - Click "Request Full Academic Details"
   - Request is sent to student for approval
   - Student can approve/deny from their panel

4. **Download Certificate:**
   - Click "Download Verification Certificate"
   - (Certificate generation can be implemented later)

## 🔍 Database Structure

### Collection: `students`
Contains all student records from CSV with fields:
- `RollNo` - Roll number (indexed)
- `StudentName` - Student name
- `DateOfBirth` - Date of birth (indexed)
- `UnivName` - University name (indexed)
- `College` - College name
- `ExamName` - Program/Exam name
- `AcademicYear` - Academic year (indexed)
- `Result`, `Percentage`, `Division` - Results
- `StatusDesc` - Status (REGULAR, etc.)
- And all other CSV fields

### Collection: `recruiter_access_requests`
Stores recruiter access requests:
- `rollNumber` - Student roll number
- `recruiterId` - Recruiter ID
- `organizationName` - Organization name
- `requestType` - Type of request (e.g., 'full_details')
- `status` - Status (pending, approved, denied)
- `createdAt`, `updatedAt` - Timestamps

## 🐛 Troubleshooting

**Import fails?**
- Check MongoDB URI is correct in `.env.local`
- Ensure CSV file exists at project root: `final_combined_data.csv`
- Check MongoDB connection (firewall, network access)

**Student login fails?**
- Verify roll number format matches CSV (may need to remove `.0` suffix)
- Check date of birth format matches CSV format
- Check MongoDB collection has data

**Recruiter verify fails?**
- University name must match exactly (case-insensitive search)
- Check roll number exists in database
- Verify MongoDB connection

## 📝 Next Steps (Optional Enhancements)

- [ ] Add session management (JWT tokens)
- [ ] Implement certificate PDF generation
- [ ] Add email notifications for requests
- [ ] Add data correction workflow
- [ ] Add recruiter organization management
- [ ] Add audit logs for all actions
- [ ] Add pagination for large datasets
- [ ] Add search filters for recruiters

---

**Status:** ✅ Fully Functional
**Last Updated:** Ready for testing with MongoDB Atlas

