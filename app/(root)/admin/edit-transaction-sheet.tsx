"use client";

import { toast } from 'sonner';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import TransactionForm, {formSchema} from './transaction-form';
import { useOpenTransaction } from '@/hooks/use-open-transaction';
import { useGetTransaction } from '@/hooks/use-get-transaction';
import { useEditTransaction } from '@/hooks/use-edit-transaction';
import { useDeleteTransaction } from '@/hooks/use-delete-transaction';
import { useConfirm } from '@/hooks/use-confirm';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';


type FormValues = z.infer<typeof formSchema>;

function EditTransactionSheet() {
  const { isOpen, onClose, id } = useOpenTransaction();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are You Confirmed?",
    "You are about to DELETE this transaction forever"
  );

  const transactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const onSubmit = (values: FormValues) => {
    toast.info('Editing Transaction');
    console.log("values: ", values);

    if (!id) {
      toast.error('Transaction ID is missing');
      return;
    }

    const finalValues = {
      ...values,
      id: id
    };
    
    editMutation.mutate(finalValues , {
      onSuccess: () => {
        onClose();
        toast.success('Transaction edited successfully');
      },
      onError: (error) => {
        onClose();
        toast.error('Failed to edit transaction');
        console.error(error);
      },
      onSettled: () => {
        console.log('onSettled');
      }
    });
  };

  const loading = transactionQuery.isLoading || transactionQuery.isPending;
  const disabled = loading || editMutation.isPending || deleteMutation.isPending || !transactionQuery.data || !transactionQuery.data.id;

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
        deleteMutation.mutate(undefined, {
          onSuccess: () => {
            onClose();
            toast.success('Transaction deleted successfully');
          },
          onError: (error) => {
            onClose();
            toast.error('Failed to delete transaction');
            console.error(error);
          },
          onSettled: () => {
            console.log('onSettled');
          }
        }
      );
    }
  };

  const defaultValues = transactionQuery.data ?
    {
      id: transactionQuery.data.id,
      title: transactionQuery.data.title,
      company: transactionQuery.data.company,
      location: transactionQuery.data.location,
      description: transactionQuery.data.description,
      requirements: transactionQuery.data.requirements,
    } : {
      id: '',
      title: '',
      company: '',
      location: '',
      description: '',
      requirements: '',
    }

  

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className='bg-white w-[500px]'>
          <SheetHeader>
            <SheetTitle>Edit Job</SheetTitle>
            <SheetDescription>
              Edit an existing job
            </SheetDescription>
          </SheetHeader>
              {loading ? (
                <div className='flex flex-col w-full p-4 gap-3'>
                  <Skeleton className='h-8 w-1/2'/>
                  <Skeleton className='h-8 w-full'/>
                  <Skeleton className='h-8 w-full'/>
                  <Skeleton className='h-8 w-full'/>
                </div>
              ) : (
                <TransactionForm
                id={id}
                onSubmit={onSubmit}
                defaultValues={defaultValues}
                disabled={disabled}
                onDelete={onDelete}
                />
            
              )}
        </SheetContent>
      </Sheet>
    </>
  );
}

export default EditTransactionSheet;
