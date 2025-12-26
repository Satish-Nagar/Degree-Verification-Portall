import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rollNumber = searchParams.get('rollNumber');

    if (!rollNumber) {
      return NextResponse.json(
        { error: 'Roll number is required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const studentsCollection = db.collection('students');

    const normalizedRoll = rollNumber.toString().replace(/\.0+$/, '');
    const student = await studentsCollection.findOne({
      RollNo: normalizedRoll,
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      student: {
        rollNumber: student.RollNo,
        name: student.StudentName,
        dob: student.DateOfBirth,
        university: student.UnivName,
        college: student.College,
        program: student.ExamName,
        academicYear: student.AcademicYear,
        enrollmentNumber: student.EnrlNo,
        applicationNumber: student.ApplicationNo,
        result: student.Result,
        percentage: student.Percentage,
        division: student.Division,
        status: student.StatusDesc,
        gender: student.Gender,
        caste: student.Caste,
        fatherName: student.FatherName,
        motherName: student.MotherName,
        maritalStatus: student.MaritialStatus,
        examSession: student.ExamSession,
        examDeclarationDate: student.ExamDeclerationDate,
        markSheetNo: student.MarkSheetNo,
      },
    });
  } catch (error) {
    console.error('Get student profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

