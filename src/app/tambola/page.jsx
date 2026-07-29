import { redirect } from "next/navigation";

export default async function TambolaRedirectPage({ searchParams }) {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();
  const target = queryString ? `/chroevent?${queryString}` : "/chroevent";
  redirect(target);
}
