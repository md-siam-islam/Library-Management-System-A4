import { useGetBookQuery, useBorrowBookMutation } from '@/redux/api/baseapi';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const schema = z.object({
   quantity : z.number()
   .min(1,"At least 1 copy required" )
   .max(100 , "You can’t borrow more than 100 copies"),

   dueDate : z.date({
    required_error : "Place select a due date ",
   }).min( new Date() , "Due date must be in the future")
})

type BorrowForm = z.infer<typeof schema>;

const BorrowBookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: book, error } = useGetBookQuery(bookId!);
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
      text: `${data.quantity} copy/copies of "${book.data.title}" borrowed.`,
      confirmButtonText: 'OK'
    });
      navigate("/books");
    } catch (err) {
       Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Failed to borrow the book.',
      confirmButtonText: 'Try Again'
    });
    }
  };

  if (error) return <p className="text-center text-red-500">Failed to load book</p>;
  if (!book) return <Loader2 className="mx-auto animate-spin mt-10" />;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Borrow: {book.data.title}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="font-medium">Quantity</label>
          <Input
            type="number"
            min={1}
            max={book.data.copies}
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
        </div>

        <div>
          <label className="font-medium mb-1 block">Due Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full text-left", !watch("dueDate") && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {watch("dueDate") ? format(watch("dueDate"), "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={watch("dueDate")}
                onSelect={(date) => setValue("dueDate", date!)}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
          {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Borrowing...</> : "Confirm Borrow"}
        </Button>
      </form>
    </div>
  );
};

export default BorrowBookPage;
