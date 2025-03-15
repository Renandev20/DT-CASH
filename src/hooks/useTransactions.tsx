import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../context/transaction-context'

export function useTransactions() {
  return useContextSelector(TransactionsContext, (context) => {
    return context
  })
}
