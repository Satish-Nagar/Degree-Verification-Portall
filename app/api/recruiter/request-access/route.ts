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

        // ✅ OBJECT, not array
        const approvedData: Record<string, any> = {};

        if (student && Array.isArray(req.approvedDetails)) {
          req.approvedDetails.forEach((field) => {
            approvedData[field] =
              student[field] ??
              student[field.charAt(0).toUpperCase() + field.slice(1)] ??
              null;
          });
        }

        return {
          ...req,
          approvedFieldsData: approvedData, // ✅ always object
        };
      })
    );

    // console.log("Requests with student fields:", requestsWithStudentFields[2].approvedFieldsData);

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

export async function POST(request: NextRequest) {
  try {
    const { rollNumber, recruiterId, organizationName, requestType } =
      await request.json();

    if (!rollNumber || !recruiterId || !organizationName) {
      return NextResponse.json(
        {
          error:
            "Roll number, recruiter ID, and organization name are required",
        },
        { status: 400 }
      );
    }

    const db = await getDb();
    const requestsCollection = db.collection("recruiter_access_requests");

    // Create access request
    const newRequest = {
      rollNumber,
      recruiterId,
      organizationName,
      requestType: requestType || "full_details",
      status: "pending",
      approvedDetails: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await requestsCollection.insertOne(newRequest);

    return NextResponse.json({
      success: true,
      message:
        "Access request submitted successfully. Waiting for student approval.",
      requestId: result.insertedId,
    });
  } catch (error) {
    console.error("Request access error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
