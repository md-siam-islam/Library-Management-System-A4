import { useGetBookQuery, useBorrowBookMutation } from '@/redux/api/baseapi';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarIcon, Loader2, ArrowLeft, Book } from 'lucide-react';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const schema = z.object({
  quantity: z.number()
    .min(1, "At least 1 copy required")
    .max(100, "You can't borrow more than 100 copies"),
  dueDate: z.date({
    required_error: "Please select a due date",
  }).min(new Date(), "Due date must be in the future")
});

type BorrowForm = z.infer<typeof schema>;

const BorrowBookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: book, error, isLoading: isBookLoading } = useGetBookQuery(bookId!);
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const form = useForm<BorrowForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: 1,
      dueDate: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = form;

  const onSubmit = async (data: BorrowForm) => {
    if (!book) return;

    try {
      await borrowBook({
        bookId: book.data._id,
        quantity: data.quantity,
        dueDate: data.dueDate.toISOString()
      }).unwrap();

      await Swal.fire({
        icon: 'success',
        title: 'Book Borrowed!',
        text: `${data.quantity} copy/copies of "${book.data.title}" borrowed successfully.`,
        confirmButtonText: 'OK'
      });
      navigate("/books");
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to borrow the book. Please try again.',
        confirmButtonText: 'Try Again'
      });
    }
  };

  if (isBookLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Failed to load book details</p>
        <Button variant="link" onClick={() => navigate(-1)} className="mt-2">
          Go Back
        </Button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-8">
        <p>Book not found</p>
        <Button variant="link" onClick={() => navigate('/books')} className="mt-2">
          Browse Books
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-2xl">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Book className="h-6 w-6 text-blue-500" />
            Borrow: {book.data.title}
          </h1>
        </div>

        {/* Book Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Author</p>
              <p className="font-medium">{book.data.author}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Available Copies</p>
              <p className="font-medium">{book.data.copies}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ISBN</p>
              <p className="font-mono text-sm">{book.data.isbn}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Quantity Field */}
          <div>
            <label className="block font-medium mb-2">Quantity*</label>
            <Input
              type="number"
              min={1}
              max={book.data.copies}
              {...register("quantity", { valueAsNumber: true })}
              className="w-full md:w-1/2"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.quantity.message}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Maximum {book.data.copies} copies available
            </p>
          </div>

          {/* Due Date Field */}
          <div>
            <label className="block font-medium mb-2">Due Date*</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full md:w-1/2 justify-start text-left font-normal",
                    !watch("dueDate") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("dueDate") ? (
                    format(watch("dueDate"), "PPP")
                  ) : (
                    <span>Select a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={watch("dueDate")}
                  onSelect={(date) => setValue("dueDate", date!)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Borrow"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowBookPage;