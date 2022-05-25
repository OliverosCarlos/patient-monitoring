import { Type } from '@angular/core';

export class AdItem {
  constructor(public component: Type<any>, public model: string, public type: string, public data: any) {}
}