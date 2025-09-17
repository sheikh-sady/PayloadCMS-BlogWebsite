'use client'
import { useCategories } from "@/context/categoryContext"
import { CategoryType } from "./PostCard"
import SingleCategory from "./SingleCategory"

export default function CategoryGroup(){
    const {categories} = useCategories()
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {
                categories.map((c:CategoryType)=> 
                <SingleCategory key={c.id} category={c}/>)
            }
        </div>
    )
}