import { useSearchParams,  useSubmit } from "@remix-run/react";
export default function SellerFilters(props) {
  const { name, param, value } = props;
  const [searchParams] = useSearchParams();
  const all = searchParams.getAll(param);
  const submit = useSubmit();
  return (
    <p>
      <input
        type="checkbox"
        name={param}
        value={value}
        onChange={(e) => submit(e.currentTarget.form)}
        checked={all.includes(value)}
      />
      <label className="ml-2" htmlFor={name}>
        {name}
      </label>
    </p>
  );
}
