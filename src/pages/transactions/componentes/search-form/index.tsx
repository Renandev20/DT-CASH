import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useTransactions } from '../../../../hooks/useTransactions'
import { SearchFormContainer } from './styles'

/*
   ! Por que um componente renderiza?
   ? - Hooks change (mudou estado, contexto, reducer)
   ? - Props change (mudou a propriedad)
   ? - Parent change (componente pai renderizado)

   ! Qual fluxo de renderização?
    ? 1.: O React recria o HTML do componente
    ? 2.: Compara a versão HTML recriada com a anterior
    ? 3.: Se mudou alguam coisa, o React reescreve a alteração

   ! Memo - 
    ! Utilizar apenas em componentes que fazem grandes 'raciocínios', tais como grandes renderizações, listas grandes, 
    ! muitos cálculos, condicionais etc.

    * Adiciona um passo antes do fluxo de renderização convencional do React.
    * 0.: Vai verificar se mudou algo nos Hooks, Props (deep comparasion)
    * 0.1.: Comparar a versão anterior dos hooks e props
    * 0.2.: SOMENTE SE mudar algo, ele vai permitir a nova renderização
*/

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchFormComponent() {
  const { fetchTransactions } = useTransactions()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransaction(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
      <input
        type="text"
        placeholder="Buscar transação"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
