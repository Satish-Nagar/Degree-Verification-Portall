const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// MongoDB connection URI - reads from .env.local
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in .env.local');
  console.error('Please add MONGODB_URI to your .env.local file');
  process.exit(1);
}

console.log('📋 MongoDB URI loaded (first 50 chars):', MONGODB_URI.substring(0, 50) + '...');

async function importCSV() {
  // Fix common URI encoding issues
  let fixedURI = MONGODB_URI;
  
  // If password contains @ but is not properly encoded, fix it
  if (fixedURI.includes('@') && !fixedURI.includes('%40')) {
    console.log('⚠️  Warning: Password may contain unencoded @ symbol');
  }
  
  // Replace %99 with %40 if it's incorrectly encoded
  if (fixedURI.includes('%99')) {
    console.log('⚠️  Fixing incorrect password encoding (%99 -> %40)');
    fixedURI = fixedURI.replace(/%99/g, '%40');
  }
  
  const client = new MongoClient(fixedURI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('degree_verification');
    const collection = db.collection('students');

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await collection.deleteMany({});
    // console.log('Cleared existing data');

    const csvPath = path.join(__dirname, '..', 'final_combined_data.csv');
    const students = [];

    console.log('Reading CSV file...');

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          // Convert all fields to appropriate types
          const student = {
            ...row,
            RollNo: row.RollNo ? row.RollNo.toString().replace(/\.0+$/, '') : row.RollNo,
            AcademicYear: row.AcademicYear || '',
            ExamSession: row.ExamSession || '',
            StudentName: row.StudentName || '',
            DateOfBirth: row.DateOfBirth || '',
            UnivName: row.UnivName || '',
            College: row.College || '',
            ExamName: row.ExamName || '',
            Result: row.Result || '',
            Percentage: row.Percentage ? parseFloat(row.Percentage) : null,
            Division: row.Division || '',
            StatusDesc: row.StatusDesc || '',
            Gender: row.Gender || '',
            Caste: row.Caste || '',
            FatherName: row.FatherName || '',
            MotherName: row.MotherName || '',
            EnrlNo: row.EnrlNo || '',
            ApplicationNo: row.ApplicationNo || '',
            MaritialStatus: row.MaritialStatus || '',
            ExamDeclerationDate: row.ExamDeclerationDate || '',
            MarkSheetNo: row.MarkSheetNo || '',
          };
          students.push(student);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    console.log(`Read ${students.length} records from CSV`);

    if (students.length === 0) {
      console.log('No data to import');
      return;
    }

    // Insert in batches of 1000
    const batchSize = 1000;
    let inserted = 0;

    for (let i = 0; i < students.length; i += batchSize) {
      const batch = students.slice(i, i + batchSize);
      await collection.insertMany(batch, { ordered: false });
      inserted += batch.length;
      console.log(`Inserted ${inserted}/${students.length} records...`);
    }

    console.log(`\n✅ Successfully imported ${inserted} student records!`);

    // Create indexes for faster queries
    await collection.createIndex({ RollNo: 1 });
    await collection.createIndex({ UnivName: 1 });
    await collection.createIndex({ AcademicYear: 1 });
    await collection.createIndex({ DateOfBirth: 1 });
    console.log('✅ Created indexes for faster queries');

  } catch (error) {
    console.error('Error importing CSV:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

importCSV();

