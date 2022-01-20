export type EnableActivityTracking = {
    minimumVisitLength: number;
    heartbeatDelay: number;
}

export type SnowplowConfig = {
    trackPageView?: TrackPageView;
    enableActivityTracking?: EnableActivityTracking;
    trackParticularClicks?: TrackParticularClicks;
    trackPagePingExtended?: TrackPagePingExtended;
}

export type TrackPageView = {
}

export type TrackParticularClicks = {
    selectors?: (string)[] | null;
}

export type TrackPagePingExtended = {
    time_interval: number;
    mousePosInterval: number;
}