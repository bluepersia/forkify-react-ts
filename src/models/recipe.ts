
export interface IRecipe 
{
    title:string;
    publisher:string;
    image_url:string;
    source_url:string;
    cooking_time:number;
    servings:number;
    ingredients:IIngredient[]
}

export interface IIngredient
{
    description:string;
    unit:string;
    quantity:number;
}