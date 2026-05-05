import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { getClient } from '@/sanity/client';
import { authOptions } from '@/lib/auth';
import getFooter from '@/sanity/services/getFooter';
import getHeader from '@/sanity/services/getHeader';
import getSetting from '@/sanity/services/getSetting';
import { GlobalPageProps } from '@/types/global';

type PdfGateSubmission = {
  _id: string;
  organisationName: string;
  email: string;
  pageSlug: string;
  pdfLabel?: string;
//   ipAddress?: string;
  submittedAt: string;
};

type SubmissionsPageProps = GlobalPageProps & {
  submissions: PdfGateSubmission[];
};

export const getServerSideProps: GetServerSideProps<SubmissionsPageProps> =
  async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

    try {
      const client = getClient();
      const [submissions, footer, header, setting] = await Promise.all([
        client.fetch<PdfGateSubmission[]>(
          `*[_type == "pdfGateSubmission"] | order(submittedAt desc) {
            _id,
            organisationName,
            email,
            pageSlug,
            pdfLabel,
            submittedAt
          }`
        ),
        getFooter(client),
        getHeader(client),
        getSetting(client),
      ]);

      return {
        props: {
          footer,
          header,
          pageMeta: { title: 'PDF Gate Submissions - Admin' },
          setting,
          submissions: submissions || [],
        },
      };
    } catch (error) {
      console.error('Error fetching submissions:', error);
      return {
        props: {
          submissions: [],
        },
      };
    }
  };

export default function AdminSubmissionsPage({
  submissions: initialSubmissions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/admin/login' });
  };

  const totalPages = Math.max(1, Math.ceil(submissions.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedSubmissions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return submissions.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage, submissions]);

  const escapeCsvValue = (value?: string) => {
    const stringValue = value ?? '';
    return `"${stringValue.replace(/"/g, '""')}"`;
  };

  const handleDownloadCsv = () => {
    const header = ['Submitted At', 'Organisation Name', 'Email', 'Page Slug', 'PDF Label'];
    const rows = submissions.map((submission) => [
      submission.submittedAt,
      submission.organisationName,
      submission.email,
      submission.pageSlug,
      submission.pdfLabel || '',
    ]);

    const csvContent = [
      header.map(escapeCsvValue).join(','),
      ...rows.map((row) => row.map(escapeCsvValue).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pdf-gate-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this submission? This action cannot be undone.'
    );

    if (!confirmed) {
      return;
    }

    setErrorMessage(null);
    setDeletingId(id);

    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to delete submission');
      }

      setSubmissions((previous) => previous.filter((item) => item._id !== id));
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to delete submission'
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <>
      <Head>
        <title>PDF Gate Submissions - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <div className="border-b border-neutral-200 bg-white">
          <div className="lg:container lg:mx-auto flex items-center justify-between px-4 py-6 md:px-8 lg:px-0">
            <div>
              <h1 className="text-3xl font-bold text-blue">
                PDF Gate Submissions
              </h1>
              <p className="mt-1 text-sm text-neutral-600">
                Track and manage all PDF gate submissions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadCsv}
                disabled={submissions.length === 0}
                className="inline-flex items-center rounded-lg bg-blue px-4 py-2.5 font-semibold text-white transition-all hover:bg-blue/90 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-300"
              >
                Download CSV
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center rounded-lg bg-red px-6 py-2.5 font-semibold text-white transition-all hover:bg-red/90 focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:container lg:mx-auto px-4 py-8 md:px-8 lg:px-0">
          {errorMessage && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {submissions.length === 0 ? (
            <div className="rounded-lg border border-neutral-200 bg-white p-12 text-center">
              <p className="text-neutral-600">
                No submissions yet. They will appear here when users access gated PDFs.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-red bg-red">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        Submitted At
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        Organisation Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        Page Slug
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        PDF Label
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {paginatedSubmissions.map((submission) => (
                      <tr
                        key={submission._id}
                        className="hover:bg-neutral-50 transition-colors"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">
                          {formatDate(submission.submittedAt)}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-900">
                          {submission.organisationName}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">
                          <a
                            href={`mailto:${submission.email}`}
                            className="text-blue underline hover:text-blue/80"
                          >
                            {submission.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">
                          <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-xs">
                            {submission.pageSlug}
                          </code>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">
                          {submission.pdfLabel || '—'}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">
                          <button
                            onClick={() => handleDelete(submission._id)}
                            disabled={deletingId === submission._id}
                            className="inline-flex items-center rounded-md border border-red px-3 py-1.5 font-semibold text-red transition-colors hover:bg-red hover:text-white focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {deletingId === submission._id ? 'Deleting...' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer stats */}
              <div className="flex flex-col gap-4 border-t border-neutral-200 bg-neutral-50 px-6 py-4 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-neutral-600">
                  Total submissions: <strong>{submissions.length}</strong>
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-neutral-600">
                    Rows per page
                    <select
                      value={itemsPerPage}
                      onChange={(event) => {
                        setItemsPerPage(Number(event.target.value));
                        setCurrentPage(1);
                      }}
                      className="rounded border border-neutral-300 bg-white px-2 py-1 text-sm text-neutral-900"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-neutral-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
