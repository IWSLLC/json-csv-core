
export type Field = {
  name: string;
  label?: string;
  transform?: (source: any) => string;
}

export type SourceData = any[];

export type FieldList = Field[];

export type ExportOptionsParam = {
  fieldSeparator?: string;
  ignoreHeader?: boolean;
  fields: FieldList;
}

export type ExportOptions = {
  fieldSeparator?: string;
  fields: FieldList;
  ignoreHeader: boolean;
}

export type Buffered = (data: Record<string, any>[], opts?: ExportOptionsParam) => string;

export type GetValueIx = (data: Record<string, any> | undefined | null, keys: string[], ix: number) => any;

export type GetValue = (data: Record<string, any>, keyPath: string) => any;

export type GetBodyRow = (data: Record<string, any> | undefined | null, fields: FieldList, fieldSeparator: string) => any;

export type GetHeaderRow = (fields: FieldList, fieldSeparator: string) => any;

export type PrepValue = (text: string, forceQuoted: boolean, fieldSeparator: string) => any;

export type CheckOptions = (opts?: ExportOptionsParam) => ExportOptions;