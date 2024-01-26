import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  switchTheme(theme:string)

  {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink){
      themeLink.href = theme + '.css'
    }
  }
}
