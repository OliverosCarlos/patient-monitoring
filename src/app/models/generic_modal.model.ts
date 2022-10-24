export interface GenericModal{
    title: string;
    options?: string[];
    save?: Function;
    cancel?: Function;
    ok?: Function;
    btn_save?: boolean;
    btn_cancel?: boolean;
    btn_ok?: boolean;
    service?: any;
}