import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public compatibility: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, description: string, compatibility: string, imagePath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = description;
        this.compatibility = compatibility;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}