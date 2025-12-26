import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';

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
    const requestsCollection = db.collection('recruiter_access_requests');

    const normalizedRoll = rollNumber.toString().replace(/\.0+$/, '');
    const requests = await requestsCollection
      .find({ rollNumber: parseInt(normalizedRoll) })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      requests: requests.map((req) => ({
        id: req._id,
        recruiterId: req.recruiterId,
        organizationName: req.organizationName,
        requestType: req.requestType,
        status: req.status,
        createdAt: req.createdAt,
        updatedAt: req.updatedAt,
      })),
    });
  } catch (error) {
    console.error('Get requests error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { requestId, action, approvedFields } = await request.json();

    if (!requestId || !action || !approvedFields) {
      return NextResponse.json(
        { error: 'Request ID and action (approve/deny) are required' },
        { status: 400 }
      );
    }

    if (!['approve', 'deny'].includes(action)) {
      return NextResponse.json(
        { error: 'Action must be either "approve" or "deny"' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const requestsCollection = db.collection('recruiter_access_requests');

    await requestsCollection.updateOne(
      { _id: new ObjectId(requestId) },
      {
        $set: {
          status: action === 'approve' ? 'approved' : 'denied',
          approvedDetails: action === 'approve' ? approvedFields : [],
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: `Request ${action === 'approve' ? 'approved' : 'denied'} successfully`,
    });
  } catch (error) {
    console.error('Update request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

