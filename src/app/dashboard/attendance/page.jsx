import AttendancePage from "@/components/dashboard/AttendancePage";

export const metadata = {
  title: "Shift Attendance - Humanova",
  description: "Manage your shifts and check-in / check-out times.",
  alternates: {
    canonical: "https://humanova.live/dashboard/attendance",
  },
};

export default function AttendanceRoute() {
  return <AttendancePage />;
}
