import { useLocation } from '@remix-run/react'

export function SearchParamsHiddenInputs(props){
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  return (
    <>
      {Array.from(searchParams.entries())
        .filter(([key]) => key !== 'index' && !props.excludeKeys.includes(key))
        .map(([key, value]) => {
          return <input key={key} name={key} type="hidden" value={value} />
        })}
    </>
  )
}
