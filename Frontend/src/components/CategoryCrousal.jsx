import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useDispatch } from "react-redux";
import { setSearchQueryText } from "@/store/jobSlice";


function CategoryCrousal() {
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Graphic Designer",
    "Data Engineer",
    "FullStack Developer"
  ]
    const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchQuery = (query)=>{
    dispatch(setSearchQueryText(query));
    navigate("/browse");
  }

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent className="md:basis-1/2 lg-basis-1/3">
          {
            category.map((cat, index) => (
              <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                <Button variant="outline" onClick={()=>handleSearchQuery(cat)}  className="rounded-full
                 bg-[#2a2a3d]  text-[#f3f4f6] border border-[#3a3a4d]">{cat}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious  className="bg-[#2a2a3d]  text-[#f3f4f6] border border-[#3a3a4d]"/>
        <CarouselNext className="bg-[#2a2a3d]  text-[#f3f4f6] border border-[#3a3a4d]" />
      </Carousel>
    </div>

  )
}

export default CategoryCrousal;