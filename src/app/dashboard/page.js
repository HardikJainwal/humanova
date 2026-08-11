import DashboardPage from "@/components/dashboard/DashboardPage";

export const metadata = {
  title: "Dashboard Humanova",
  description: "Your personal Humanova wellness dashboard.",
  alternates: {
    canonical: "https://humanova.live/dashboard",
  },
};

export default function DashboardRoute() {
  return <DashboardPage />;
}
