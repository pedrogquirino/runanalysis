import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "../actions";

const initialState = {

  coordinatesData: {
    data: [],
    paceAverage: 0.0,
    speedAverage: 0.0
  }

};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
