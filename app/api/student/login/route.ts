import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { rollNumber, dob } = await request.json();

    if (!rollNumber || !dob) {
      return NextResponse.json(
        { error: "Roll number and date of birth are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const studentsCollection = db.collection("students");

    // // Normalize roll number - try multiple formats
    // const rollVariations = [
    //   rollNumber.toString().trim(),
    //   rollNumber.toString().replace(/\.0+$/, ''), // Remove trailing .0
    //   rollNumber.toString() + '.0', // Add .0
    //   parseFloat(rollNumber.toString()).toString(), // As number then string
    // ];

    // // Normalize date format - CSV stores as DD/MM/YYYY
    // const dateVariations = [];

    // // Add original input
    // dateVariations.push(dob.trim());

    // // If input is YYYY-MM-DD, convert to DD/MM/YYYY
    // if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    //   const [year, month, day] = dob.split('-');
    //   dateVariations.push(`${day}/${month}/${year}`);
    // }

    // // If input is DD/MM/YYYY, keep as is
    // if (/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) {
    //   dateVariations.push(dob.trim());
    //   // Also try with leading zeros normalized
    //   const parts = dob.split('/');
    //   dateVariations.push(`${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[2]}`);
    // }

    // // Try all combinations of roll number and date variations
    // let student = null;

    // for (const rollVar of rollVariations) {
    //   for (const dateVar of dateVariations) {
    //     // Try exact match
    //     student = await studentsCollection.findOne({
    //       RollNo: rollVar,
    //       DateOfBirth: dateVar,
    //     });
    //     if (student) break;

    //     // Try case-insensitive date match
    //     student = await studentsCollection.findOne({
    //       RollNo: rollVar,
    //       DateOfBirth: { $regex: new RegExp(`^${dateVar.replace(/\//g, '\\/')}$`, 'i') },
    //     });
    //     if (student) break;
    //   }
    //   if (student) break;
    // }

    // // If still not found, try with regex for roll number (handles .0 variations)
    // if (!student) {
    //   const rollPattern = rollNumber.toString().replace(/\.0+$/, '');
    //   for (const dateVar of dateVariations) {
    //     student = await studentsCollection.findOne({
    //       RollNo: { $regex: new RegExp(`^${rollPattern}(\\.0)?$`) },
    //       DateOfBirth: dateVar,
    //     });
    //     if (student) break;
    //   }
    // }

    // if (!student) {
    //   // Debug: Check what's actually in the database for this roll number
    //   const debugStudent = await studentsCollection.findOne({
    //     $or: [
    //       { RollNo: rollNumber.toString() },
    //       { RollNo: rollNumber.toString() + '.0' },
    //       { RollNo: rollNumber.toString().replace(/\.0+$/, '') },
    //     ]
    //   });

    //   if (debugStudent) {
    //     console.log('Debug - Found student with roll number:', debugStudent.RollNo);
    //     console.log('Debug - Stored DOB:', debugStudent.DateOfBirth);
    //     console.log('Debug - Input DOB:', dob);
    //     return NextResponse.json(
    //       {
    //         error: `Roll number found, but date of birth doesn't match. Stored format: ${debugStudent.DateOfBirth}. Please use DD/MM/YYYY format.`
    //       },
    //       { status: 401 }
    //     );
    //   }

    //   return NextResponse.json(
    //     { error: 'Invalid roll number or date of birth. Please check the format (DD/MM/YYYY)' },
    //     { status: 401 }
    //   );
    // }

    console.log(rollNumber, dob);
    console.log(typeof rollNumber, typeof dob);

    let student = null;
    student = await studentsCollection.findOne({
      RollNo: parseInt(rollNumber),
      DateOfBirth: dob,
    });

    if (!student) {
      return NextResponse.json(
        {
          error:
            "Invalid roll number or date of birth. Please check the format (DD/MM/YYYY)",
        },
        { status: 401 }
      );
    }

    // Return student data (exclude sensitive fields if needed)
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
      },
    });
  } catch (error) {
    console.error("Student login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
