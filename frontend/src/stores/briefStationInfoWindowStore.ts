import type { Root } from "react-dom/client";

import { store } from "../utils/external-state";

interface BriefStationInfoWindowStore {
  briefStationInfoRoot: Root;
  infoWindowInstance: google.maps.InfoWindow;
}

export const briefStationInfoWindowStore = store<BriefStationInfoWindowStore>(null);
