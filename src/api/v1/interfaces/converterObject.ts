export interface ConverterObject {
    request: {
        fileType: string; // ex. png or jpeg
        textType: string; // ex. html or plainText
        text: string; // html string or plainText string
    };
    options: {
        [index:string]: string|number;
        width: string;
        height: string;
        padding: string;
        fontFamily: string;
        fontSize: string;
        backgroundColor: string;
        textColor: string;
        lineHeight?: string;
        linesPerPage: number;
        pages?: number; // calculate the number of pages or provide a set amount.
    };
}