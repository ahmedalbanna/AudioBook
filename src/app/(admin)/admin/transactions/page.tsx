
"use client";

import * as React from "react"; // Import React for useState and useEffect
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockUser } from "@/lib/mock-data"; 
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

// Mock transactions data (assuming this is already available or fetched)
const allMockTransactions: Transaction[] = [
  {
    transactionId: 'txn_1',
    userRef: mockUser.uid, 
    type: 'audiobook_purchase',
    itemRef: '101', 
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
    itemRef: 'plan_monthly_premium', 
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
   {
    transactionId: 'txn_4',
    userRef: 'user_abc',
    type: 'renewal',
    itemRef: 'plan_annual_premium',
    amount: 999.00,
    currency: 'SAR',
    paymentMethod: 'Visa',
    status: 'completed',
    timestamp: new Date(2023, 11, 1, 0, 0),
  },
  {
    transactionId: 'txn_5',
    userRef: 'user_def',
    type: 'audiobook_purchase',
    itemRef: '102',
    amount: 55.00,
    currency: 'SAR',
    paymentMethod: 'PayPal',
    status: 'pending',
    timestamp: new Date(2023, 11, 5, 12, 0),
  },
   {
    transactionId: 'txn_6',
    userRef: 'user_xyz',
    type: 'subscription_payment',
    itemRef: 'plan_monthly_premium',
    amount: 99.00,
    currency: 'SAR',
    paymentMethod: 'MasterCard',
    status: 'refunded',
    timestamp: new Date(2023, 8, 10, 16, 30),
  },
];


export default function TransactionsReportPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<string>("all");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all");
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [filteredTransactions, setFilteredTransactions] = React.useState<Transaction[]>(allMockTransactions);
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  React.useEffect(() => {
    let tempTransactions = allMockTransactions;

    // Filter by search term (transactionId or user info)
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempTransactions = tempTransactions.filter(txn =>
        txn.transactionId.toLowerCase().includes(lowerSearchTerm) ||
        (txn.userRef === mockUser.uid && mockUser.displayName?.toLowerCase().includes(lowerSearchTerm)) ||
        txn.userRef.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      tempTransactions = tempTransactions.filter(txn => txn.type === selectedType);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      tempTransactions = tempTransactions.filter(txn => txn.status === selectedStatus);
    }

    // Filter by date
    if (selectedDate) {
      tempTransactions = tempTransactions.filter(txn => {
        const txnDate = new Date(txn.timestamp);
        return txnDate.getFullYear() === selectedDate.getFullYear() &&
               txnDate.getMonth() === selectedDate.getMonth() &&
               txnDate.getDate() === selectedDate.getDate();
      });
    }

    setFilteredTransactions(tempTransactions);
  }, [searchTerm, selectedType, selectedStatus, selectedDate]);

  const getStatusBadgeVariant = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      case 'refunded': return 'outline'; 
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

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false); // Close popover on date selection
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
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button variant={"outline"} className="justify-start text-left font-normal w-full">
                <CalendarIcon className="ml-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP", { locale: arSA }) : <span>اختر تاريخًا</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar 
                mode="single" 
                selected={selectedDate} 
                onSelect={handleDateSelect}
                initialFocus 
                locale={arSA}
              />
            </PopoverContent>
          </Popover>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger><SelectValue placeholder="نوع المعاملة" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="audiobook_purchase">شراء كتاب</SelectItem>
              <SelectItem value="subscription_payment">دفع اشتراك</SelectItem>
              <SelectItem value="renewal">تجديد</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger><SelectValue placeholder="حالة الدفع" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="completed">مكتملة</SelectItem>
              <SelectItem value="pending">معلقة</SelectItem>
              <SelectItem value="failed">فاشلة</SelectItem>
              <SelectItem value="refunded">مستردة</SelectItem>
            </SelectContent>
          </Select>
          <Input 
            placeholder="ابحث بمعرف المستخدم أو المعاملة..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
              {filteredTransactions.map((txn) => (
                <TableRow key={txn.transactionId}>
                  <TableCell className="font-mono text-xs">{txn.transactionId}</TableCell>
                  <TableCell className="text-sm">{txn.userRef === mockUser.uid ? (mockUser.displayName || txn.userRef) : txn.userRef}</TableCell>
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
      {filteredTransactions.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          {searchTerm || selectedType !== 'all' || selectedStatus !== 'all' || selectedDate 
            ? "لم يتم العثور على معاملات تطابق فلاتر البحث." 
            : "لا توجد معاملات مالية لعرضها."}
        </p>
      )}
    </div>
  );
}
