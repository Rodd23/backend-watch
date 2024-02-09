import { IsNumber, IsString } from "class-validator";
import { Movie } from "../entities/movie.entity";

export class CreateMovieDto extends Movie {
    @IsString()
    title: string;

    @IsString()
    genre: string;

    @IsNumber()
    releaseYear: number;
}
