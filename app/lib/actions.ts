'use server';
import { z } from 'zod';
import { mutateInvoiceData } from '@/app/lib/data';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function deleteInvoice(id: string) {
  const result = await mutateInvoiceData(`DELETE FROM invoices WHERE id = '${id}'`);

  if (result.success) {
  } else {
    throw new Error('Database Error: Failed to update delete data.');
  }
  
  revalidatePath('/dashboard/invoices');
}
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;

  const result = await mutateInvoiceData(`
    UPDATE invoices
    SET customer_id = '${customerId}', amount = '${amountInCents}', status = '${status}'
    WHERE id = '${id}'
  `);

  if (result.success) {
  } else {
    throw new Error('Database Error: Failed to update delete data.');
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  const result = await mutateInvoiceData(`
      INSERT INTO invoices (id, customer_id, amount, status, date)
      VALUES ('${uuidv4()}', '${customerId}', ${amountInCents}, '${status}', '${date}')
  `);

  if (result.success) {
  } else {
    throw new Error('Database Error: Failed to update delete data.');
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}