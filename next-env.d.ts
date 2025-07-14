/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more info

declare namespace JSX {
    interface IntrinsicElements {
        "healcode-widget": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            "data-type"?: string;
            "data-widget-partner"?: string;
            "data-widget-id"?: string;
            "data-widget-version"?: string;
        };
    }
}
