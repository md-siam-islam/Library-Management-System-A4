import { useGetBorrowSummaryQuery } from '@/redux/api/baseapi';
import { Loader2, AlertCircle, Calendar, Book } from 'lucide-react';
import { format } from 'date-fns';

const BorrowSummary = () => {
  const { data: summary, error, isLoading } = useGetBorrowSummaryQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        <p className="text-gray-600">Loading borrow summary...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-3 text-red-500">
        <AlertCircle className="h-8 w-8" />
        <p>Failed to load borrow summary</p>
        <p className="text-sm text-gray-500">
          {"message" in error ? error.message : "Please try again later"}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Book className="h-6 w-6 text-blue-500" />
          Borrow Summary
        </h1>
      </div>

      {summary?.data.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500">No books have been borrowed yet</p>
        </div>
      ) : (
        <>
          {/* Desktop Table (hidden on mobile) */}
          <div className="hidden md:block border rounded-lg overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Borrowed
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {summary?.data.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {item.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {item.totalBorrowed}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-500">
                      <div className="flex items-center justify-end gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {format(new Date(item.dueDate), 'MMM dd, yyyy')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards (hidden on desktop) */}
          <div className="md:hidden space-y-4">
            {summary?.data.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.author}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {item.totalBorrowed} borrowed
                  </span>
                </div>
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Due: {format(new Date(item.dueDate), 'MMM dd, yyyy')}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BorrowSummary;