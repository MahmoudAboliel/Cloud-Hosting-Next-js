type Input = {
    id:string;
    name:string;
    label:string;
    type:string;
    value:string;
    setValue:(value:string) => void;
}

const InputType = (props:Input) => {
  return (
    <div>
        <label 
            className="block text-lg font-medium ml-2"
            htmlFor={props.id}
        >
            {props.label}
        </label>
        <input 
            className="outline-none w-full rounded-lg p-2 border border-gray-400 focus:shadow-inner focus:shadow-blue-500"
            type={props.type}
            name={props.name}
            id={props.id}
            placeholder={props.label}
            value={props.value}
            onChange={e => props.setValue(e.target.value)}
        />
    </div>
  )
}

export default InputType