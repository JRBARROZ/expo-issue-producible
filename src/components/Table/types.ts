
type actions = 'edit' | 'delete' | 'view' | 'print' | 'download' | 'cancel' | 'confirm';

interface IColumns {
    name: string;
    label: string;
    type: 'string' | 'number' | 'boolean' | 'date' | 'date-hour';
    format?: (value: any, row: any) => string | React.ReactNode;
    alignHead?: 'flex-start' | 'center' | 'flex-end';
    alignRow?: 'flex-start' | 'center' | 'flex-end';
    disableActionCondition?: (value: { [key: string]: any }, action: actions) => boolean;
    mask?: RegExp;
    disablePast?: boolean;
    disableFuture?: boolean;
}

interface IAction {
    icon: React.ReactNode;
    iconName: string;
    handler: (data: any) => void;
    disabled: (data: any) => boolean;
}

interface ITableProps {
    title?: string;
    data: Array<{ [key: string]: any }>
    columns: Array<IColumns>;
    loading?: boolean;
    emptyMessage?: string;
    actions?: IAction[];
}

export { ITableProps, IColumns }