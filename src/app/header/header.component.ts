import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from './../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
  constructor(
    private dataStorageService: DataStorageService,
    public authService: AuthService) {}

  // Update
  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onSaveShoppingList() {
    this.dataStorageService.storeIngredients()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onGetData() {
    this.dataStorageService.getRecipes();
  }


  onGetShoppingList() {
    // this.dataStorageService.getIngredients();
  }

  onLogout() {
    this.authService.logout();
  }
}