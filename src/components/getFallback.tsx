import React, { useEffect } from 'react';

import { AppApi } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

let counter = 0;

const Fallback = () => {
  const dispatch = useThunkDispatch();
  useEffect(() => {
    const key = `LazyComponent${counter++}`;

    dispatch(AppApi.pushLoading(key, 'Loading the post code areas...'))

    return () => {
      dispatch(AppApi.popLoading(key))
    }
  });

  return null;
}

export const getFallbackComponent = () => <Fallback />