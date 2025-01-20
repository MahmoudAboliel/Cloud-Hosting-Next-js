import { TiTick } from "react-icons/ti";

interface FeatureProps {
  children: React.ReactNode
}

const Feature = ({children}:FeatureProps) => {
  return (
    <div className="flex items-center text-lg md:text-xl font-semibold text-gray-800">
        <TiTick />
        {children}
    </div>
  )
}

export default Feature