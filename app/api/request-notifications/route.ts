import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const db = await getDb();
        const requestsCollection = db.collection("recruiter_access_requests");
        const studentsCollection = db.collection("students");

        const requests = await requestsCollection
            .find()
            .sort({ createdAt: -1 })
            .toArray();

        const requestsWithStudentFields = await Promise.all(
            requests.map(async (req) => {
                const student = await studentsCollection.findOne({
                    RollNo: parseInt(req.rollNumber),
                });

                const studentRollNumber =
                    student?.RollNo ?? student?.RollNo ?? (req.rollNumber ? parseInt(req.rollNumber) : null);
                const studentName = student?.StudentName ?? student?.StudentName ?? null;

                return {
                    ...req,
                    studentDetails: {
                        rollNumber: studentRollNumber,
                        name: studentName,
                    }
                };
            })
        );

        return NextResponse.json({
            success: true,
            requests: requestsWithStudentFields
        });
    } catch (error) {
        console.error("Get requests error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
