import { useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

type TransactionTypes = 'income' | 'outcome'

export interface Transaction {
  id: number
  description: string
  type: TransactionTypes
  price: number
  category: string
  createdAt: Date
}
interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}
interface TransactionContext {
  transactions: Transaction[]
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  fetchTransactions: (query?: string) => Promise<void>
}
export const TransactionsContext = createContext({} as TransactionContext)

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const response = await api.post('transactions', {
        ...data,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    []
  )

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }, [])
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
