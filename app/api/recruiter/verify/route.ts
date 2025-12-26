import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { rollNumber, university, batch } = await request.json();

    if (!rollNumber || !university) {
      return NextResponse.json(
        { error: 'Roll number and university are required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const studentsCollection = db.collection('students');

    const normalizedRoll = parseInt(rollNumber.toString().replace(/\.0+$/, ''));

    // Build query
    const query: any = {
      RollNo: normalizedRoll,
      UnivName: { $regex: new RegExp(university, 'i') },
    };

    // Add batch filter if provided
    if (batch) {
      query.AcademicYear = batch;
    }

    // Find student
    const student = await studentsCollection.findOne(query);

    if (!student) {
      return NextResponse.json(
        { error: 'Student record not found with the provided details' },
        { status: 404 }
      );
    }

    // Check for duplicate roll numbers (fraud detection)
    const duplicates = await studentsCollection.countDocuments({
      RollNo: normalizedRoll,
    });

    const fraudDetected = duplicates > 1;

    return NextResponse.json({
      success: true,
      verification: {
        rollNumber: student.RollNo,
        name: student.StudentName,
        enrollmentYear: student.AcademicYear,
        program: student.ExamName,
        verificationStatus: student.StatusDesc === 'REGULAR' ? 'Verified' : 'Pending',
        university: student.UnivName,
        college: student.College,
        result: student.Result,
        percentage: student.Percentage,
        division: student.Division,
        examSession: student.ExamSession,
      },
      fraudDetected,
      duplicateCount: duplicates,
    });
  } catch (error) {
    console.error('Recruiter verify error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

