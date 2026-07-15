import { AdminShell } from "@/components/admin-shell";
import { hasDatabase } from "@/lib/db";
import { getMongoDb } from "@/lib/mongodb";

type Submission = {
  _id: { toString(): string };
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  createdAt: Date;
};

async function getSubmissions(): Promise<Submission[]> {
  if (!hasDatabase) return [];
  try {
    const db = await getMongoDb();
    const docs = await db
      .collection("ContactSubmission")
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();
    return docs as unknown as Submission[];
  } catch {
    return [];
  }
}

export default async function AdminContactsPage() {
  const submissions = await getSubmissions();

  return (
    <AdminShell title="Contact Submissions">
      <section className="glass-panel overflow-hidden rounded-[1.8rem] p-6">
        {submissions.length ? (
          <div className="overflow-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.22em] text-champagne">
                <tr>
                  <th className="py-3">Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Reply</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-ivory/68">
                {submissions.map((item) => (
                  <tr key={item._id.toString()}>
                    <td className="py-4 text-ivory">{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.subject}</td>
                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${
                          item.status === "UNREAD"
                            ? "bg-champagne/15 text-champagne"
                            : "bg-white/10 text-ivory/60"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <a
                        href={`mailto:${item.email}?subject=Re: ${item.subject}`}
                        className="text-champagne hover:underline"
                      >
                        Reply
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-champagne/15 p-10 text-center text-ivory/65">
            <p className="font-serif text-4xl text-ivory">No submissions yet.</p>
            <p className="mt-3 text-sm">
              Contact form submissions will appear here once MongoDB is connected and the contact
              form is used.
            </p>
          </div>
        )}
      </section>
    </AdminShell>
  );
}
