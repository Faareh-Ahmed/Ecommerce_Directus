import CheckBox from "./checkBox";

export default function filter({ categories, getSelectedcategories }) {
    return (
        <>
            <div className="flex items-center mt-5">
                {categories.map(category => 
                <CheckBox key={category.id} 
                label={category.category_name}
                id={category.id}
                getSelectedcategories={getSelectedcategories} />)}
            </div>
        </>
    )
}