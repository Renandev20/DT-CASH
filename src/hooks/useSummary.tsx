import { useMemo } from 'react'
import { useTransactions } from './useTransactions'

export function useSummary() {
  const { transactions } = useTransactions()

  const summary = useMemo(() => {
    // ! Agora o summary, ao invés de ser recarregada toda vez que useSummary aparecesse, ela só vai sr recarregada quando "transactions" for atualizado
    transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    )
  }, [transactions])
  return summary
}
