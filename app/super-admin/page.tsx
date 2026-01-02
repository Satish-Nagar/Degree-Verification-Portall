"use client";

import { Header } from '@/components/layout/Header';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Shield, Building2, School, Upload, Users, CheckCircle, AlertTriangle, FileSpreadsheet, BarChart3, Bell, Database, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

const stats = [
	{ label: 'Total Students', value: 0, icon: Users, delta: '+2.1% MoM' },
	{ label: 'Total Institutions', value: 0, icon: School, delta: '+0.8% MoM' },
	{ label: 'Total Verifications', value: 0, icon: CheckCircle, delta: '+3.4% MoM' },
	{ label: 'Suspicious Flags', value: 0, icon: AlertTriangle, delta: '-12% MoM' },
];

const pendingApprovals = [
	{ type: 'Institution Upload', name: 'ABC Institute', submitted: '2h ago', status: 'Pending review' },
	{ type: 'Student Correction', name: 'Roll 23CS1012', submitted: '4h ago', status: 'Awaiting documents' },
	{ type: 'Recruiter Org', name: 'TechHire Pvt Ltd', submitted: '1d ago', status: 'Compliance check' },
];

const auditLogs = [
	{ action: 'Role Update', actor: 'SuperAdmin01', detail: 'Granted Institution Admin to user #4521', time: 'Today, 09:12' },
	{ action: 'Data Upload', actor: 'RGPV_BPL', detail: 'Uploaded 12,432 student records (CSV)', time: 'Today, 08:43' },
	{ action: 'Verification', actor: 'Recruiter: Infosys', detail: 'Verified 54 candidates', time: 'Yesterday, 19:22' },
];

const fraudAlerts = [
	{ id: 'AL-9841', severity: 'High', desc: 'Duplicate roll numbers across 2 institutions', time: '12m ago' },
	{ id: 'AL-9834', severity: 'Medium', desc: 'Unusual verification spike from Org#112', time: '1h ago' },
	{ id: 'AL-9811', severity: 'Low', desc: 'Multiple correction requests for same student', time: '4h ago' },
];

export default function SuperAdminDashboard() {
	const [totalStudents, setTotalStudents] = useState();
	const [totalVerifications, setTotalVerifications] = useState();
  const [totalColleges, setTotalColleges] = useState(); 

	useEffect(() => {
		loadData();
	}, [])
	const loadData = async () => {
		try {
			const response = await fetch('/api/super-admin')
			const data = await response.json()
			console.log(data);
			setTotalStudents(data.result.totalStudents)
			setTotalVerifications(data.result.totalVerifications)
      setTotalColleges(data.result.totalColleges)
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<main className="min-h-screen bg-gray-50">
			<Header />
			<Navbar />

			<div className="flex">
				{/* Sidebar */}
				<aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
					<div className="px-6 py-5 flex items-center gap-3 border-b border-gray-100">
						<div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">SA</div>
						<div>
							<p className="text-sm text-gray-500">Super Admin</p>
							<p className="font-semibold text-gray-900">Gov Verification</p>
						</div>
					</div>
					<nav className="px-4 py-4 space-y-1">
						{[
							{ label: 'Dashboard', icon: Shield },
							{ label: 'Universities', icon: School },
							{ label: 'Colleges / Institutions', icon: Building2 },
							{ label: 'Admin Accounts', icon: Users },
							{ label: 'Recruiter Orgs', icon: Building2 },
							{ label: 'Uploads & Templates', icon: Upload },
							{ label: 'Student Database', icon: Database },
							{ label: 'Corrections', icon: FileSpreadsheet },
							{ label: 'Fraud Monitor', icon: AlertTriangle },
							{ label: 'Audit Logs', icon: Eye },
						].map((item) => (
							<button
								key={item.label}
								className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary-50 text-left text-gray-700"
							>
								<item.icon className="w-5 h-5 text-primary-600" />
								<span className="text-sm font-medium">{item.label}</span>
							</button>
						))}
					</nav>
				</aside>

				{/* Main content */}
				<div className="flex-1">
					<div className="px-4 lg:px-8 py-6">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
							<div>
								<p className="text-sm text-gray-500">Super Admin Portal</p>
								<h1 className="text-3xl font-bold text-gray-900">Command Center</h1>
							</div>
							<div className="flex gap-3">
								<button className="btn-secondary">Upload Data</button>
								<button className="btn-primary">New Admin Account</button>
							</div>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
							{stats.map((card) => {
								const Icon = card.icon;
								let finalValue: number | undefined = card.value;
								if (card.label === "Total Students") {
									finalValue = totalStudents;
								} else if(card.label==="Total Institutions"){
                  finalValue=totalColleges;
                } else if(card.label==="Total Verifications"){
                  finalValue= totalVerifications;
                }else if(card.label==="Suspicious Flags"){
                   finalValue=0
                }
								return (
									<div key={card.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
										<span className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
											<Icon className="w-6 h-6" />
										</span>
										<div>
											<p className="text-sm text-gray-500">{card.label}</p>
											<p className="text-2xl font-bold text-gray-900">{finalValue ?? '—'}</p>
											<p className="text-xs text-green-600">{card.delta}</p>
										</div>
									</div>
								);
							})}
							{/* <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                    <span className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </span>
                    <div>
                      <p className="text-sm text-gray-500">Total Students</p>
                      <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                      <p className="text-xs text-green-600">+2.1% MoM</p>
                    </div>
                  </div> */}
						</div>

						{/* Approvals + Uploads */}
						<div className="grid lg:grid-cols-3 gap-6 mb-6">
							<div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
								<div className="flex items-center justify-between mb-4">
									<div>
										<p className="text-sm text-gray-500">Approvals</p>
										<h2 className="text-xl font-semibold text-gray-900">Pending Reviews</h2>
									</div>
									<button className="text-sm text-primary-600 hover:underline">View all</button>
								</div>
								<div className="space-y-3">
									{pendingApprovals.map((item, idx) => (
										<div key={idx} className="p-3 rounded-lg border border-gray-100 flex items-center justify-between">
											<div>
												<p className="font-semibold text-gray-900">{item.type}</p>
												<p className="text-sm text-gray-600">{item.name}</p>
												<p className="text-xs text-gray-500">{item.status}</p>
											</div>
											<div className="text-right">
												<p className="text-xs text-gray-400">{item.submitted}</p>
												<div className="flex gap-2 mt-2 justify-end">
													<button className="px-3 py-1 rounded-lg border text-sm text-gray-700 hover:bg-gray-50">Review</button>
													<button className="px-3 py-1 rounded-lg bg-primary-600 text-white text-sm hover:bg-primary-700">Approve</button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
								<div className="flex items-center justify-between mb-4">
									<div>
										<p className="text-sm text-gray-500">Uploads</p>
										<h2 className="text-xl font-semibold text-gray-900">Templates & Data</h2>
									</div>
									<Upload className="w-5 h-5 text-primary-600" />
								</div>
								<div className="space-y-3 text-sm">
									<button className="w-full flex items-center justify-between px-3 py-2 border rounded-lg hover:bg-gray-50">
										<span>Download CSV template</span>
										<span className="text-primary-600">CSV</span>
									</button>
									<button className="w-full flex items-center justify-between px-3 py-2 border rounded-lg hover:bg-gray-50">
										<span>Download XLSX template</span>
										<span className="text-primary-600">XLSX</span>
									</button>
									<button className="w-full flex items-center justify-between px-3 py-2 border rounded-lg hover:bg-gray-50">
										<span>Upload data (CSV/XLSX)</span>
										<span className="text-primary-600">Upload</span>
									</button>
								</div>
							</div>
						</div>

						{/* Fraud & Activity */}
						<div className="grid lg:grid-cols-2 gap-6 mb-6">
							<div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
								<div className="flex items-center justify-between mb-4">
									<div>
										<p className="text-sm text-gray-500">Fraud Monitor</p>
										<h2 className="text-xl font-semibold text-gray-900">Suspicious Activity</h2>
									</div>
									<AlertTriangle className="w-5 h-5 text-orange-500" />
								</div>
								<div className="space-y-3">
									{fraudAlerts.map((alert) => (
										<div key={alert.id} className="p-3 rounded-lg border border-gray-100 flex items-center justify-between">
											<div>
												<p className="font-semibold text-gray-900">{alert.id}</p>
												<p className="text-sm text-gray-600">{alert.desc}</p>
											</div>
											<div className="text-right">
												<span
													className={`px-3 py-1 rounded-full text-xs font-semibold ${
														alert.severity === 'High'
															? 'bg-red-100 text-red-700'
															: alert.severity === 'Medium'
																? 'bg-yellow-100 text-yellow-700'
																: 'bg-blue-100 text-blue-700'
													}`}
												>
													{alert.severity}
												</span>
												<p className="text-xs text-gray-400 mt-1">{alert.time}</p>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
								<div className="flex items-center justify-between mb-4">
									<div>
										<p className="text-sm text-gray-500">Audit & Activity</p>
										<h2 className="text-xl font-semibold text-gray-900">Latest Logs</h2>
									</div>
									<BarChart3 className="w-5 h-5 text-primary-600" />
								</div>
								<div className="space-y-3">
									{auditLogs.map((log, idx) => (
										<div key={idx} className="p-3 rounded-lg border border-gray-100">
											<div className="flex items-center justify-between">
												<p className="font-semibold text-gray-900">{log.action}</p>
												<p className="text-xs text-gray-400">{log.time}</p>
											</div>
											<p className="text-sm text-gray-600">{log.detail}</p>
											<p className="text-xs text-primary-600 mt-1">By {log.actor}</p>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Verification activity */}
						<div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-10">
							<div className="flex items-center justify-between mb-4">
								<div>
									<p className="text-sm text-gray-500">Live Verification</p>
									<h2 className="text-xl font-semibold text-gray-900">Recent Verification Activity</h2>
								</div>
								<Bell className="w-5 h-5 text-primary-600" />
							</div>
							<div className="overflow-x-auto">
								<table className="min-w-full text-sm">
									<thead>
										<tr className="text-left text-gray-500">
											<th className="py-2 pr-4">Roll No</th>
											<th className="py-2 pr-4">Name</th>
											<th className="py-2 pr-4">Institution</th>
											<th className="py-2 pr-4">Requested By</th>
											<th className="py-2 pr-4">Status</th>
											<th className="py-2 pr-4">Time</th>
										</tr>
									</thead>
									<tbody className="text-gray-800">
										{[
											{ roll: '23CS1023', name: 'Ananya Singh', inst: 'RGPV Bhopal', req: 'Infosys', status: 'Verified', time: '2m ago' },
											{ roll: '22ME0901', name: 'Rohan Verma', inst: 'BU Bhopal', req: 'TCS', status: 'Verified', time: '8m ago' },
											{ roll: '21EE0702', name: 'Neha Patel', inst: 'ABC Institute', req: 'Wipro', status: 'Flagged', time: '12m ago' },
										].map((row, idx) => (
											<tr key={idx} className="border-t">
												<td className="py-2 pr-4">{row.roll}</td>
												<td className="py-2 pr-4">{row.name}</td>
												<td className="py-2 pr-4">{row.inst}</td>
												<td className="py-2 pr-4">{row.req}</td>
												<td className="py-2 pr-4">
													<span
														className={`px-3 py-1 rounded-full text-xs font-semibold ${
															row.status === 'Verified'
																? 'bg-green-100 text-green-700'
																: 'bg-red-100 text-red-700'
														}`}
													>
														{row.status}
													</span>
												</td>
												<td className="py-2 pr-4 text-gray-500">{row.time}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}

