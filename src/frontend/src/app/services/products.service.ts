import { Injectable } from '@angular/core';
import { PokemonClient } from 'pokenode-ts';
import { BehaviorSubject, Observable, forkJoin, map, of } from 'rxjs';
import { Vendor, VendorsService } from './vendors.service';

export interface ProductPartial {
  name: string;
  loaded?: boolean;
}

export class Product implements ProductPartial {
  public id: number = 0;
  public name: string = "";
  public image: string = "";
  public category: string = "";
  public description: string = "";
  public vendor!: Vendor;
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public productsCount$ = new BehaviorSubject<number>(0);
  private products: Map<string, ProductPartial> = new Map<string, ProductPartial>();
  private vendors?: Map<number, Vendor>;
  private vendors$: Observable<any>;

  constructor(private pokemonClient: PokemonClient, private vendorsService: VendorsService) {
    this.vendors$ = this.vendorsService.getVendors();
    this.vendors$.subscribe(vendors => {
      this.vendors = vendors;
    });
    let productsAlmacen: any[] = JSON.parse(localStorage.getItem('products') ?? "[]") ?? [];
    this.products = new Map<string, ProductPartial>(Array.from(productsAlmacen).map((value) => [value.name, value]));
    this.productsCount$.next(+(localStorage.getItem('productsCount') ?? 0));

  }

  async getProductsList(offset: number, limit: number) {
    if (offset >= this.products.size || this.products.size < offset + limit) {
      await this.cargaPokemons(offset, limit);
    }
    return Array.from(this.products.values()).slice(offset, offset + limit);
  }

  async getProductByName(name: string) {
    if (!this.products.has(name) || !this.products.get(name)?.loaded) {
      await this.pokemonClient.getPokemonByName(name).then(async (pokemonExp) => {
        let otherImagesOfficialArt = pokemonExp.sprites.other!["official-artwork"];
        let product = Object.assign(new Product(), {
          id: pokemonExp.id,
          name: pokemonExp.name,
          image: otherImagesOfficialArt.front_default ?? pokemonExp.sprites.other?.dream_world.front_default ?? pokemonExp.sprites.front_default,
          category: pokemonExp.types[0].type.name,
          description: pokemonExp.moves.map((item: any) => item.move.name).join(', '),
          vendor: await this.vendorsService.getRandomVendor(),
          price: Math.floor(Math.random() * 100),
          loaded: true
        });
        this.products.set(product.name, product);
        localStorage.setItem('products', JSON.stringify(this.products.values()));
      });

    }
    return this.products.get(name);
  }


  private async cargaPokemons(offset: number, limit: number) {
    await this.pokemonClient.listPokemons(offset, limit).then(async pokemons => {
      this.productsCount$.next(pokemons.count);
      localStorage.setItem('productsCount', pokemons.count.toString());

      for (let i = 0; i < pokemons.results.length; i++) {
        const pokemon = pokemons.results[i];
        let product = {
          name: pokemon.name,
          loaded: false
        } as ProductPartial;
        this.products.set(product.name, product);
      }
      localStorage.setItem('products', JSON.stringify(this.products.values()));
    });

  }
}
