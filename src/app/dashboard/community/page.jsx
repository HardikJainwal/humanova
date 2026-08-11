import CommunityPage from "@/components/dashboard/CommunityPage";

export const metadata = {
  title: "Community Feed - Humanova",
  description: "Connect with peer groups, share knowledge, and explore polls.",
  alternates: {
    canonical: "https://humanova.live/dashboard/community",
  },
};

export default function CommunityRoute() {
  return <CommunityPage />;
}
