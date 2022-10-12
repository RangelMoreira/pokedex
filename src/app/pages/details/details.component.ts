import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

//Services
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;

  public isLoading: boolean = false;
  public apiError: boolean = false

  constructor(
      private activatedRoute: ActivatedRoute,
      private pokeApiService: PokeApiService
    ){ }

  ngOnInit(): void {
    this.getPokemon;
  }

  public get getPokemon(){
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemons(`${this.urlPokemon}/${id}`);
    const name = this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`);

    /*O Forkjoin permite efetuar as duas requisições juntas, para que uma não espere a outra*/
    /*No caso ele retorna dois valores, um para cada chmada*/
    return forkJoin([pokemon, name]).subscribe(
        res =>{
          this.pokemon = res;
          this.isLoading= true;
        },
        error =>{
          this.apiError = true;
        }
    )

  }

}
