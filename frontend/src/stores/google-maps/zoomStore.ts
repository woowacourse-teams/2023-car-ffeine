import { store } from '@utils/external-state';

import { INITIAL_ZOOM_SIZE } from '@constants/googleMaps';

export const zoomStore = store(INITIAL_ZOOM_SIZE);
