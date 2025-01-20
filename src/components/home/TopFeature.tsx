import { TiTick } from "react-icons/ti";

interface TopFeatureProps {
  children: React.ReactNode
}

const TopFeature = ({children}:TopFeatureProps) => {
  return (
    <p className="flex items-center text-md text-green-600 ml-3">
        <TiTick /> 
        {children}
    </p>
  );
}

export default TopFeature;