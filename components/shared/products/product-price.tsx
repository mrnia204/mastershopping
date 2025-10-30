import { cn } from "@/lib/utils";

const ProductPrice = ({value, className}: { value: number; className?: string; }) => {
  const stringValue = value.toFixed(2);  //Ensure 2 decimal places
  const [intValue, floatValue] = stringValue.split('.'); // Get int or float

  return (
    <p className={cn('text-2xl', className)}>
      <span className="text-sm align-super">$</span>
      {intValue}
      <span className="text-sm align-super">.{floatValue}</span>
    </p>
  );
}
 
export default ProductPrice;