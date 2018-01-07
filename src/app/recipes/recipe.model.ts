import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public category: string;
    public name: string;
    public description: string;
    public rating: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(category: string, name: string, description: string, rating: string, imagePath: string, ingredients: Ingredient[]) {
        this.category = category;
        this.name = name;
        this.description = description;
        this.rating = rating;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}