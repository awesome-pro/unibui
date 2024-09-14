"use client";

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Trash } from 'lucide-react'


export const formSchema = z.object({
    id: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string().optional(),
    description: z.string().optional(),
    requirements: z.string().optional()
})


type FormValues = z.infer<typeof formSchema>

type Props = {
    id?: string
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}

function TransactionForm(
    {
        id,
        defaultValues,
        onSubmit,
        onDelete,
        disabled,
    } : Props
) {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    });

    const handleSubmit = (values: FormValues) => {
        console.log(values)
        
       onSubmit({
        ...values
       })
    }

    const handleDelete = () => {
        console.log('delete')
        onDelete?.();
    }

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 pt-4'>
            <FormField
                name='id'
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            ID
                        </FormLabel>
                        <FormControl>
                            <Input  
                                disabled={true}
                                placeholder='Add a ID'
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
            <FormField
                name='title'
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Job Title
                        </FormLabel>
                        <FormControl>
    
                            <Input  
                                disabled={disabled}
                                placeholder='Add a Title'
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField
                name='company'
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Company
                        </FormLabel>
                        <FormControl>
                            <Input
                             disabled={disabled}
                             placeholder='Add a Company'
                             {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField
                name='location'
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Location
                        </FormLabel>
                        <FormControl>
                            <Input  
                                disabled={disabled}
                                placeholder='Add a Location'
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField
                 name='description'
                 control={form.control}
                 render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Description
                        </FormLabel>
                        <FormControl>
                            <Input
                             disabled={disabled}
                             placeholder='Add a Description'
                             {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField
                 name='requirements'
                 control={form.control}
                 render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Requirements
                        </FormLabel>
                        <FormControl>
                            <Textarea
                             {...field}
                             value={field.value || ""}
                             disabled={disabled}
                             placeholder='Add Some Notes'
                            />
                        </FormControl>
                    </FormItem>
                )}
                />

                <Button 
                className='w-full text-white' 
                disabled={disabled}
                type='submit'
                onClick={form.handleSubmit(handleSubmit)}
                >
                    {id ? "Save Changes" : "Create Transaction" }
                </Button>
                
                {!!id && (
                    <Button
                    disabled={disabled}
                    onClick={() => handleDelete()}
                    className='w-full text-red-600 border-red-600 hover:text-white hover:bg-red-600'
                    variant={'outline'}
                    type='button'
                    >
                        <Trash className='size-4 mr-2'/>
                        Delete Transaction
                    </Button>
                )}
            </form>
        </Form>
    </div>
  )
}

export default TransactionForm