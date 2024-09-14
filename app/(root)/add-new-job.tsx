"use client";

import { toast } from 'sonner';
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useNewTransaction } from '@/hooks/use-new-transaction';
import TransactionForm from './transaction-form';
import { Loader2 } from 'lucide-react';
import { formSchema } from './transaction-form';
import * as z from 'zod';

  
interface NewJobSheetProps {
      onSubmit: (values: any) => void;
        trigger: React.ReactNode;
}

type FormValues = z.infer<typeof formSchema>

function NewJobSheet(
    {
        onSubmit: handleSubmit,
        trigger: Trigger
    } : NewJobSheetProps
) {

    const {isOpen, onClose} = useNewTransaction();
    const handleFormSubmit = (values: FormValues) => {
        toast.info('Creating Transaction');
        console.table("values: " + {values})    

        handleSubmit(values)
    }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetTrigger>
            {Trigger}
        </SheetTrigger>
        <SheetContent className='bg-white '>
            <SheetHeader>
            <SheetTitle>New Transaction</SheetTitle>
            <SheetDescription>
                Add a new Transaction
            </SheetDescription>
            </SheetHeader>
              <TransactionForm
               onSubmit={handleFormSubmit}
               disabled={false}
              />
        </SheetContent>
    </Sheet>

  )
}

export default NewJobSheet