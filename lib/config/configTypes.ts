export type Selector = {
    selector_id: string,
    css_selector: string,
}

export type EnableActivityTracking = {
    minimumVisitLength: number;
    heartbeatDelay: number;
}

export type SnowplowConfig = {
    trackPageView?: boolean;
    enableActivityTracking: EnableActivityTracking | boolean;
    trackParticularClicks?: TrackParticularClicks;
    trackPurchaseButtonClick?: TrackPurchaseButtonClick;
}

export type TrackedElement = {
    id: string;
    element: Element;
}

export type TrackParticularClicks = {
    selectors: (Selector)[];
}

export type TrackPurchaseButtonClick = {
    selectors: (string)[];
}