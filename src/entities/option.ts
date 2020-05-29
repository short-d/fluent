export enum OptionType {
    Bold,
    Italic,
    Link,
    LargeFont,
    SmallFont,
    Quote
}

export interface IOption {
    type: OptionType;
    isApplied: boolean;
    isDisabled: boolean;
}
