
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUser, mockAdminUser } from '@/lib/mock-data';
import type { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Edit, Trash2, Search, Eye, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

const initialUsersData: User[] = [mockUser, mockAdminUser].map(u => ({...u})); // Deep copy for modification

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<User['role']>('user');

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter(user =>
      (user.displayName?.toLowerCase() || '').includes(lowercasedSearchTerm) ||
      user.email.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleToggleActive = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.uid === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const handleOpenEditRoleDialog = (userToEdit: User) => {
    setEditingUser(userToEdit);
    setSelectedRole(userToEdit.role);
    setIsEditRoleDialogOpen(true);
  };

  const handleSaveRole = () => {
    if (editingUser) {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.uid === editingUser.uid ? { ...user, role: selectedRole } : user
        )
      );
      setIsEditRoleDialogOpen(false);
      setEditingUser(null);
    }
  };

  const handleViewDetails = (userToView: User) => {
    console.log("View user details:", userToView);
    // Here you would typically open a modal or navigate to a details page
    alert(`تفاصيل المستخدم:\nالاسم: ${userToView.displayName || userToView.email}\nالدور: ${userToView.role}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-semibold">إدارة المستخدمين</h1>
          <p className="text-muted-foreground">عرض، تعديل، أو تعطيل حسابات المستخدمين.</p>
        </div>
        {/* "Add New User" button intentionally omitted for now */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المستخدمين</CardTitle>
           <CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="ابحث عن مستخدم بالاسم أو البريد..." 
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">الصورة</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الدور</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.photoUrl || `https://placehold.co/40x40.png?text=${user.displayName?.[0] || user.email[0]}`} alt={user.displayName || user.email} data-ai-hint="profile picture" />
                      <AvatarFallback>{user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.displayName || 'غير متوفر'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role === 'admin' ? 'مسؤول' : 'مستخدم'}
                    </Badge>
                  </TableCell>
                   <TableCell>
                    {user.isActive ? 
                        <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="inline-block ml-1 h-3 w-3" />نشط</Badge> : 
                        <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="inline-block ml-1 h-3 w-3" />معطل</Badge>
                    }
                  </TableCell>
                  <TableCell className="text-right space-x-1 rtl:space-x-reverse">
                    <Button variant="ghost" size="icon" title="عرض التفاصيل" onClick={() => handleViewDetails(user)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" title="تعديل الدور" onClick={() => handleOpenEditRoleDialog(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title={user.isActive ? "تعطيل الحساب" : "تفعيل الحساب"} 
                      className={user.isActive ? "text-destructive hover:text-destructive-foreground hover:bg-destructive" : "text-green-600 hover:text-green-50 hover:bg-green-600"}
                      onClick={() => handleToggleActive(user.uid)}
                    >
                      {user.isActive ? <Trash2 className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       {filteredUsers.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          {searchTerm ? "لم يتم العثور على مستخدمين يطابقون بحثك." : "لا يوجد مستخدمون حالياً."}
        </p>
      )}

      {editingUser && (
        <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تعديل دور المستخدم</DialogTitle>
              <DialogDescription>
                تغيير دور المستخدم {editingUser.displayName || editingUser.email}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role-select" className="text-right">
                  الدور
                </Label>
                <Select value={selectedRole} onValueChange={(value: User['role']) => setSelectedRole(value)}>
                  <SelectTrigger id="role-select" className="col-span-3">
                    <SelectValue placeholder="اختر دورًا" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">مستخدم</SelectItem>
                    <SelectItem value="admin">مسؤول</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">إلغاء</Button>
              </DialogClose>
              <Button type="button" onClick={handleSaveRole}>حفظ التغييرات</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
