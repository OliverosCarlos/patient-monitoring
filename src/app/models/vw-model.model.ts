import { TemplateRef, Type } from '@angular/core';

export interface Model{
    name:string;
    singular_name: string;
    plural_name: string;
    components: VWComponent[];
    multipleView: boolean;
    options : any[]
}

export interface Cmp{
    route:string;
    type:string;
    data: any;
}

export class VWComponent {
    constructor(public route: string, public view_type: string, public content_type: string, public data: any) {}
  }