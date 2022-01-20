export type EnableActivityTracking = {
    minimumVisitLength: number;
    heartbeatDelay: number;
}

export type SnowplowConfig = {
    trackPageView?: TrackPageView;
    enableActivityTracking?: EnableActivityTracking;
    trackParticularClicks?: TrackParticularClicks;
    trackPurchaseButtonClick?: TrackPurchaseButtonClick;
}

export type TrackPageView = {
}

export type TrackParticularClicks = {
    selectors?: (string)[] | null;
}

export type TrackPurchaseButtonClick = {
    selectors?: (string)[] | null;
}