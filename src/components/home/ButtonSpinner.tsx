
const ButtonSpinner = () => {
  return (
    <div className="relative flex items-center justify-center">
        <div className="absolute w-7 h-7 rounded-full" />
        <div className="absolute w-7 h-7 rounded-full border-[3px] border-b-transparent border-t-transparent border-white animate-spin" />
    </div>
  );
}

export default ButtonSpinner;