"use client";

import { toast } from 'sonner';
import React, { useEffect, useState } from 'react';
import { useMountedState } from 'react-use';
import NewTransactionSheet from '@/app/(root)/new-transaction-sheet';
import EditTransactionSheet from '@/app/(root)/edit-transaction-sheet';

function SheetProvider() {
    const isMounted = useMountedState();

    if (!isMounted) {
        toast.error("Component is not mounted yet");
        console.log("Component is not mounted yet");

        return (
            <div className='bg-teal-600 p-8 w-1/2 h-full'>
                <h1>
                    Mounted yet null
                </h1>
            </div>
        );
    }

    //console.log("Component is mounted");
    //toast.info("Component is mounted");

    return (
        <>
            <NewTransactionSheet/>
            <EditTransactionSheet/>
        </>
    );
}

export default SheetProvider;
