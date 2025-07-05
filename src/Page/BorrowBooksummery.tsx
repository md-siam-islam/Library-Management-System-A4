import { useGetAllBooksQuery, useGetBorrowSummaryQuery } from '@/redux/api/baseapi';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, AlertCircle } from 'lucide-react';
import { useParams } from 'react-router';
import { date } from 'zod';

const BorrowSummary = () => {
  const { data: summary, error, isLoading } = useGetBorrowSummaryQuery();
  console.log("all book " ,date);

  console.log(summary);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 mr-2" />
        <span>Loading borrow summary...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <AlertCircle className="h-8 w-8 mr-2" />
        <span>Error loading borrow summary</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Borrow Summary</h1>
      
      {summary?.data.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No books have been borrowed yet</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table className=''>
            <TableCaption>A list of all borrowed books</TableCaption>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[200px]">Book Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Total Borrowed</TableHead>
                <TableHead className="text-right">Due Date</TableHead>
                {/* <TableHead className="text-right">Available Copies</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary?.data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell className="text-right">{item.totalBorrowed}</TableCell>
                  <TableCell className="text-right">{item.dueDate}</TableCell>
                  {/* <TableCell className="text-right">
                    {item.availableCopies > 0 ? (
                      <span className="text-green-600">{item.availableCopies}</span>
                    ) : (
                      <span className="text-red-600">Out of stock</span>
                    )}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;