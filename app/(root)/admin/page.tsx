"use client"

import React, { useEffect, useState } from 'react';
import { columns, Job } from './columns';
import { DataTable } from '@/components/data-table';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Plus } from 'lucide-react';

import { useNewTransaction } from '@/hooks/use-new-transaction';
import { useGetTransaction } from '@/hooks/use-get-transaction';
import { useGetTransactions } from '@/hooks/use-get-transactions';
import UploadButton from '@/components/upload-button';
import ImportCard from '@/components/import-card';
import { toast as sonner } from 'sonner';
import { useBulkCreateTransactions } from '@/hooks/use-bulk-create-transactions';
import { useToast } from '@/components/ui/use-toast';
import { useBulkDeleteJobs } from '@/hooks/use-bulk-delete-transactions';

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT"
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {}
};

const filterKeyList = [
  "id",
  "title",
  "company",
  "location",
  "description",
  "requirements",
]

function TransactionPage() {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS)
  const [filterKey, setFilterKey] = useState<string>('title');

  const { toast } = useToast();

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    console.log({ results })
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  }

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST)
  }

  const newJobs = useNewTransaction()
  const transactionsQuery = useGetTransactions();
  const deletetransactions = useBulkDeleteJobs();
  const bulkCreateTransactions = useBulkCreateTransactions();

  const transactions = transactionsQuery.data || []

  const isDisabled = transactionsQuery.isLoading || transactionsQuery.isPending || deletetransactions.isPending || bulkCreateTransactions.isPending
    const onSubmitImport = async (values: Job[]) => {
      
      const data = values.map((value) => {
        return {
          ...value,
          id: value.id,
          title: value.title,
          company: value.company,
          location: value.location,
          description: value.description,
          requirements: value.requirements,
        }
      });
      bulkCreateTransactions.mutate(data, {
        onSuccess: () => {
          toast({
            title: "Transactions created successfully",
            variant: "success"
          });
          onCancelImport();
        },
        onError: (error: { message: string; }) => {
          console.log(error);
          toast({
            title: "Failed to create transactions",
            description: "error: " + error.message,
            variant: "destructive"
          });
        }
      });
    };


    useEffect(() => {
      transactionsQuery.refetch();
    }, [transactionsQuery.refetch, deletetransactions.mutate, bulkCreateTransactions.mutate, transactionsQuery.data, transactionsQuery]);

    if (transactionsQuery.isLoading || transactionsQuery.isPending) {
      return (
        <div className='max-w-screen-2xl lg:mx-32 mx-3 pb-10 -mt-24'>
          <Card className='border-none drop-shadow-sm'>
            <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                <Skeleton className='h-8 w-48'/>
                <Skeleton className='w-48 h-8'/>
            </CardHeader>
            <CardContent className='lg:px-auto lg:mx-auto mt-10 '>
              <div className='h-[500px] w-full flex flex-col items-start justify-start gap-4'>
                <Skeleton className='h-8 w-1/2 px-5'/>
                <Skeleton className='h-8 w-full px-5'/>
                <Skeleton className='h-8 w-full px-5'/>
                <Skeleton className='h-8 w-full px-5'/>
              </div>
            </CardContent>
        </Card>
        </div>
      );
    }

    if (transactions.length === 0 && !transactionsQuery.isLoading && variant === VARIANTS.LIST) {
      return (
        <div className='max-w-screen-2xl lg:mx-32 mx-3 pb-10 -mt-24'>
          <Card className='border-none drop-shadow-sm'>
            <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
              <CardTitle className='text-xl line-clamp-1'>
                Transactions History
              </CardTitle>
              <div className='flex gap-2 flex-col lg:flex-row items-center justify-center'>
                <Button
                  className=' w-full lg:w-32'
                  size={'sm'}
                  onClick={newJobs.onOpen}
                >
                  <Plus size={16} className='mr-2' />
                  Add New
                </Button>
                <UploadButton onUpload={onUpload} />
              </div>
            </CardHeader>
            <CardContent className='lg:px-auto lg:mx-auto -m-4'>
              <div className='flex items-center gap-96'>
                <p>
                  Get Started by <span className='text-primary'>Creating New Job</span> OR <span className='text-primary'>Importing a CSV data file</span>
                  </p>
                <ArrowRight className='text-primary -rotate-45'/>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (variant === VARIANTS.IMPORT) {
      return (
        <>
          <ImportCard
            data={importResults.data}
            onCancel={onCancelImport}
            onSubmit={onSubmitImport}
          />
        </>
      );
    }

    return (
      <div className='max-w-screen-2xl lg:mx-32 mx-3 pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
            <CardTitle className='text-xl line-clamp-1'>
              Transactions History
            </CardTitle>
            <div className='flex gap-2 flex-col lg:flex-row items-center justify-center'>
              <Button
                className=' w-full lg:w-32'
                size={'sm'}
                onClick={newJobs.onOpen}
              >
                <Plus size={16} className='mr-2' />
                Add New
              </Button>
              <UploadButton onUpload={onUpload} />
            </div>
          </CardHeader>
          <CardContent className='lg:px-auto lg:mx-auto -m-4'>
            <p>
              {transactions.length} transactions
            </p>

            
            <Select onValueChange={(value) => setFilterKey(value)} >
              <SelectTrigger className="w-[180px] mt-5 -mb-10">
                <SelectValue placeholder="Filter Key" />
              </SelectTrigger>
              <SelectContent>
                {filterKeyList.map((key) => (
                  <SelectItem value={key} key={key}>
                    {key}
                  </SelectItem>
                  ))}
              </SelectContent>
            </Select>


           
            <div className="container mx-0 py-10">
              <DataTable
                columns={columns}
                data={transactions}
                filterKey={filterKey}
                onDelete={(row) => {
                  const ids = row.map((r) => r.original.id);
                  deletetransactions.mutate({ ids });
                }}
                disabled={isDisabled}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
}

export default TransactionPage;
