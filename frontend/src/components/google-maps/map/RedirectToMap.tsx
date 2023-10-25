import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useExternalValue } from '@utils/external-state';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';

const RedirectToMap = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const navigate = useNavigate();

  useEffect(() => {
    if (googleMap) {
      navigate('/maps');
    } else {
      console.error('googleMap is null');
    }
  }, [googleMap]);

  return <></>;
};

export default RedirectToMap;
