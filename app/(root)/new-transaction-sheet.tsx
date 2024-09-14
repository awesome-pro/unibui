"use client";

import { toast } from 'sonner';
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import { useNewTransaction } from '@/hooks/use-new-transaction';
import TransactionForm, { formSchema } from './transaction-form';
import { Loader2 } from 'lucide-react';
import { useCreateTransaction } from '@/hooks/use-create-transaction';

  

type FormValues = Zod.infer<typeof formSchema>


function NewTransactionSheet() {
  const {isOpen, onClose} = useNewTransaction();
  const createMutation = useCreateTransaction();

  const isLoading = createMutation.isPending;;

  const onSubmit = (values: FormValues) => {
      toast.info('Creating Transaction');
      console.log("values: " + {values});
      
      createMutation.mutate(values, {
        onSuccess: () => {
          onClose();
          toast.success('Transaction created successfully');
        },
        onError: (error) => {
          onClose();
          toast.error('Failed to create Transaction');
          console.error(error);
        },
        onSettled: () => {
          console.log('onSettled')
        }
      });
      
  }

  

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
        
        <SheetContent className='bg-white '>
            <SheetHeader>
            <SheetTitle>New Transaction</SheetTitle>
            <SheetDescription>
                Add a new Transaction
            </SheetDescription>
            </SheetHeader>
            {isLoading ? (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <Loader2 size={12} className='animate-spin'/>
                </div>
            ) : (
              <TransactionForm
               onSubmit={onSubmit}
               disabled={isLoading}
              />
            )}
            
        </SheetContent>
    </Sheet>

  )
}

export default NewTransactionSheet