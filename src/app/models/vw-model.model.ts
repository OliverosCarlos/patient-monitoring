import { TemplateRef, Type } from '@angular/core';

export interface Model{
    name:string;
    singular_name: string;
    plural_name: string;
    menus?: any[];
    components: VWComponent[];
    multipleView: boolean;
    options? : any[];
    searchAttributes?: string[];
    activities?: AbstractButton[];
}

export interface Cmp{
    route:string;
    type:string;
    data: any;
}

export class VWComponent {
    constructor(public route: string, public view_type: string, public content_type: string, public data: any) {}
  }

export interface AbstractButton{
    name: string;
    display_name: string;
    tooltip: string;
    icon: string;
    disabled?: boolean;
}