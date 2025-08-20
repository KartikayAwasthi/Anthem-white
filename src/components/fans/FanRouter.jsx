import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SkyroFan, InaraFan, EvaaraFan, LaraFan } from './index';

const FanRouter = () => {
  const { fanId } = useParams();

  // Define the mapping of fan IDs to their components
  const fanComponents = {
    skyro: SkyroFan,
    inara: InaraFan,
    evaara: EvaaraFan,
    lara: LaraFan
  };

  // Get the component for the current fan ID
  const FanComponent = fanComponents[fanId];

  // If fan ID doesn't exist, redirect to products page
  if (!FanComponent) {
    return <Navigate to="/products" replace />;
  }

  return <FanComponent />;
};

export default FanRouter;
