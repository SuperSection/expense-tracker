import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq, sum } from 'drizzle-orm';

import { db } from "../db/index";
import { getUser } from "../kinde";
import { expenses as expensesTable } from "../db/schema/expenses.schema";


const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.string(),
});

type ExpenseType = z.infer<typeof expenseSchema>;

const createExpenseSchema = expenseSchema.omit({ id: true });


export const expensesRoute = new Hono()
    .get("/", getUser, async (c) => {
        const user = c.var.user;
        const expenses = await db
          .select()
          .from(expensesTable)
          .where(eq(expensesTable.userId, user.id))
          .orderBy(desc(expensesTable.createdAt))
          .limit(100);
          
        return c.json({ expenses });
    })
    .post("/", getUser, zValidator("json", createExpenseSchema), async (c) => {
        const expense = c.req.valid("json");
        const user = c.var.user;

        const result = await db.insert(expensesTable).values({
            ...expense,
            userId: user.id,
        }).returning();

        c.status(201);
        return c.json(result);
    })
    .get("/total-spent", getUser, async (c) => {
        const user = c.var.user;

        const result = await db
            .select({ totalSpent: sum(expensesTable.amount) })
            .from(expensesTable)
            .where(eq(expensesTable.userId, user.id))
            .limit(1)
            .then(res => res[0]);
        
        return c.json(result);
    })
    .get("/:id{[0-9]+}", getUser, async (c) => {
        const id = parseInt(c.req.param("id"));
        const user = c.var.user;

        const expense = await db
          .select()
          .from(expensesTable)
          .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
          .then((res) => res[0]);
          
        if (!expense) return c.notFound();
          
        return c.json(expense);
    })
    .delete("/:id{[0-9]+}", getUser, async (c) => {
        const id = parseInt(c.req.param("id"));
        const user = c.var.user;

        const expense = await db
          .delete(expensesTable)
          .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
          .returning()
          .then((res) => res[0]);
          
        if (!expense) return c.notFound();

        return c.json({ message: "Expense deleted.", expense });
    });
