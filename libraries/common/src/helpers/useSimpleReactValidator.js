import SimpleReactValidator from "simple-react-validator";
import React, { Component, useEffect, useState, useRef } from "react";

export default function useSimpleReactValidator(passInOptions = {}) {
  const [{ options }, forceUpdate] = React.useReducer(
    ({ options }) => ({ options }),
    {
      options: passInOptions,
    }
  );
  const simpleValidator = React.useMemo(
    () =>
      new SimpleReactValidator(
        options.autoForceUpdate
          ? {
              ...options,
              autoForceUpdate: {
                forceUpdate,
              },
            }
          : options
      ),
    [options]
  );
  return [simpleValidator, forceUpdate];
}
