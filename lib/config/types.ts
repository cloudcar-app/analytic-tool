export interface EventPayload {
    schema: string;
    data?: (EventData)[] | null;
}
export interface EventData {
    e: string;
    p: string;
    co?: string;
    sid: any;
    tv: string;
    duid: any;
    ue_pr: string;
}
