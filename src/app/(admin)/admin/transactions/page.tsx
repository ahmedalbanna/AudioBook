
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockUser } from "@/lib/mock-data"; // Using mockUser to get a count
import type { Transaction } from '@/types';
import { Calendar as CalendarIcon, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";

// Mock transactions data
const mockTransactions: Transaction[] = [
  {
    transactionId: 'txn_1',
    userRef: mockUser.uid, // Link to mockUser
    type: 'audiobook_purchase',
    itemRef: '101', // Audiobook ID
    amount: 49.99,
    currency: 'SAR',
    paymentMethod: 'Visa',
    status: 'completed',
    timestamp: new Date(2023, 10, 15, 10, 30),
  },
  {
    transactionId: 'txn_2',
    userRef: mockUser.uid,
    type: 'subscription_payment',
    itemRef: 'plan_monthly_premium', // Subscription Plan ID
    amount: 99.00,
    currency: 'SAR',
    paymentMethod: 'PayPal',
    status: 'completed',
    timestamp: new Date(2023, 10, 1, 9, 0),
  },
  {
    transactionId: 'txn_3',
    userRef: 'anotherUserId',
    type: 'audiobook_purchase',
    itemRef: '201',
    amount: 39.99,
    currency: 'SAR',
    paymentMethod: 'MasterCard',
    status: 'failed',
    timestamp: new Date(2023, 9, 20, 14, 15),
  },
];


export default function TransactionsReportPage() {
  // State for filters would go here (e.g., date range, type, status)
  // const [date, setDate] = React.useState<DateRange | undefined>();

  const getStatusBadgeVariant = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return 'default'; // Greenish or success
      case 'pending': return 'secondary'; // Yellowish
      case 'failed': return 'destructive';
      case 'refunded': return 'outline'; // Bluish or distinct
      default: return 'outline';
    }
  };
  
  const getTransactionTypeLabel = (type: Transaction['type']) => {
    switch(type) {
        case 'audiobook_purchase': return 'شراء كتاب';
        case 'subscription_payment': return 'دفع اشتراك';
        case 'renewal': return 'تجديد اشتراك';
        default: return type;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="font-headline text-3xl font-semibold">تقرير المعاملات المالية</h1>
            <p className="text-muted-foreground">عرض سجل جميع المعاملات المالية في المنصة.</p>
        </div>
        <Button variant="outline">
            <Download className="ml-2 h-4 w-4" /> تصدير التقرير
        </Button>
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle>فلاتر البحث</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"} className="justify-start text-left font-normal w-full">
                <CalendarIcon className="ml-2 h-4 w-4" />
                {/* {date?.from ? (date.to ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}` : format(date.from, "LLL dd, y")) : <span>اختر تاريخًا</span>} */}
                 <span>اختر تاريخًا</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              {/* <Calendar initialFocus mode="range" numberOfMonths={2} selected={date} onSelect={setDate} /> */}
              <Calendar mode="single" />
            </PopoverContent>
          </Popover>
          <Select>
            <SelectTrigger><SelectValue placeholder="نوع المعاملة" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="audiobook_purchase">شراء كتاب</SelectItem>
              <SelectItem value="subscription_payment">دفع اشتراك</SelectItem>
              <SelectItem value="renewal">تجديد</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger><SelectValue placeholder="حالة الدفع" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="completed">مكتملة</SelectItem>
              <SelectItem value="pending">معلقة</SelectItem>
              <SelectItem value="failed">فاشلة</SelectItem>
              <SelectItem value="refunded">مستردة</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="ابحث بمعرف المستخدم أو المعاملة..." />
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>سجل المعاملات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>معرف المعاملة</TableHead>
                <TableHead>المستخدم</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>طريقة الدفع</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((txn) => (
                <TableRow key={txn.transactionId}>
                  <TableCell className="font-mono text-xs">{txn.transactionId}</TableCell>
                  <TableCell className="text-sm">{txn.userRef === mockUser.uid ? mockUser.displayName : txn.userRef}</TableCell>
                  <TableCell>{getTransactionTypeLabel(txn.type)}</TableCell>
                  <TableCell>{txn.amount.toFixed(2)} {txn.currency}</TableCell>
                  <TableCell>{txn.paymentMethod}</TableCell>
                  <TableCell>{format(txn.timestamp, "Pp", { locale: arSA })}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(txn.status)}>{txn.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {mockTransactions.length === 0 && (
        <p className="text-center text-muted-foreground py-4">لا توجد معاملات مالية لعرضها.</p>
      )}
    </div>
  );
}

