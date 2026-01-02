import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
      const db = await getDb();
      const studentsCollection = db.collection('students');
      const recruitCollection = db.collection('recruiter_access_requests');

      const totalStudents = await studentsCollection.countDocuments();
      const totalVerifications = await recruitCollection.countDocuments();

      // Count distinct colleges (non-empty)
      const distinctColleges = await studentsCollection.distinct('College');
      const totalColleges = Array.isArray(distinctColleges)
        ? distinctColleges.filter((c) => c !== null && c !== undefined && String(c).trim() !== '').length
        : 0;

    console.log(totalVerifications,totalStudents)


    return NextResponse.json({
      success: true,
      result:{
        totalStudents,
        totalVerifications,
        totalColleges,
      }
    });
  } catch (error) {
    console.error('Recruiter verify error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}