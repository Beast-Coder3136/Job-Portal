import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQueryText } from "@/store/jobSlice";
import { useEffect, useState } from "react";


const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi", "Bengaluru", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
]

function FilterCard() {
  const [selectedValue,setSelectedValue] = useState("")
  const dispatch = useDispatch();
  const changeHandler = (value)=>{
    setSelectedValue(value);
  
  }

  useEffect(()=>{
    dispatch(setSearchQueryText(selectedValue));
  },[selectedValue])
  return (
    <>
      <div>
        <h1>Filter Job</h1>
        <hr className="mt-3" />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {
            fitlerData.map((data,index) => <div>
              <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>)
          }
        </RadioGroup>
      </div>
    </>
  )
}

export default FilterCard;