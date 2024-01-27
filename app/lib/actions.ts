'use server';
import { z } from 'zod';
import { insertInvoice } from '@/app/lib/data';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  insertInvoice(`
      INSERT INTO invoices (id, customer_id, amount, status, date)
      VALUES ('${uuidv4()}', '${customerId}', ${amountInCents}, '${status}', '${date}')
  `);

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}